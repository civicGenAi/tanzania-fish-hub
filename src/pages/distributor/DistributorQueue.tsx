import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { deliveriesService } from '@/services/deliveries.service';
import { DeliveryWithDetails } from '@/types/delivery.types';
import { cn } from '@/lib/utils';

const DistributorQueue: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [deliveries, setDeliveries] = useState<DeliveryWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [distributorId, setDistributorId] = useState<string | null>(null);

  const priorityColors = {
    high: 'bg-accent text-accent-foreground',
    medium: 'bg-yellow-100 text-yellow-700',
    normal: 'bg-muted text-muted-foreground',
    urgent: 'bg-red-100 text-red-700',
  };

  useEffect(() => {
    const fetchDistributorIdAndDeliveries = async () => {
      if (!profile) return;

      try {
        setLoading(true);

        const { data: distributorProfile, error: distributorError } = await supabase
          .from('distributor_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (distributorError) throw distributorError;
        setDistributorId(distributorProfile.id);

        const pendingDeliveries = await deliveriesService.getPendingDeliveries();
        setDeliveries(pendingDeliveries);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        toast({
          title: 'Error',
          description: 'Failed to load delivery queue',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDistributorIdAndDeliveries();
  }, [profile, toast]);

  const handleAcceptDelivery = async (deliveryId: string) => {
    if (!distributorId) return;

    try {
      await deliveriesService.assignDelivery(deliveryId, distributorId);

      setDeliveries(deliveries.filter(d => d.id !== deliveryId));

      toast({
        title: 'Success',
        description: 'Delivery accepted and assigned to you',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept delivery',
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

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Delivery Queue" subtitle="Pending deliveries">
      {loading && (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && deliveries.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No pending deliveries</h3>
          <p className="text-muted-foreground">Check back later for new delivery requests</p>
        </div>
      )}

      {!loading && deliveries.length > 0 && (
        <div className="space-y-4">
          {deliveries.map((delivery, i) => (
            <div key={delivery.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{delivery.delivery_number}</p>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      priorityColors[delivery.priority as keyof typeof priorityColors]
                    )}
                  >
                    {delivery.priority}
                  </span>
                </div>
                {delivery.estimated_time && (
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    {delivery.estimated_time} min
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium text-sm">{delivery.pickup_location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dropoff</p>
                    <p className="font-medium text-sm">{delivery.delivery_location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Order: {delivery.order?.order_number} • {formatPrice(delivery.order?.total || 0)}
                </p>
                <Button
                  variant="ocean"
                  size="sm"
                  onClick={() => handleAcceptDelivery(delivery.id)}
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DistributorQueue;
