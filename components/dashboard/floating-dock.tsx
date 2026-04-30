'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Truck,
  AlertCircle,
  RotateCcw,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  ArrowUpRight,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/pickups', label: 'Pick up', icon: ArrowUpRight },
  { href: '/shipments', label: 'Shipments', icon: Truck },
  { href: '/exceptions', label: 'Exceptions', icon: AlertCircle },
  { href: '/rto', label: 'RTO', icon: RotateCcw },
  { href: '/couriers', label: 'Couriers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function FloatingDock() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = isExpanded ? navItems : navItems.slice(0, 5);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 w-56 bg-primary text-primary-foreground rounded-2xl shadow-lg p-2 mb-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsExpanded(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Dock Buttons */}
      <div className="flex flex-col-reverse gap-2">
        {visibleItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-100 hover:scale-105 ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              <Icon className="h-6 w-6" />
            </Link>
          );
        })}

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-100 hover:scale-105 ${
            isExpanded ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronUp className={`h-6 w-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
