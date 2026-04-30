import { ShipmentsTable } from '@/components/dashboard/shipments-table';
import { mockShipments } from '@/lib/mock-data';

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Shipments</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage shipments across all couriers.
        </p>
      </div>

      <ShipmentsTable shipments={mockShipments} />
    </div>
  );
}
