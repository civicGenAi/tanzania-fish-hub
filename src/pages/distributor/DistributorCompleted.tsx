import React from 'react';
import { CheckCircle, Package, DollarSign, Star, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const DistributorCompleted: React.FC = () => {
  const completedDeliveries = [
    {
      id: 'DEL-012',
      date: 'Today, 2:30 PM',
      location: 'Serena Hotel, Masaki',
      items: 3,
      earnings: 5000,
      rating: 5,
    },
    {
      id: 'DEL-011',
      date: 'Today, 1:15 PM',
      location: 'Mama Lisu Restaurant',
      items: 5,
      earnings: 7500,
      rating: 5,
    },
    {
      id: 'DEL-010',
      date: 'Today, 11:45 AM',
      location: 'Africana Hotel',
      items: 2,
      earnings: 5000,
      rating: 4,
    },
    {
      id: 'DEL-009',
      date: 'Today, 10:20 AM',
      location: 'Mikocheni Market',
      items: 4,
      earnings: 6000,
      rating: 5,
    },
    {
      id: 'DEL-008',
      date: 'Today, 9:00 AM',
      location: 'Oyster Bay Restaurant',
      items: 6,
      earnings: 8000,
      rating: 5,
    },
    {
      id: 'DEL-007',
      date: 'Yesterday, 5:30 PM',
      location: 'Slipway Shopping Center',
      items: 3,
      earnings: 5500,
      rating: 4,
    },
  ];

  const totalEarnings = completedDeliveries.reduce((sum, d) => sum + d.earnings, 0);
  const avgRating = (completedDeliveries.reduce((sum, d) => sum + d.rating, 0) / completedDeliveries.length).toFixed(1);

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Completed Deliveries" subtitle="Your delivery history">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Completed', value: completedDeliveries.length.toString(), icon: CheckCircle, color: 'bg-secondary' },
            { label: 'Items Delivered', value: completedDeliveries.reduce((sum, d) => sum + d.items, 0).toString(), icon: Package, color: 'bg-primary' },
            { label: 'Total Earnings', value: formatTZS(totalEarnings), icon: DollarSign, color: 'bg-accent' },
            { label: 'Avg Rating', value: avgRating, icon: Star, color: 'bg-yellow-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant="ghost" size="sm">This Week</Button>
          <Button variant="ghost" size="sm">This Month</Button>
        </div>

        {/* Completed List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Recent Completions</h2>
          </div>
          <div className="divide-y divide-border">
            {completedDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-green-light flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{delivery.id}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < delivery.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{delivery.location}</p>
                    <p className="text-xs text-muted-foreground">{delivery.date} • {delivery.items} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-secondary">{formatTZS(delivery.earnings)}</p>
                  <Button variant="ghost" size="sm" className="mt-1">View</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorCompleted;
