import React from 'react';
import { Package, MapPin, Clock, Phone } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const DistributorQueue: React.FC = () => {
  const queue = [
    { id: 'DEL-001', pickup: 'Ferry Fish Market', dropoff: 'Serena Hotel, Masaki', items: 3, total: 185000, priority: 'high', eta: '15 min' },
    { id: 'DEL-002', pickup: 'Msasani Fish Market', dropoff: 'Mama Lisu Restaurant', items: 5, total: 320000, priority: 'medium', eta: '25 min' },
    { id: 'DEL-003', pickup: 'Kunduchi Beach', dropoff: 'Africana Hotel, CBD', items: 2, total: 95000, priority: 'normal', eta: '40 min' },
  ];

  const priorityColors = { high: 'bg-accent text-accent-foreground', medium: 'bg-yellow-100 text-yellow-700', normal: 'bg-muted text-muted-foreground' };

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Delivery Queue" subtitle="Pending deliveries">
      <div className="space-y-4">
        {queue.map((item, i) => (
          <div key={item.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium">{i + 1}</div>
              <div className="flex-1">
                <p className="font-semibold">{item.id}</p>
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", priorityColors[item.priority as keyof typeof priorityColors])}>{item.priority}</span>
              </div>
              <div className="flex items-center gap-1 text-sm"><Clock className="h-4 w-4" />{item.eta}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /><div><p className="text-xs text-muted-foreground">Pickup</p><p className="font-medium text-sm">{item.pickup}</p></div></div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-0.5" /><div><p className="text-xs text-muted-foreground">Dropoff</p><p className="font-medium text-sm">{item.dropoff}</p></div></div>
            </div>
            <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{item.items} items • {formatTZS(item.total)}</p><Button variant="ocean" size="sm">Accept</Button></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DistributorQueue;
