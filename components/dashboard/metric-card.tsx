import { TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: ReactNode;
}

export function MetricCard({ label, value, change, icon }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="w-full min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-medium truncate">{label}</p>
          <p className="mt-2 break-words text-2xl font-bold text-foreground sm:mt-3 sm:text-3xl">{value}</p>
          <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-accent" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-xs sm:text-sm font-semibold ${
                isPositive ? 'text-accent' : 'text-red-600'
              }`}
            >
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <div className="rounded-lg bg-accent/10 p-2.5 sm:p-4 text-accent flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}
