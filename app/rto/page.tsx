import { RTOTable } from '@/components/dashboard/rto-table';
import { mockRTOs } from '@/lib/mock-data';

export default function RTOPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Returned to Origin (RTO)</h1>
        <p className="text-sm text-muted-foreground">
          Manage shipments that have been returned to the origin.
        </p>
      </div>

      <RTOTable rtos={mockRTOs} />
    </div>
  );
}
