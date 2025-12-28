import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Heart, ArrowRight, Package, CheckCircle, Truck, Star,
  TrendingUp, Clock, DollarSign, Award
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { sampleOrders, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  const statusConfig = {
    placed: { icon: Package, color: 'text-muted-foreground', bg: 'bg-muted' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light' },
    packed: { icon: Package, color: 'text-secondary', bg: 'bg-green-light' },
    out_for_delivery: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light' },
  };

  // Spending data for last 6 months
  const spendingData = [85, 120, 95, 145, 110, 165];
  const maxSpending = Math.max(...spendingData);

  // Recent activities
  const activities = [
    { icon: ShoppingBag, text: 'Ordered 3kg Fresh Tilapia', time: '2 hours ago', color: 'text-primary' },
    { icon: Star, text: 'Reviewed Nile Perch order', time: '1 day ago', color: 'text-yellow-500' },
    { icon: Heart, text: 'Added Octopus to favorites', time: '3 days ago', color: 'text-accent' },
    { icon: Package, text: 'Order delivered successfully', time: '5 days ago', color: 'text-secondary' },
  ];

  return (
    <DashboardLayout
      sidebar={<CustomerSidebar />}
      title={`Habari, ${user?.name?.split(' ')[0] || 'Customer'}! 👋`}
      subtitle="Welcome to your dashboard"
    >
      <div className="space-y-6">
        {/* Hero Card */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl p-6 md:p-8 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-6">
            <div className="text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Fish at Your Doorstep
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Browse today's catch from local fishermen
              </p>
              <Link to="/marketplace">
                <Button variant="secondary" size="lg" className="gap-2">
                  Start Shopping
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats preview */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Orders', value: '12', icon: ShoppingBag },
                { label: 'Reward Points', value: '450', icon: Award },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <stat.icon className="h-6 w-6 text-primary-foreground mb-2" />
                  <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats with Progress Rings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: '12', progress: 60, icon: ShoppingBag, color: 'stroke-primary', bg: 'bg-ocean-light' },
            { label: 'Favorites', value: '5', progress: 40, icon: Heart, color: 'stroke-accent', bg: 'bg-coral-light' },
            { label: 'Reviews Given', value: '8', progress: 80, icon: Star, color: 'stroke-yellow-500', bg: 'bg-yellow-50' },
            { label: 'Points Earned', value: '450', progress: 90, icon: Package, color: 'stroke-secondary', bg: 'bg-green-light' },
          ].map((stat) => (
            <div key={stat.label} className={cn("bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all group", stat.bg)}>
              <div className="flex items-center justify-between mb-3">
                {/* Circular Progress */}
                <div className="relative w-14 h-14">
                  <svg className="w-14 h-14 -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      className="stroke-muted/20"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      className={cn(stat.color, "transition-all duration-1000")}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${stat.progress * 1.5} ${150 - stat.progress * 1.5}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <stat.icon className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Spending Trends */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Monthly Spending
                </h3>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatTZS(165000)}</p>
                <p className="text-xs text-secondary flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +23% from last month
                </p>
              </div>
            </div>

            {/* Area Chart */}
            <div className="h-40 flex items-end gap-2">
              {spendingData.map((amount, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full relative">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(amount / maxSpending) * 120}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                        {formatTZS(amount * 1000)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activities
              </h3>
            </div>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 group cursor-pointer p-2 -m-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <activity.icon className={cn("h-4 w-4", activity.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/marketplace" className="group">
            <div className="bg-gradient-to-br from-ocean-light to-ocean-light/50 border border-primary/30 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <ShoppingBag className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Browse Fresh Fish</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore today's fresh catch from local fishermen
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span>Start Shopping</span>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/orders" className="group">
            <div className="bg-gradient-to-br from-green-light to-green-light/50 border border-secondary/30 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <Package className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                  3 Active
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Your Orders</h3>
              <p className="text-sm text-muted-foreground mb-4">
                3 orders are currently being processed
              </p>
              <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                <span>View Orders</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Recent Orders
            </h2>
            <Link to="/dashboard/orders" className="text-sm text-primary hover:underline flex items-center gap-1 group">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {sampleOrders.slice(0, 3).map((order) => {
              const config = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-6 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 2).map((item, i) => (
                        <img
                          key={i}
                          src={item.fish.image}
                          alt={item.fish.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-background group-hover:scale-110 transition-transform"
                        />
                      ))}
                      {order.items.length > 2 && (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                          +{order.items.length - 2}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <span className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium capitalize flex items-center gap-1.5",
                      config.bg, config.color
                    )}>
                      <config.icon className="h-3.5 w-3.5" />
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <p className="font-bold text-lg">{formatTZS(order.total)}</p>
                  </div>

                  {order.status === 'out_for_delivery' && (
                    <Button variant="ocean" size="sm" className="md:ml-auto">
                      <Truck className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
