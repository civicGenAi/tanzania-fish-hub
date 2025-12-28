import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Truck, Clock, Eye, Filter } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { sampleOrders, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const CustomerOrders: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const statusConfig = {
    placed: { icon: Package, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Placed' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light', label: 'Confirmed' },
    packed: { icon: Package, color: 'text-secondary', bg: 'bg-green-light', label: 'Packed' },
    out_for_delivery: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light', label: 'Out for Delivery' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light', label: 'Delivered' },
  };

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const filteredOrders = sampleOrders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return order.status !== 'delivered';
    if (filter === 'delivered') return order.status === 'delivered';
    return true;
  });

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="My Orders"
      subtitle="Track and manage your orders"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            return (
              <div
                key={order.id}
                className="bg-card border border-border rounded-2xl p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{order.id}</p>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                        config.bg, config.color
                      )}>
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatTZS(order.total)}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 pr-4 shrink-0">
                      <img
                        src={item.fish.image}
                        alt={item.fish.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.fish.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}{item.fish.unit} × {formatTZS(item.fish.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Estimated delivery:</span>
                    <span className="font-medium">
                      {new Date(order.estimatedDelivery).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'out_for_delivery' && (
                      <Link to={`/track/${order.id}`}>
                        <Button variant="ocean" size="sm">
                          <Truck className="h-4 w-4" />
                          Track Delivery
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrders;
