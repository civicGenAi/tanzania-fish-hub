import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, MapPin, Bell, Settings, LogOut, 
  Package, Clock, CheckCircle, Truck, ArrowRight,
  CreditCard, Star
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { sampleOrders, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statusConfig = {
    placed: { icon: Package, color: 'text-muted-foreground', bg: 'bg-muted' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light' },
    packed: { icon: Package, color: 'text-secondary', bg: 'bg-green-light' },
    out_for_delivery: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light' },
  };

  const menuItems = [
    { icon: ShoppingBag, label: 'My Orders', count: 3 },
    { icon: Heart, label: 'Favorites', count: 5 },
    { icon: MapPin, label: 'Addresses', count: 2 },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Bell, label: 'Notifications', count: 2 },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-8 md:py-12">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Habari, {user?.name?.split(' ')[0] || 'Customer'}! 👋
              </h1>
              <p className="text-muted-foreground">Welcome to your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: '12', icon: ShoppingBag },
                  { label: 'Favorites', value: '5', icon: Heart },
                  { label: 'Reviews', value: '8', icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                  <Link to="/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {sampleOrders.slice(0, 3).map((order) => {
                    const config = statusConfig[order.status];
                    return (
                      <div
                        key={order.id}
                        className="bg-card border border-border rounded-2xl p-4 md:p-6"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1",
                            config.bg, config.color
                          )}>
                            <config.icon className="h-3 w-3" />
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          {order.items.slice(0, 3).map((item, i) => (
                            <img
                              key={i}
                              src={item.fish.image}
                              alt={item.fish.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items • {order.deliveryAddress.split(',')[0]}
                          </p>
                          <p className="font-semibold">{formatTZS(order.total)}</p>
                        </div>

                        {order.status === 'out_for_delivery' && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <Link to={`/track/${order.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                <Truck className="h-4 w-4" />
                                Track Delivery
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Menu */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                      {item.count && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>

              {/* Quick Actions */}
              <div className="bg-ocean-light border border-primary/20 rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Need Fresh Fish?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our marketplace for today's fresh catch
                </p>
                <Link to="/marketplace">
                  <Button variant="ocean" className="w-full">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomerDashboard;
