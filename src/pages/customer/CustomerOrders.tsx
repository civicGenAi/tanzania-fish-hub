import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Truck, Clock, Eye, Filter, Loader2, Star } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { ordersService } from '@/services/orders.service';
import { deliveriesService } from '@/services/deliveries.service';
import { reviewsService } from '@/services/reviews.service';
import { Order, OrderWithDetails } from '@/types/order.types';
import { Delivery } from '@/types/delivery.types';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CustomerOrders: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<Delivery | null>(null);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [reviewProductId, setReviewProductId] = useState<string | null>(null);
  const [reviewOrderItemId, setReviewOrderItemId] = useState<string | null>(null);
  const [reviewSellerId, setReviewSellerId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

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

        // Get orders with items
        const { data: customerOrders, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .eq('customer_id', customerProfile.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(customerOrders as OrderWithDetails[] || []);
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

  const handleTrackDelivery = async (orderId: string) => {
    try {
      setLoadingDelivery(true);
      setTrackingOrderId(orderId);

      const { data, error } = await supabase
        .from('deliveries')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) throw error;
      setDeliveryInfo(data);
    } catch (error) {
      console.error('Error fetching delivery:', error);
      toast({
        title: 'Error',
        description: 'Failed to load delivery information',
        variant: 'destructive',
      });
      setTrackingOrderId(null);
    } finally {
      setLoadingDelivery(false);
    }
  };

  const deliveryStatusConfig = {
    pending: { label: 'Delivery Pending', color: 'text-muted-foreground' },
    assigned: { label: 'Assigned to Distributor', color: 'text-primary' },
    picked_up: { label: 'Picked Up', color: 'text-secondary' },
    in_transit: { label: 'In Transit', color: 'text-accent' },
    delivered: { label: 'Delivered', color: 'text-secondary' },
    failed: { label: 'Delivery Failed', color: 'text-destructive' },
    cancelled: { label: 'Delivery Cancelled', color: 'text-destructive' },
  };

  const handleOpenReviewModal = (productId: string, orderItemId: string, sellerId: string) => {
    setReviewProductId(productId);
    setReviewOrderItemId(orderItemId);
    setReviewSellerId(sellerId);
    setReviewRating(0);
    setReviewTitle('');
    setReviewComment('');
  };

  const handleCloseReviewModal = () => {
    setReviewProductId(null);
    setReviewOrderItemId(null);
    setReviewSellerId(null);
    setReviewRating(0);
    setReviewTitle('');
    setReviewComment('');
  };

  const handleSubmitReview = async () => {
    if (!customerId || !reviewProductId || !reviewOrderItemId || !reviewSellerId) return;

    if (reviewRating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a rating',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmittingReview(true);

      await reviewsService.createReview({
        product_id: reviewProductId,
        order_item_id: reviewOrderItemId,
        customer_id: customerId,
        seller_id: reviewSellerId,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
      });

      toast({
        title: 'Success',
        description: 'Your review has been submitted',
      });

      handleCloseReviewModal();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmittingReview(false);
    }
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
                      <Button
                        variant="ocean"
                        size="sm"
                        onClick={() => handleTrackDelivery(order.id)}
                        disabled={loadingDelivery && trackingOrderId === order.id}
                      >
                        {loadingDelivery && trackingOrderId === order.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Truck className="h-4 w-4 mr-2" />
                        )}
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

                {/* Order Items - Show for delivered orders to allow reviews */}
                {order.status === 'delivered' && order.items && order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3 text-sm">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × {formatPrice(item.unit_price)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenReviewModal(item.product_id, item.id, item.seller_id)}
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Tracking Info */}
                {trackingOrderId === order.id && deliveryInfo && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Truck className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold">Delivery Tracking</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Number:</span>
                          <span className="font-medium">{deliveryInfo.delivery_number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className={cn(
                            "font-medium capitalize",
                            deliveryStatusConfig[deliveryInfo.status as keyof typeof deliveryStatusConfig]?.color
                          )}>
                            {deliveryStatusConfig[deliveryInfo.status as keyof typeof deliveryStatusConfig]?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pickup Location:</span>
                          <span className="font-medium">{deliveryInfo.pickup_location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Location:</span>
                          <span className="font-medium">{deliveryInfo.delivery_location}</span>
                        </div>
                        {deliveryInfo.pickup_time && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Picked Up:</span>
                            <span className="font-medium">
                              {new Date(deliveryInfo.pickup_time).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {deliveryInfo.delivery_time && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivered:</span>
                            <span className="font-medium">
                              {new Date(deliveryInfo.delivery_time).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => {
                          setTrackingOrderId(null);
                          setDeliveryInfo(null);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        )}

        {/* Review Modal */}
        {reviewProductId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

              {/* Star Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-colors",
                          star <= reviewRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title (Optional)</label>
                <Input
                  placeholder="Summarize your review"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>

              {/* Review Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Review (Optional)</label>
                <textarea
                  placeholder="Share your experience with this product..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCloseReviewModal}
                  disabled={submittingReview}
                >
                  Cancel
                </Button>
                <Button
                  variant="ocean"
                  className="flex-1"
                  onClick={handleSubmitReview}
                  disabled={submittingReview || reviewRating === 0}
                >
                  {submittingReview ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrders;
