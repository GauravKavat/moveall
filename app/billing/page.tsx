'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const billingData = [
  {
    id: 'INV-001',
    date: '2024-04-01',
    amount: '12,450',
    status: 'Paid',
    courier: 'DPL',
  },
  {
    id: 'INV-002',
    date: '2024-03-01',
    amount: '11,230',
    status: 'Paid',
    courier: 'All Couriers',
  },
  {
    id: 'INV-003',
    date: '2024-02-01',
    amount: '10,890',
    status: 'Paid',
    courier: 'All Couriers',
  },
  {
    id: 'INV-004',
    date: '2024-01-01',
    amount: '9,560',
    status: 'Paid',
    courier: 'All Couriers',
  },
];

export default function BillingPage() {
  const downloadInvoice = (invoiceId?: string) => {
    const content = invoiceId
      ? `Invoice ${invoiceId}\nStatus: Paid\nGenerated in prototype mode.`
      : `All invoices export\nTotal invoices: ${billingData.length}\nGenerated in prototype mode.`;

    const filename = invoiceId ? `${invoiceId}.txt` : 'all-invoices.txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Download started',
      description: invoiceId ? `${invoiceId} downloaded.` : 'All invoice files downloaded.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage invoices and billing information.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Spent (MTD)</p>
          <p className="mt-2 text-2xl font-semibold">₹12,450</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Average per Shipment</p>
          <p className="mt-2 text-2xl font-semibold">₹3.45</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Next Invoice Date</p>
          <p className="mt-2 text-2xl font-semibold">May 1, 2024</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Invoice History</h2>
          <Button size="sm" onClick={() => downloadInvoice()}>
            Download All
          </Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f7f7f2]">
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingData.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-[#f8f8f4]">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="text-sm">{invoice.courier}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => downloadInvoice(invoice.id)}>
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
