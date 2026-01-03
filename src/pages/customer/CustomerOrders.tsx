import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Truck, Clock, Eye, Filter, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { ordersService } from '@/services/orders.service';
import { Order } from '@/types/order.types';
import { cn } from '@/lib/utils';

const CustomerOrders: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const statusConfig = {
    pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Pending' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light', label: 'Confirmed' },
    processing: { icon: Package, color: 'text-secondary', bg: 'bg-green-light', label: 'Processing' },
    shipped: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light', label: 'Shipped' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light', label: 'Delivered' },
    cancelled: { icon: Package, color: 'text-destructive', bg: 'bg-red-100', label: 'Cancelled' },
  };

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
  ];

  useEffect(() => {
    const fetchCustomerIdAndOrders = async () => {
      if (!profile) return;

      try {
        setLoading(true);

        // Get customer ID
        const { data: customerProfile, error: customerError } = await supabase
          .from('customer_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (customerError) throw customerError;
        setCustomerId(customerProfile.id);

        // Get orders
        const customerOrders = await ordersService.getOrders({
          customer_id: customerProfile.id,
        });
        setOrders(customerOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Error',
          description: 'Failed to load orders',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerIdAndOrders();
  }, [profile, toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return order.status !== 'delivered' && order.status !== 'cancelled';
    if (filter === 'delivered') return order.status === 'delivered';
    return true;
  });

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="My Orders"
      subtitle="Track and manage your orders"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ? "You haven't placed any orders yet" : `No ${filter} orders`}
            </p>
            <Button variant="ocean" className="mt-4" onClick={() => window.location.href = '/marketplace'}>
              Browse Products
            </Button>
          </div>
        )}

        {/* Orders List */}
        {!loading && filteredOrders.length > 0 && (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-2xl p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{order.order_number}</p>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                          config.bg, config.color
                        )}>
                          <config.icon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                    <p className="text-sm text-muted-foreground">{order.payment_status}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium capitalize">
                      {order.payment_method || 'Cash'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'shipped' && (
                      <Button variant="ocean" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Delivery
                      </Button>
                    )}
                    {order.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrders;
