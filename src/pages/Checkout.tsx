import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building2, Banknote, Loader2, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { ordersService } from '@/services/orders.service';
import { PaymentMethod } from '@/types/order.types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  const shippingFee = 5000; // TZS
  const tax = totalPrice * 0.18; // 18% VAT
  const total = totalPrice + shippingFee + tax;

  useEffect(() => {
    const fetchCustomerId = async () => {
      if (!profile) return;

      try {
        const { data, error } = await supabase
          .from('customer_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (error) throw error;
        setCustomerId(data.id);
      } catch (error) {
        console.error('Error fetching customer profile:', error);
      }
    };

    fetchCustomerId();
  }, [profile]);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please login to proceed with checkout',
        variant: 'default',
      });
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId) {
      toast({
        title: 'Error',
        description: 'Customer profile not found',
        variant: 'destructive',
      });
      return;
    }

    if (paymentMethod === 'mpesa' && !phoneNumber) {
      toast({
        title: 'Phone number required',
        description: 'Please enter your M-Pesa phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create order
      const order = await ordersService.createOrder({
        customer_id: customerId,
        items: items.map(item => ({
          product_id: item.product.id,
          seller_id: item.product.seller_id,
          name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
        payment_method: paymentMethod,
        subtotal: totalPrice,
        shipping_fee: shippingFee,
        tax,
        total,
        notes,
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update order payment status
      await ordersService.updateOrder(order.id, {
        payment_status: 'paid',
        status: 'confirmed',
      });

      clearCart();

      toast({
        title: 'Order placed successfully!',
        description: `Order #${order.order_number} has been confirmed`,
      });

      navigate('/dashboard/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Order failed',
        description: 'Failed to process your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const paymentMethods = [
    { value: 'mpesa', label: 'M-Pesa', icon: Smartphone },
    { value: 'cash', label: 'Cash on Delivery', icon: Banknote },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: Building2 },
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value as PaymentMethod)}
                      className={`p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                        paymentMethod === method.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{method.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    M-Pesa Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="e.g., 0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
              <textarea
                placeholder="Any special instructions for your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                variant="ocean"
                size="lg"
                className="w-full mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
