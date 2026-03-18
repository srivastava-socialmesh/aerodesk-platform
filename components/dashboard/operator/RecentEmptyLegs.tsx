'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plane, Edit, Eye, Copy } from 'lucide-react'

const emptyLegs = [
  {
    id: 'EL001',
    route: 'Mumbai (BOM) → Delhi (DEL)',
    departure: '2024-03-25 14:00',
    arrival: '2024-03-25 16:30',
    aircraft: 'Challenger 850',
    seats: 8,
    price: 45000,
    status: 'published',
    bookings: 3,
  },
  {
    id: 'EL002',
    route: 'Delhi (DEL) → Bangalore (BLR)',
    departure: '2024-03-26 09:00',
    arrival: '2024-03-26 11:45',
    aircraft: 'Gulfstream G650',
    seats: 10,
    price: 52000,
    status: 'published',
    bookings: 5,
  },
  {
    id: 'EL003',
    route: 'Mumbai (BOM) → Goa (GOI)',
    departure: '2024-03-27 08:30',
    arrival: '2024-03-27 09:45',
    aircraft: 'Cessna Citation',
    seats: 6,
    price: 38000,
    status: 'draft',
    bookings: 0,
  },
  {
    id: 'EL004',
    route: 'Bangalore (BLR) → Chennai (MAA)',
    departure: '2024-03-28 15:00',
    arrival: '2024-03-28 16:15',
    aircraft: 'Bombardier Global',
    seats: 4,
    price: 32000,
    status: 'published',
    bookings: 2,
  },
  {
    id: 'EL005',
    route: 'Delhi (DEL) → Mumbai (BOM)',
    departure: '2024-03-29 11:00',
    arrival: '2024-03-29 13:30',
    aircraft: 'Challenger 850',
    seats: 12,
    price: 48000,
    status: 'expired',
    bookings: 8,
  },
]

// Add the type annotation here

type LegStatus = 'draft' | 'published' | 'expired' | 'cancelled'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  published: 'bg-green-100 text-green-800',
  expired: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}

// ... rest of your code

// The usage at line 122 is now safe
<Badge className={statusColors[leg.status]}>
  {leg.status}
</Badge>

export function RecentEmptyLegs() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            Total: {emptyLegs.length}
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            Active: {emptyLegs.filter(e => e.status === 'published').length}
          </Badge>
        </div>
        <Button size="sm" className="bg-blue-600">
          + Create Empty Leg
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Aircraft</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emptyLegs.map((leg) => (
            <TableRow key={leg.id}>
              <TableCell className="font-medium">{leg.id}</TableCell>
              <TableCell>{leg.route}</TableCell>
              <TableCell>{leg.departure}</TableCell>
              <TableCell>{leg.aircraft}</TableCell>
              <TableCell>{leg.seats}</TableCell>
              <TableCell>₹{leg.price.toLocaleString()}</TableCell>
              <TableCell>{leg.bookings}</TableCell>
              <TableCell>
                <Badge className={statusColors[leg.status]}>
                  {leg.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {leg.status === 'draft' && (
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {leg.status === 'published' && (
                    <Button size="sm" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
