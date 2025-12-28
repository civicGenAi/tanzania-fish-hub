import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Heart, ArrowRight, Package, CheckCircle, Truck, Star
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

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title={`Habari, ${user?.name?.split(' ')[0] || 'Customer'}! 👋`}
      subtitle="Welcome to your dashboard"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-primary' },
            { label: 'Favorites', value: '5', icon: Heart, color: 'bg-accent' },
            { label: 'Reviews Given', value: '8', icon: Star, color: 'bg-yellow-500' },
            { label: 'Points Earned', value: '450', icon: Package, color: 'bg-secondary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 md:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-ocean-light border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Browse Fresh Fish</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore today's fresh catch from local fishermen
            </p>
            <Link to="/marketplace">
              <Button variant="ocean">
                Go to Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="bg-green-light border border-secondary/20 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Track Your Orders</h3>
            <p className="text-sm text-muted-foreground mb-4">
              3 orders are currently being processed
            </p>
            <Link to="/dashboard/orders">
              <Button variant="fresh">
                View Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {sampleOrders.slice(0, 3).map((order) => {
              const config = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 2).map((item, i) => (
                        <img
                          key={i}
                          src={item.fish.image}
                          alt={item.fish.name}
                          className="w-10 h-10 rounded-lg object-cover border-2 border-background"
                        />
                      ))}
                      {order.items.length > 2 && (
                        <div className="w-10 h-10 rounded-lg bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{order.items.length - 2}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1",
                      config.bg, config.color
                    )}>
                      <config.icon className="h-3 w-3" />
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <p className="font-semibold text-sm">{formatTZS(order.total)}</p>
                  </div>

                  {order.status === 'out_for_delivery' && (
                    <Link to={`/track/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                    </Link>
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
