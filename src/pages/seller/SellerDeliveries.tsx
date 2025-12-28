import React from 'react';
import { Truck, Package, MapPin, Phone, CheckCircle, Clock } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const SellerDeliveries: React.FC = () => {
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      driver: 'John Mwangi',
      phone: '+255 712 345 678',
      status: 'in_transit',
      pickup: 'Ferry Fish Market',
      destination: 'Serena Hotel, Masaki',
      items: 3,
      estimatedTime: '15 min',
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      driver: 'Grace Kimaro',
      phone: '+255 755 123 456',
      status: 'picked_up',
      pickup: 'Msasani Fish Market',
      destination: 'Mama Lisu Restaurant',
      items: 5,
      estimatedTime: '25 min',
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      driver: 'Peter Mwangi',
      phone: '+255 786 789 012',
      status: 'awaiting_pickup',
      pickup: 'Kunduchi Beach Market',
      destination: 'Africana Hotel',
      items: 2,
      estimatedTime: 'Pending',
    },
  ];

  const statusConfig = {
    awaiting_pickup: { label: 'Awaiting Pickup', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    picked_up: { label: 'Picked Up', color: 'bg-primary text-primary-foreground', icon: Package },
    in_transit: { label: 'In Transit', color: 'bg-accent text-accent-foreground', icon: Truck },
    delivered: { label: 'Delivered', color: 'bg-secondary text-secondary-foreground', icon: CheckCircle },
  };

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Deliveries"
      subtitle="Track your product deliveries"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'In Transit', value: '12', icon: Truck, color: 'bg-accent' },
            { label: 'Awaiting Pickup', value: '5', icon: Clock, color: 'bg-yellow-500' },
            { label: 'Delivered Today', value: '23', icon: CheckCircle, color: 'bg-secondary' },
            { label: 'Total This Week', value: '156', icon: Package, color: 'bg-primary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Deliveries */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Active Deliveries</h2>
          </div>
          <div className="divide-y divide-border">
            {deliveries.map((delivery) => {
              const config = statusConfig[delivery.status as keyof typeof statusConfig];
              return (
                <div key={delivery.id} className="p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{delivery.id}</p>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
                            config.color
                          )}>
                            <config.icon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Order: {delivery.orderId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{delivery.items} items</p>
                        <p className="text-xs text-muted-foreground">ETA: {delivery.estimatedTime}</p>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Pickup</p>
                          <p className="font-medium text-sm">{delivery.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Destination</p>
                          <p className="font-medium text-sm">{delivery.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                          {delivery.driver.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{delivery.driver}</p>
                          <p className="text-xs text-muted-foreground">{delivery.phone}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
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

export default SellerDeliveries;
