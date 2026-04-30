'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Package, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPickups } from '@/lib/mock-data';
import { PickupsTable } from '@/components/dashboard/pickups-table';
import { PickupRequest } from '@/lib/types';

const CreatePickupModal = dynamic(
  () =>
    import('@/components/dashboard/create-pickup-modal').then(
      (mod) => mod.CreatePickupModal,
    ),
  { ssr: false },
);

export default function PickupsPage() {
  const [pickups, setPickups] = useState<PickupRequest[]>(mockPickups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'scheduled' | 'completed'>('scheduled');

  const scheduledPickups = pickups.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled');
  const completedPickups = pickups.filter(p => p.status === 'Completed' || p.status === 'Cancelled');

  const handleCreatePickup = (newPickup: Omit<PickupRequest, 'id' | 'status' | 'createdAt' | 'actualPickupTime' | 'scheduledPickupTime' | 'vehicleNumber' | 'driverName' | 'driverPhone' | 'estimatedPickupTime'>) => {
    const pickup: PickupRequest = {
      ...newPickup,
      id: `PU-${String(pickups.length + 1).padStart(3, '0')}`,
      status: 'Pending',
      createdAt: new Date(),
    };
    setPickups([pickup, ...pickups]);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Pickups</h1>
          <p className="text-lg text-muted-foreground">
            {scheduledPickups.length} scheduled • {completedPickups.length} completed
          </p>
        </div>

        {/* Action Buttons */}
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Pickup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Total Pickups</p>
              <p className="text-3xl font-bold text-foreground mt-2">{pickups.length}</p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Scheduled</p>
              <p className="text-3xl font-bold text-foreground mt-2">{scheduledPickups.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting pickup</p>
            </div>
            <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-foreground mt-2">{completedPickups.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Success rate 98%</p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex gap-8">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-0 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'scheduled'
              ? 'border-accent text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Scheduled ({scheduledPickups.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-0 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-accent text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Completed ({completedPickups.length})
        </button>
      </div>

      {/* Table */}
      {activeTab === 'scheduled' ? (
        <PickupsTable pickups={scheduledPickups} />
      ) : (
        <PickupsTable pickups={completedPickups} />
      )}

      {/* Create Pickup Modal */}
      {isModalOpen && (
        <CreatePickupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePickup}
        />
      )}
    </div>
  );
}
