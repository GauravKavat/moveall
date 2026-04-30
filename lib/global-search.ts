import {
  mockOrders,
  mockShipments,
  mockPickups,
  mockRTOs,
  mockExceptions,
  mockCouriers,
} from '@/lib/mock-data';

export type SearchCategory =
  | 'Order'
  | 'Shipment'
  | 'Pickup'
  | 'RTO'
  | 'Exception'
  | 'Courier';

export interface GlobalSearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  href: string;
}

export function searchAllEntities(query: string, limit = 8): GlobalSearchResult[] {
  const q = query.trim().toLowerCase();

  if (!q) return [];

  const orderResults: GlobalSearchResult[] = mockOrders
    .filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))
    .map((o) => ({
      id: `order-${o.id}`,
      title: o.customer,
      subtitle: `${o.id} • ${o.status}`,
      category: 'Order',
      href: '/orders',
    }));

  const shipmentResults: GlobalSearchResult[] = mockShipments
    .filter((s) => s.awb.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q))
    .map((s) => ({
      id: `shipment-${s.awb}`,
      title: s.customer,
      subtitle: `${s.awb} • ${s.status}`,
      category: 'Shipment',
      href: '/shipments',
    }));

  const pickupResults: GlobalSearchResult[] = mockPickups
    .filter((p) => p.id.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q))
    .map((p) => ({
      id: `pickup-${p.id}`,
      title: p.customer,
      subtitle: `${p.id} • ${p.status}`,
      category: 'Pickup',
      href: '/pickups',
    }));

  const rtoResults: GlobalSearchResult[] = mockRTOs
    .filter((r) => r.id.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q))
    .map((r) => ({
      id: `rto-${r.id}`,
      title: r.customer,
      subtitle: `${r.id} • ${r.status}`,
      category: 'RTO',
      href: '/rto',
    }));

  const exceptionResults: GlobalSearchResult[] = mockExceptions
    .filter((e) => e.id.toLowerCase().includes(q) || e.orderId.toLowerCase().includes(q) || e.reason.toLowerCase().includes(q))
    .map((e) => ({
      id: `exception-${e.id}`,
      title: e.id,
      subtitle: `${e.orderId} • ${e.reason}`,
      category: 'Exception',
      href: '/exceptions',
    }));

  const courierResults: GlobalSearchResult[] = mockCouriers
    .filter((c) => c.name.toLowerCase().includes(q))
    .map((c) => ({
      id: `courier-${c.id}`,
      title: c.name,
      subtitle: `${c.successRate}% success • ${c.activeShipments} active`,
      category: 'Courier',
      href: '/couriers',
    }));

  return [
    ...orderResults,
    ...shipmentResults,
    ...pickupResults,
    ...rtoResults,
    ...exceptionResults,
    ...courierResults,
  ].slice(0, limit);
}
