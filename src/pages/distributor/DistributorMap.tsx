import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';

const DistributorMap: React.FC = () => {
  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Route Map" subtitle="Optimized delivery route">
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-2xl p-6 h-[400px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-ocean-light flex items-center justify-center mb-4">
            <Navigation className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Route Optimization</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">View your optimized delivery route with turn-by-turn navigation integrated with Google Maps.</p>
          <Button variant="ocean"><Navigation className="h-4 w-4" />Open in Maps</Button>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <h4 className="font-semibold mb-3">Today's Stops</h4>
          <div className="space-y-3">
            {['Ferry Fish Market (Pickup)', 'Serena Hotel (Delivery)', 'Msasani Market (Pickup)', 'Mama Lisu Restaurant (Delivery)'].map((stop, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">{i + 1}</div>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{stop}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorMap;
