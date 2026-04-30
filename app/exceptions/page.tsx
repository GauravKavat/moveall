import { ExceptionsTable } from '@/components/dashboard/exceptions-table';
import { mockExceptions } from '@/lib/mock-data';

export default function ExceptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Exceptions</h1>
        <p className="text-sm text-muted-foreground">
          View and manage failed deliveries and issues.
        </p>
      </div>

      <ExceptionsTable exceptions={mockExceptions} />
    </div>
  );
}
