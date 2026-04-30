'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  ChevronLeft,
} from 'lucide-react';

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

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo Section */}
      <div className="px-4 py-6 flex items-center justify-between min-h-[88px] border-b border-sidebar-border bg-sidebar">
        <div className={`overflow-hidden ${isCollapsed ? 'w-0' : 'w-full'}`}>
          <h1 className="text-xl font-bold whitespace-nowrap text-white">Move All</h1>
          <p className="text-xs text-sidebar-foreground/80 whitespace-nowrap">Logistics</p>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex-shrink-0 p-1.5 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <ChevronLeft className={`h-4 w-4 text-accent ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-3 py-8">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-400 to-transparent"></div>
    </aside>
  );
}
