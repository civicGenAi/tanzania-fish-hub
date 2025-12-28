import React from 'react';
import { MapPin, Package, Clock, Navigation, Phone } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';

const DistributorPickups: React.FC = () => {
  const pickupPoints = [
    {
      id: '1',
      name: 'Ferry Fish Market',
      address: 'Ferry Road, Kivukoni',
      phone: '+255 712 345 678',
      pendingOrders: 8,
      openHours: '5:00 AM - 6:00 PM',
      distance: '2.3 km',
    },
    {
      id: '2',
      name: 'Msasani Fish Market',
      address: 'Msasani Peninsula',
      phone: '+255 755 123 456',
      pendingOrders: 5,
      openHours: '6:00 AM - 5:00 PM',
      distance: '4.1 km',
    },
    {
      id: '3',
      name: 'Kunduchi Beach Market',
      address: 'Kunduchi Beach Road',
      phone: '+255 786 789 012',
      pendingOrders: 3,
      openHours: '5:30 AM - 7:00 PM',
      distance: '8.7 km',
    },
    {
      id: '4',
      name: 'Kariakoo Fish Vendors',
      address: 'Kariakoo Market, Ilala',
      phone: '+255 765 432 109',
      pendingOrders: 12,
      openHours: '4:00 AM - 8:00 PM',
      distance: '3.2 km',
    },
  ];

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Pickup Points" subtitle="Available collection locations">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Locations', value: pickupPoints.length.toString(), icon: MapPin },
            { label: 'Pending Pickups', value: pickupPoints.reduce((sum, p) => sum + p.pendingOrders, 0).toString(), icon: Package },
            { label: 'Active Now', value: '3', icon: Clock },
            { label: 'Nearest', value: '2.3 km', icon: Navigation },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pickup Points List */}
        <div className="grid md:grid-cols-2 gap-4">
          {pickupPoints.map((point) => (
            <div key={point.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{point.name}</h3>
                    <p className="text-sm text-muted-foreground">{point.address}</p>
                  </div>
                </div>
                {point.pendingOrders > 0 && (
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                    {point.pendingOrders} pending
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{point.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{point.openHours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span>{point.distance} away</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ocean" size="sm" className="flex-1">
                  <Navigation className="h-4 w-4 mr-1" />
                  Navigate
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorPickups;
