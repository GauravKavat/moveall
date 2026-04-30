'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import {
  mockMetrics,
  mockActivities,
  mockAlerts,
  mockPickups,
} from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import { PickupRequest } from '@/lib/types';

const CreateOrderModal = dynamic(
  () =>
    import('@/components/dashboard/create-order-modal').then(
      (mod) => mod.CreateOrderModal,
    ),
  { ssr: false },
);

const CreatePickupModal = dynamic(
  () =>
    import('@/components/dashboard/create-pickup-modal').then(
      (mod) => mod.CreatePickupModal,
    ),
  { ssr: false },
);

const todayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Kolkata',
});

export default function DashboardPage() {
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isCreatePickupOpen, setIsCreatePickupOpen] = useState(false);
  const activePickups = mockPickups.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled').length;
  const today = todayFormatter.format(new Date());

  const handleCreatePickup = (
    pickup: Omit<
      PickupRequest,
      | 'id'
      | 'status'
      | 'createdAt'
      | 'actualPickupTime'
      | 'scheduledPickupTime'
      | 'vehicleNumber'
      | 'driverName'
      | 'driverPhone'
      | 'estimatedPickupTime'
    >,
  ) => {
    toast({
      title: 'Pickup request prepared',
      description: `Pickup for ${pickup.customer} is ready in prototype mode.`,
    });
  };

  return (
    <div className="w-full max-w-full space-y-8 overflow-x-hidden">
      {/* Hero Section */}
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-5xl">
            Welcome back
          </h1>
          <p className="max-w-[24rem] text-base text-muted-foreground sm:text-lg">
            {today} • {activePickups} active pickups to manage
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button className="flex items-center gap-2" onClick={() => setIsCreateOrderOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Order
          </Button>
          <Button variant="outline" onClick={() => setIsCreatePickupOpen(true)}>
            Create Pickup
          </Button>
          <Button variant="ghost" onClick={() => {
            toast({ title: 'Report view opened', description: 'Showing latest operational analytics.' });
          }}>
            View Reports
          </Button>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-6">
        <MetricCard
          label="Total Orders"
          value={mockMetrics.totalOrders}
          change={mockMetrics.ordersChange}
          icon={<Package className="h-5 w-5" />}
        />
        <MetricCard
          label="Shipped"
          value={mockMetrics.totalShipped}
          change={mockMetrics.shippedChange}
          icon={<Truck className="h-5 w-5" />}
        />
        <MetricCard
          label="Delivered"
          value={mockMetrics.totalDelivered}
          change={mockMetrics.deliveredChange}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricCard
          label="RTO Rate"
          value={`${mockMetrics.rtoRate}%`}
          change={mockMetrics.rtoChange}
          icon={<RotateCcw className="h-5 w-5" />}
        />
        <MetricCard
          label="Active Issues"
          value={mockMetrics.activeExceptions}
          change={mockMetrics.exceptionsChange}
          icon={<AlertCircle className="h-5 w-5" />}
        />
        <MetricCard
          label="Active Pickups"
          value={activePickups}
          change={mockMetrics.pickupsChange}
          icon={<ArrowUpRight className="h-5 w-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Activity Feed - Shorter width on desktop */}
        <div className="h-full lg:col-span-5">
          <ActivityFeed activities={mockActivities} />
        </div>

        {/* Network Status - Middle column */}
        <div className="h-full lg:col-span-3">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4 h-full">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Network Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Couriers</span>
                <span className="font-semibold text-foreground">47/50</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[94%]"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hub Utilization</span>
                <span className="font-semibold text-foreground">2,847/5,000</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[57%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts - Right column */}
        <div className="h-full lg:col-span-4">
          <AlertsPanel alerts={mockAlerts} />
        </div>
      </div>

      {isCreateOrderOpen && (
        <CreateOrderModal open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen} />
      )}
      {isCreatePickupOpen && (
        <CreatePickupModal
          isOpen={isCreatePickupOpen}
          onClose={() => setIsCreatePickupOpen(false)}
          onCreateOrder={() => {
            setIsCreateOrderOpen(true);
            setIsCreatePickupOpen(false);
          }}
          onSubmit={handleCreatePickup}
        />
      )}
    </div>
  );
}
