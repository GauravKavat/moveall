import { CouriersTable } from '@/components/dashboard/couriers-table';
import { mockCouriers } from '@/lib/mock-data';

export default function CouriersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Couriers</h1>
        <p className="text-sm text-muted-foreground">
          Monitor courier performance and metrics.
        </p>
      </div>

      <CouriersTable couriers={mockCouriers} />
    </div>
  );
}
