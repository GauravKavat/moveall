import { Activity } from '@/lib/types';
import {
  Package,
  Truck,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

const formatActivityTime = (timestamp: Date) => {
  const hours = String(timestamp.getHours()).padStart(2, '0');
  const minutes = String(timestamp.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: Activity['type']) => {
    const iconProps = 'h-4 w-4';
    const baseClasses = 'rounded-full p-2';
    
    switch (type) {
      case 'order':
        return <div className={`${baseClasses} bg-blue-100`}><Package className={`${iconProps} text-blue-700`} /></div>;
      case 'shipment':
        return <div className={`${baseClasses} bg-green-100`}><Truck className={`${iconProps} text-green-700`} /></div>;
      case 'exception':
        return <div className={`${baseClasses} bg-red-100`}><AlertCircle className={`${iconProps} text-red-700`} /></div>;
      case 'rto':
        return <div className={`${baseClasses} bg-orange-100`}><RotateCcw className={`${iconProps} text-orange-700`} /></div>;
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold">Activity Feed</h3>
      <div className="flex-1 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            {getIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatActivityTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
