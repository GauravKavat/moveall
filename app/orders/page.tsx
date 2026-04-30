'use client';

import dynamic from 'next/dynamic';
import { OrdersTable } from '@/components/dashboard/orders-table';
import { mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const CreateOrderModal = dynamic(
  () =>
    import('@/components/dashboard/create-order-modal').then(
      (mod) => mod.CreateOrderModal,
    ),
  { ssr: false },
);

export default function OrdersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const totalOrders = mockOrders.length;
  const todayOrders = mockOrders.slice(0, 5).length;

  const handleExport = () => {
    const header = 'Order ID,Customer,Phone,Address,Pincode,Status,Cost';
    const rows = mockOrders.map((order) =>
      [order.id, order.customer, order.phone, order.address, order.pincode, order.status, order.cost].join(','),
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders-export.csv';
    link.click();
    URL.revokeObjectURL(url);

    toast({ title: 'Export ready', description: 'Orders CSV downloaded successfully.' });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Orders</h1>
          <p className="text-lg text-muted-foreground">
            {totalOrders} total orders • {todayOrders} today
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button className="flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <OrdersTable orders={mockOrders} />

      {isCreateOpen && (
        <CreateOrderModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      )}
    </div>
  );
}
