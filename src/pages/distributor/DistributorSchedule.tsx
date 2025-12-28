import React from 'react';
import { Calendar, Clock, MapPin, Package } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const DistributorSchedule: React.FC = () => {
  const schedule = [
    {
      time: '08:00 AM',
      deliveries: [
        { id: 'DEL-001', location: 'Serena Hotel, Masaki', items: 3, earnings: 5000 },
        { id: 'DEL-002', location: 'Mama Lisu Restaurant', items: 5, earnings: 7500 },
      ],
    },
    {
      time: '10:00 AM',
      deliveries: [
        { id: 'DEL-003', location: 'Africana Hotel', items: 2, earnings: 5000 },
        { id: 'DEL-004', location: 'Mikocheni Market', items: 4, earnings: 6000 },
      ],
    },
    {
      time: '12:00 PM',
      deliveries: [
        { id: 'DEL-005', location: 'Oyster Bay Restaurant', items: 6, earnings: 8000 },
      ],
    },
    {
      time: '02:00 PM',
      deliveries: [
        { id: 'DEL-006', location: 'Slipway Shopping Center', items: 3, earnings: 5500 },
        { id: 'DEL-007', location: 'Sea Cliff Hotel', items: 8, earnings: 10000 },
      ],
    },
  ];

  const totalDeliveries = schedule.reduce((sum, slot) => sum + slot.deliveries.length, 0);
  const totalEarnings = schedule.reduce(
    (sum, slot) => sum + slot.deliveries.reduce((s, d) => s + d.earnings, 0),
    0
  );

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Delivery Schedule" subtitle="Plan your day">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Deliveries', value: totalDeliveries.toString(), icon: Package, color: 'bg-accent' },
            { label: 'Time Slots', value: schedule.length.toString(), icon: Clock, color: 'bg-primary' },
            { label: 'Expected Earnings', value: formatTZS(totalEarnings), icon: Calendar, color: 'bg-secondary' },
            { label: 'Avg per Delivery', value: formatTZS(Math.round(totalEarnings / totalDeliveries)), icon: MapPin, color: 'bg-yellow-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Schedule Timeline */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="space-y-6">
            {schedule.map((slot, index) => (
              <div key={slot.time} className="relative">
                {index !== schedule.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                )}
                <div className="flex gap-4">
                  {/* Time */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                      <Clock className="h-5 w-5" />
                    </div>
                    <p className="mt-2 text-sm font-medium">{slot.time}</p>
                  </div>

                  {/* Deliveries */}
                  <div className="flex-1 space-y-3">
                    {slot.deliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{delivery.id}</p>
                            <p className="text-sm text-muted-foreground">{delivery.location}</p>
                            <p className="text-xs text-muted-foreground mt-1">{delivery.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-secondary">{formatTZS(delivery.earnings)}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorSchedule;
