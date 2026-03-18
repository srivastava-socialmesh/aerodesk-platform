import { NextResponse } from 'next/server'

const mockSuccessResponse = () => {
  return NextResponse.json(
    { 
      received: true, 
      mock: true,
      message: 'Stripe webhook bypassed - running in mock mode'
    }, 
    { status: 200 }
  )
}

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.log('⚠️ Stripe not configured - returning mock success response')
      return mockSuccessResponse()
    }

    try {
      const { default: Stripe } = await import('stripe')
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia',
      })

      const body = await request.text()
      const signature = request.headers.get('stripe-signature')

      if (!signature) {
        console.log('No Stripe signature provided - returning mock success')
        return mockSuccessResponse()
      }

      let event: Stripe.Event

      try {
        event = stripe.webhooks.constructEvent(
          body, 
          signature, 
          process.env.STRIPE_WEBHOOK_SECRET
        )
      } catch (err) {
        console.error(`Webhook signature verification failed:`, err)
        return mockSuccessResponse()
      }

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object
          await handleSuccessfulPayment(paymentIntent)
          break

        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object
          await handleFailedPayment(failedPayment)
          break

        case 'checkout.session.completed':
          const session = event.data.object
          await handleCheckoutComplete(session)
          break

        default:
          console.log(`Unhandled event type: ${event.type}`)
      }

      return NextResponse.json({ received: true }, { status: 200 })
      
    } catch (stripeError) {
      console.log('Stripe initialization failed - returning mock success')
      return mockSuccessResponse()
    }
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { received: true, error: 'Internal error but acknowledged' }, 
      { status: 200 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      status: 'webhook endpoint active',
      mode: process.env.STRIPE_SECRET_KEY ? 'live' : 'mock'
    }, 
    { status: 200 }
  )
}

async function handleSuccessfulPayment(paymentIntent: any) {
  const { bookingId } = paymentIntent.metadata || {}
  console.log(`✅ Payment succeeded for booking: ${bookingId || 'unknown'}`)
}

async function handleFailedPayment(paymentIntent: any) {
  const { bookingId } = paymentIntent.metadata || {}
  console.log(`❌ Payment failed for booking: ${bookingId || 'unknown'}`)
}

async function handleCheckoutComplete(session: any) {
  console.log(`🛒 Checkout completed: ${session.id}`)
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
