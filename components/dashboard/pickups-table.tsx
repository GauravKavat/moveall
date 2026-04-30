'use client';

import dynamic from 'next/dynamic';
import { PickupRequest, PickupStatus } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const PickupDetailModal = dynamic(
  () =>
    import('./pickup-detail-modal').then((mod) => mod.PickupDetailModal),
  { ssr: false },
);

interface PickupsTableProps {
  pickups: PickupRequest[];
  status?: PickupStatus;
}

export function PickupsTable({ pickups, status }: PickupsTableProps) {
  const [selectedPickup, setSelectedPickup] = useState<PickupRequest | null>(null);

  const filteredPickups = status
    ? pickups.filter(p => p.status === status)
    : pickups;

  if (filteredPickups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pickup requests found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f7f7f2]">
              <th className="text-left py-3 px-4 font-semibold text-foreground">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Order</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Delivery Address</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Weight</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Driver</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Est. Time</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPickups.map((pickup) => (
              <tr
                key={pickup.id}
                className="border-b border-border hover:bg-[#f8f8f4] transition-colors cursor-pointer"
                onClick={() => setSelectedPickup(pickup)}
              >
                <td className="py-3 px-4 font-medium">{pickup.id}</td>
                <td className="py-3 px-4">{pickup.customer}</td>
                <td className="py-3 px-4 text-muted-foreground">{pickup.orderId}</td>
                <td className="py-3 px-4 text-muted-foreground truncate max-w-xs">{pickup.deliveryAddress}</td>
                <td className="py-3 px-4 text-muted-foreground">{pickup.weight} kg</td>
                <td className="py-3 px-4 text-muted-foreground">{pickup.vehicleNumber || '—'}</td>
                <td className="py-3 px-4 text-muted-foreground">{pickup.driverName || '—'}</td>
                <td className="py-3 px-4 text-muted-foreground">
                  {pickup.estimatedPickupTime
                    ? new Date(pickup.estimatedPickupTime).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={pickup.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPickup && (
        <PickupDetailModal
          pickup={selectedPickup}
          isOpen={!!selectedPickup}
          onClose={() => setSelectedPickup(null)}
        />
      )}
    </>
  );
}
