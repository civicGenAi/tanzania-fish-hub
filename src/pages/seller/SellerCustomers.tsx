import React from 'react';
import { Users, ShoppingBag, Star, TrendingUp, Search, Phone } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const SellerCustomers: React.FC = () => {
  const customers = [
    { id: '1', name: 'Serena Hotel', type: 'Hotel', orders: 24, spent: 2400000, lastOrder: '2 days ago', rating: 5 },
    { id: '2', name: 'Mama Lisu Restaurant', type: 'Restaurant', orders: 18, spent: 1800000, lastOrder: '1 week ago', rating: 4 },
    { id: '3', name: 'Mikocheni Butchery', type: 'Butchery', orders: 12, spent: 960000, lastOrder: '3 days ago', rating: 5 },
    { id: '4', name: 'Africana Hotel', type: 'Hotel', orders: 8, spent: 720000, lastOrder: '5 days ago', rating: 4 },
    { id: '5', name: 'Fresh Corner Shop', type: 'Retail', orders: 6, spent: 480000, lastOrder: '1 day ago', rating: 5 },
  ];

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Customers"
      subtitle="View your customer base"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: '89', icon: Users, color: 'bg-primary' },
            { label: 'Repeat Customers', value: '56', icon: TrendingUp, color: 'bg-secondary' },
            { label: 'Avg Orders/Customer', value: '4.2', icon: ShoppingBag, color: 'bg-accent' },
            { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' },
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Customer List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {customers.map((customer) => (
              <div key={customer.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center font-bold text-primary">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center flex-1">
                  <div>
                    <p className="font-semibold">{customer.orders}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="font-semibold">{formatTZS(customer.spent)}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{customer.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                  Contact
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerCustomers;
