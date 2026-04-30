import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          View detailed analytics and performance metrics.
        </p>
      </div>

      <AnalyticsCharts />
    </div>
  );
}
