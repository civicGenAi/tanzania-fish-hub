import React from 'react';
import { History, CheckCircle, RotateCcw, Download } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { sampleOrders, formatTZS } from '@/data/fishData';

const CustomerHistory: React.FC = () => {
  const completedOrders = sampleOrders.filter(o => o.status === 'delivered');

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="Order History"
      subtitle="View your past orders"
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: '24', icon: History },
            { label: 'Total Spent', value: formatTZS(2450000), icon: CheckCircle },
            { label: 'This Month', value: '5', icon: History },
            { label: 'Avg Order', value: formatTZS(102000), icon: CheckCircle },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Order History List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Completed Orders</h2>
          </div>
          <div className="divide-y divide-border">
            {completedOrders.length > 0 ? completedOrders.map((order) => (
              <div key={order.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{formatTZS(order.total)}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                    Reorder
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                    Receipt
                  </Button>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No completed orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerHistory;
