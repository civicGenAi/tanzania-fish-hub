import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, Truck, Clock, Filter, Search, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { ordersService } from '@/services/orders.service';
import { OrderWithDetails, OrderStatus } from '@/types/order.types';
import { cn } from '@/lib/utils';

const SellerOrders: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState<string | null>(null);

  const statusConfig = {
    pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Pending' },
    confirmed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-ocean-light', label: 'Confirmed' },
    processing: { icon: Package, color: 'text-secondary', bg: 'bg-green-light', label: 'Processing' },
    shipped: { icon: Truck, color: 'text-accent', bg: 'bg-coral-light', label: 'Shipped' },
    delivered: { icon: CheckCircle, color: 'text-secondary', bg: 'bg-green-light', label: 'Completed' },
    cancelled: { icon: Package, color: 'text-destructive', bg: 'bg-red-100', label: 'Cancelled' },
  };

  useEffect(() => {
    const fetchSellerIdAndOrders = async () => {
      if (!profile) return;

      try {
        setLoading(true);

        // Get seller ID
        const { data: sellerProfile, error: sellerError } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerError) throw sellerError;
        setSellerId(sellerProfile.id);

        // Get orders
        const sellerOrders = await ordersService.getSellerOrders(sellerProfile.id);
        setOrders(sellerOrders);
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

    fetchSellerIdAndOrders();
  }, [profile, toast]);

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await ordersService.updateOrder(orderId, { status: newStatus });

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: 'Success',
        description: `Order status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredOrders = orders.filter(order =>
    filter === 'all' || order.status === filter
  );

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Orders"
      subtitle="Manage incoming orders"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredOrders.length} orders
          </div>
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
              {filter === 'all' ? 'You have no orders yet' : `No ${filter} orders`}
            </p>
          </div>
        )}

        {/* Orders List */}
        {!loading && filteredOrders.length > 0 && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status];
                const myItems = order.items?.filter(item => item.seller_id === sellerId) || [];

                return (
                  <div key={order.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{order.order_number}</p>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1",
                            config.bg, config.color
                          )}>
                            <config.icon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                        <p className="text-xs text-muted-foreground">Payment: {order.payment_status}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {myItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 pr-3">
                          <Package className="w-10 h-10 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} × {formatPrice(item.unit_price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {order.payment_method?.toUpperCase() || 'Cash'}
                      </div>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            >
                              Reject
                            </Button>
                            <Button
                              variant="ocean"
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <Button
                            variant="ocean"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'processing')}
                          >
                            Start Processing
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button
                            variant="ocean"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'shipped')}
                          >
                            Mark as Shipped
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SellerOrders;
