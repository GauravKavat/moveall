'use client';

import { Search, Bell, CircleUser, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { CreateOrderModal } from './create-order-modal';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

export function Topbar() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 h-16 border-b border-border bg-card shadow-sm z-40 md:left-64">
        <div className="flex h-full items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search orders, shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-6 border-0 bg-transparent px-0 text-xs sm:text-sm placeholder-muted-foreground focus:bg-transparent focus:outline-none"
            />
          </div>

          {/* Mobile Search Icon */}
          <button
            className="sm:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => toast({ title: 'Search', description: 'Use desktop search for full cross-entity lookup.' })}
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <button
              className="relative rounded-lg p-2 hover:bg-muted"
              onClick={() => toast({ title: 'Notifications', description: '3 new prototype alerts available.' })}
            >
              <Bell className="h-4 w-4 text-foreground" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Create Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                size="sm"
                className="flex items-center gap-1 sm:gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create</span>
                <ChevronDown className="h-3 w-3 sm:hidden" />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
            <button
              onClick={() => {
                setIsCreateOpen(true);
                setIsDropdownOpen(false);
              }}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted rounded-t-lg text-sm text-foreground"
                  >
                    Create Order
                  </button>
                  <Link
                    href="/pickups"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-muted text-sm text-foreground rounded-b-lg"
            >
              Create Pickup
            </Link>
                </div>
              )}
            </div>

            {/* User Profile */}
            <button
              className="rounded-lg p-2 hover:bg-muted"
              onClick={() => toast({ title: 'Profile', description: 'User profile panel coming in next iteration.' })}
            >
              <CircleUser className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <CreateOrderModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
