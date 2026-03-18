'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Bell, 
  Settings, 
  UserIcon, 
  LogOut,
  Search,
  Menu,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { User } from '@/types'

interface HeaderProps {
  user?: User | null
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)
  const [notifications] = useState([
    { id: 1, title: 'New RFQ Received', time: '5 min ago', read: false },
    { id: 2, title: 'Seat Request Approved', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment Confirmed', time: '2 hours ago', read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return 'Dashboard'
    
    const page = segments[segments.length - 1]
    return page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')
  }

  const getInitials = (name: string) => {
    if (!name) return 'AD'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section - Page Title & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => {/* Toggle mobile sidebar */}}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
          <Badge variant="outline" className="hidden md:inline-flex">
            {user?.role?.replace('-', ' ') || 'User'}
          </Badge>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className={cn(
            'hidden md:flex items-center relative',
            showSearch ? 'md:w-80' : 'md:w-64'
          )}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 pr-4"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary">{unreadCount} new</Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="cursor-pointer">
                    <div className="flex flex-col space-y-1 py-2">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          'text-sm',
                          !notification.read && 'font-semibold'
                        )}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-center text-blue-600">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getInitials(user?.firstName + ' ' + user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'AeroDesk User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@aerodesk.com'}</p>
                </div>
                <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
