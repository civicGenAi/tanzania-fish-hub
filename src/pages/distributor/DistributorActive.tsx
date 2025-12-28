import React from 'react';
import { Truck, MapPin, Phone, CheckCircle, Navigation } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';

const DistributorActive: React.FC = () => {
  const activeDeliveries = [
    { id: 'DEL-001', customer: 'John Makundi', phone: '+255 712 345 678', pickup: 'Ferry Fish Market', dropoff: 'Serena Hotel, Masaki', status: 'picked_up' },
  ];

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Active Deliveries" subtitle="Currently in progress">
      <div className="space-y-4">
        {activeDeliveries.length > 0 ? activeDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">{delivery.id}</h3>
              <span className="ml-auto px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs animate-pulse">In Progress</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><MapPin className="h-4 w-4 text-primary-foreground" /></div><div><p className="text-xs text-muted-foreground">Pickup</p><p className="font-medium">{delivery.pickup}</p></div></div>
                <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center"><MapPin className="h-4 w-4 text-accent-foreground" /></div><div><p className="text-xs text-muted-foreground">Dropoff</p><p className="font-medium">{delivery.dropoff}</p></div></div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="p-3 bg-background/50 rounded-xl flex items-center justify-between"><div><p className="font-medium">{delivery.customer}</p><p className="text-sm text-muted-foreground">{delivery.phone}</p></div><Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button></div>
                <div className="flex gap-2 mt-3"><Button variant="outline" className="flex-1"><Navigation className="h-4 w-4" />Navigate</Button><Button variant="ocean" className="flex-1"><CheckCircle className="h-4 w-4" />Complete</Button></div>
              </div>
            </div>
          </div>
        )) : <div className="text-center py-12 text-muted-foreground"><Truck className="h-12 w-12 mx-auto mb-3 opacity-50" /><p>No active deliveries</p></div>}
      </div>
    </DashboardLayout>
  );
};

export default DistributorActive;
