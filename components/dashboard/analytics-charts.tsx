const deliverySuccessData = [
  { date: 'Mon', success: 92, failed: 8 },
  { date: 'Tue', success: 94, failed: 6 },
  { date: 'Wed', success: 91, failed: 9 },
  { date: 'Thu', success: 95, failed: 5 },
  { date: 'Fri', success: 93, failed: 7 },
  { date: 'Sat', success: 89, failed: 11 },
  { date: 'Sun', success: 90, failed: 10 },
];

const rtoTrendData = [
  { date: 'Week 1', rto: 3.2 },
  { date: 'Week 2', rto: 3.5 },
  { date: 'Week 3', rto: 3.1 },
  { date: 'Week 4', rto: 2.8 },
];

const courierComparisonData = [
  { name: 'DPL', deliveries: 1250 },
  { name: 'Ecom Express', deliveries: 890 },
  { name: 'Blue Dart', deliveries: 640 },
  { name: 'FedEx', deliveries: 420 },
  { name: 'APML', deliveries: 320 },
];

const statusDistributionData = [
  { name: 'Delivered', value: 7401, color: '#22c55e' },
  { name: 'In Transit', value: 892, color: '#3b82f6' },
  { name: 'Pending', value: 249, color: '#eab308' },
];

const totalStatus = statusDistributionData.reduce((sum, item) => sum + item.value, 0);
const rtoMax = Math.max(...rtoTrendData.map((item) => item.rto));
const courierMax = Math.max(...courierComparisonData.map((item) => item.deliveries));

function RtoLineChart() {
  const points = rtoTrendData
    .map((item, index) => {
      const x = 20 + index * 86;
      const y = 170 - (item.rto / rtoMax) * 120;

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 300 190" className="h-72 w-full" role="img" aria-label="RTO rate trend">
      <line x1="20" y1="170" x2="280" y2="170" className="stroke-border" />
      <line x1="20" y1="30" x2="20" y2="170" className="stroke-border" />
      <polyline points={points} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {rtoTrendData.map((item, index) => {
        const x = 20 + index * 86;
        const y = 170 - (item.rto / rtoMax) * 120;

        return (
          <g key={item.date}>
            <circle cx={x} cy={y} r="5" fill="#f97316" />
            <text x={x} y="188" textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {item.date}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">Delivery Success Rate</h3>
        <div className="flex h-72 items-end gap-3">
          {deliverySuccessData.map((item) => (
            <div key={item.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-56 w-full max-w-12 flex-col justify-end overflow-hidden rounded-md bg-muted">
                <div className="bg-red-500" style={{ height: `${item.failed}%` }} />
                <div className="bg-green-500" style={{ height: `${item.success}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold">RTO Rate Trend</h3>
        <RtoLineChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold">Courier Deliveries</h3>
          <div className="space-y-4">
            {courierComparisonData.map((item) => (
              <div key={item.name} className="grid grid-cols-[92px_1fr_52px] items-center gap-3">
                <span className="truncate text-xs text-muted-foreground">{item.name}</span>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(item.deliveries / courierMax) * 100}%` }} />
                </div>
                <span className="text-right text-xs font-medium">{item.deliveries}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold">Order Status Distribution</h3>
          <div className="space-y-4">
            {statusDistributionData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.value / totalStatus) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
