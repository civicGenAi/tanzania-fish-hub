import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const SellerAnalytics: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: formatTZS(4850000), change: '+18%', icon: DollarSign },
    { label: 'Total Orders', value: '156', change: '+12%', icon: TrendingUp },
    { label: 'Unique Customers', value: '89', change: '+24%', icon: Users },
    { label: 'Avg Order Value', value: formatTZS(31090), change: '+5%', icon: BarChart3 },
  ];

  const topProducts = [
    { name: 'Fresh Tilapia', sales: 48, revenue: 720000 },
    { name: 'Nile Perch', sales: 35, revenue: 875000 },
    { name: 'Dagaa (Sardines)', sales: 62, revenue: 310000 },
    { name: 'Octopus', sales: 18, revenue: 540000 },
  ];

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Analytics"
      subtitle="Track your business performance"
    >
      <div className="space-y-6">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-secondary flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Revenue Trend</h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full ocean-gradient rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${[40, 65, 55, 80, 70, 95][i]}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <p className="font-semibold">{formatTZS(product.revenue)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerAnalytics;
