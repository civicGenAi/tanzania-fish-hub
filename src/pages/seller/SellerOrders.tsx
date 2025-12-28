import React, { useState } from 'react';
import { Package, CheckCircle, Truck, Clock, Filter, Search } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { sampleOrders, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const SellerOrders: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const statusConfig = {
    placed: { icon: Package, color: 'text-muted-foreground', bg: 'bg-muted', label: 'New' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light', label: 'Confirmed' },
    packed: { icon: Package, color: 'text-secondary', bg: 'bg-green-light', label: 'Packed' },
    out_for_delivery: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light', label: 'Shipped' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light', label: 'Completed' },
  };

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Orders"
      subtitle="Manage incoming orders"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'placed', 'confirmed', 'packed', 'out_for_delivery'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {f === 'all' ? 'All' : f.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {sampleOrders.map((order) => {
              const config = statusConfig[order.status];
              return (
                <div key={order.id} className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{order.id}</p>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
                          config.bg, config.color
                        )}>
                          <config.icon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatTZS(order.total)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 pr-3">
                        <img src={item.fish.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium">{item.fish.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity}{item.fish.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {order.deliveryAddress.split(',')[0]}
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'placed' && (
                        <>
                          <Button variant="outline" size="sm">Reject</Button>
                          <Button variant="ocean" size="sm">Accept</Button>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <Button variant="ocean" size="sm">Mark as Packed</Button>
                      )}
                      {order.status === 'packed' && (
                        <Button variant="ocean" size="sm">Assign Delivery</Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerOrders;
