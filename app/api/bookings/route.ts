import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') // 'charter' | 'seat' | 'hotel'
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let data: any[] = []
    const targetUserId = userId || user.id

    if (type === 'charter' || !type) {
      const { data: charterBookings, error: charterError } = await supabase
        .from('charter_rfqs')
        .select('*')
        .eq('customerId', targetUserId)
        .in('status', ['confirmed', 'completed', 'in_progress'])
      
      if (charterError) {
        console.error('Error fetching charter bookings:', charterError)
      } else {
        data = [...data, ...(charterBookings || [])]
      }
    }

    if (type === 'seat' || !type) {
      const { data: seatBookings, error: seatError } = await supabase
        .from('seat_bookings')
        .select(`
          *,
          empty_leg:empty_legs(*)
        `)
        .eq('userId', targetUserId)
      
      if (seatError) {
        console.error('Error fetching seat bookings:', seatError)
      } else {
        data = [...data, ...(seatBookings || [])]
      }
    }

    if (type === 'hotel' || !type) {
      const { data: hotelBookings, error: hotelError } = await supabase
        .from('hotel_bookings')
        .select(`
          *,
          hotel:hotels(*)
        `)
        .eq('userId', targetUserId)
      
      if (hotelError) {
        console.error('Error fetching hotel bookings:', hotelError)
      } else {
        data = [...data, ...(hotelBookings || [])]
      }
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Bookings GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const body = await request.json()
    const { type, ...bookingData } = body

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let result

    switch (type) {
      case 'seat':
        // Check seat availability
        const { data: emptyLeg, error: emptyLegError } = await supabase
          .from('empty_legs')
          .select('availableSeats')
          .eq('id', bookingData.emptyLegId)
          .single()

        if (emptyLegError || !emptyLeg) {
          return NextResponse.json(
            { error: 'Flight not found' },
            { status: 404 }
          )
        }

        if (emptyLeg.availableSeats < bookingData.seats) {
          return NextResponse.json(
            { error: 'Not enough seats available' },
            { status: 400 }
          )
        }

        // Create seat booking
        result = await supabase
          .from('seat_bookings')
          .insert([
            {
              ...bookingData,
              userId: user.id,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        if (!result.error) {
          // Update available seats
          await supabase
            .from('empty_legs')
            .update({
              availableSeats: emptyLeg.availableSeats - bookingData.seats,
            })
            .eq('id', bookingData.emptyLegId)
        }
        break

      case 'hotel':
        result = await supabase
          .from('hotel_bookings')
          .insert([
            {
              ...bookingData,
              userId: user.id,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          ])
          .select()
          .single()
        break

      default:
        return NextResponse.json(
          { error: 'Invalid booking type' },
          { status: 400 }
        )
    }

    if (result.error) {
      console.error('Booking creation error:', result.error)
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: result.data }, { status: 201 })
  } catch (error) {
    console.error('Bookings POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
