import React, { useState } from 'react';
import { 
  Truck, Package, MapPin, Clock, CheckCircle, Phone, 
  Navigation, DollarSign, ArrowUpRight, Play, Pause
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { sampleOrders, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const DistributorDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  const activeDeliveries = sampleOrders.filter(o => o.status === 'out_for_delivery');
  const pendingPickups = sampleOrders.filter(o => o.status === 'packed');
  const completedToday = sampleOrders.filter(o => o.status === 'delivered');

  const stats = [
    { label: 'Today\'s Deliveries', value: '12', change: '+3', icon: Truck, color: 'bg-accent' },
    { label: 'Pending Pickups', value: pendingPickups.length.toString(), change: 'new', icon: Package, color: 'bg-primary' },
    { label: 'Completed', value: completedToday.length.toString(), change: '100%', icon: CheckCircle, color: 'bg-secondary' },
    { label: 'Today\'s Earnings', value: formatTZS(125000), change: '+18%', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  const deliveryQueue = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      pickup: 'Ferry Fish Market',
      dropoff: 'Serena Hotel, Masaki',
      customer: 'John Makundi',
      phone: '+255 712 345 678',
      items: 3,
      total: 185000,
      priority: 'high',
      eta: '15 min',
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      pickup: 'Msasani Fish Market',
      dropoff: 'Mama Lisu Restaurant, Mikocheni',
      customer: 'Grace Kimaro',
      phone: '+255 755 123 456',
      items: 5,
      total: 320000,
      priority: 'medium',
      eta: '25 min',
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      pickup: 'Kunduchi Beach',
      dropoff: 'Africana Hotel, CBD',
      customer: 'Peter Mwangi',
      phone: '+255 786 789 012',
      items: 2,
      total: 95000,
      priority: 'normal',
      eta: '40 min',
    },
  ];

  const priorityColors = {
    high: 'bg-accent text-accent-foreground',
    medium: 'bg-yellow-100 text-yellow-700',
    normal: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout 
      sidebar={<DistributorSidebar />}
      title="Delivery Hub"
      subtitle={`Welcome, ${profile?.full_name || 'Driver'}`}
    >
      <div className="space-y-6">
        {/* Status Toggle */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full",
              isOnline ? "bg-secondary animate-pulse" : "bg-muted-foreground"
            )} />
            <div>
              <p className="font-medium">{isOnline ? 'You are Online' : 'You are Offline'}</p>
              <p className="text-sm text-muted-foreground">
                {isOnline ? 'Ready to receive delivery requests' : 'Not accepting new deliveries'}
              </p>
            </div>
          </div>
          <Button 
            variant={isOnline ? "outline" : "ocean"}
            onClick={() => setIsOnline(!isOnline)}
            className="gap-2"
          >
            {isOnline ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium text-secondary">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Delivery */}
        {activeDeliveries.length > 0 && (
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Active Delivery</h2>
              <span className="ml-auto px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium animate-pulse">
                In Progress
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium">Ferry Fish Market</p>
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-dashed border-border h-4" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Drop-off</p>
                    <p className="font-medium">Serena Hotel, Masaki</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl mb-3">
                  <div>
                    <p className="font-medium">John Makundi</p>
                    <p className="text-sm text-muted-foreground">+255 712 345 678</p>
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="ocean" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Queue */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Delivery Queue</h2>
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {deliveryQueue.length}
              </span>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="divide-y divide-border">
            {deliveryQueue.map((delivery, index) => (
              <div key={delivery.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{delivery.orderId}</p>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium capitalize",
                          priorityColors[delivery.priority as keyof typeof priorityColors]
                        )}>
                          {delivery.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{delivery.items} items • {formatTZS(delivery.total)}</p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Pickup</p>
                      <p className="font-medium truncate">{delivery.pickup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Drop-off</p>
                      <p className="font-medium truncate">{delivery.dropoff}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">ETA:</span>
                      <span className="font-medium">{delivery.eta}</span>
                    </div>
                    <Button variant="ocean" size="sm">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-ocean-light border border-primary/20 rounded-2xl text-left hover:bg-ocean-light/80 transition-colors">
            <Navigation className="h-6 w-6 text-primary mb-2" />
            <p className="font-semibold">Open Map</p>
            <p className="text-sm text-muted-foreground">View optimized route</p>
          </button>
          <button className="p-4 bg-green-light border border-secondary/20 rounded-2xl text-left hover:bg-green-light/80 transition-colors">
            <DollarSign className="h-6 w-6 text-secondary mb-2" />
            <p className="font-semibold">View Earnings</p>
            <p className="text-sm text-muted-foreground">Check today's income</p>
          </button>
          <button className="p-4 bg-coral-light border border-accent/20 rounded-2xl text-left hover:bg-coral-light/80 transition-colors">
            <Phone className="h-6 w-6 text-accent mb-2" />
            <p className="font-semibold">Contact Support</p>
            <p className="text-sm text-muted-foreground">Get help quickly</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorDashboard;
