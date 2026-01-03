import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Phone, CheckCircle, Navigation, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { deliveriesService } from '@/services/deliveries.service';
import { DeliveryWithDetails } from '@/types/delivery.types';

const DistributorActive: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [deliveries, setDeliveries] = useState<DeliveryWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [distributorId, setDistributorId] = useState<string | null>(null);

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

        const activeDeliveries = await deliveriesService.getDistributorDeliveries(
          distributorProfile.id,
          { status: 'assigned' }
        );

        const inTransitDeliveries = await deliveriesService.getDistributorDeliveries(
          distributorProfile.id,
          { status: 'in_transit' }
        );

        const pickedUpDeliveries = await deliveriesService.getDistributorDeliveries(
          distributorProfile.id,
          { status: 'picked_up' }
        );

        setDeliveries([...activeDeliveries, ...inTransitDeliveries, ...pickedUpDeliveries]);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        toast({
          title: 'Error',
          description: 'Failed to load active deliveries',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDistributorIdAndDeliveries();
  }, [profile, toast]);

  const handleStatusUpdate = async (deliveryId: string, newStatus: string) => {
    try {
      await deliveriesService.updateDeliveryStatus(deliveryId, newStatus);

      if (newStatus === 'delivered') {
        setDeliveries(deliveries.filter(d => d.id !== deliveryId));
        toast({
          title: 'Success',
          description: 'Delivery marked as completed',
        });
      } else {
        setDeliveries(
          deliveries.map(d =>
            d.id === deliveryId ? { ...d, status: newStatus as any } : d
          )
        );
        toast({
          title: 'Success',
          description: `Delivery status updated to ${newStatus}`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update delivery status',
        variant: 'destructive',
      });
    }
  };

  const getNextStatus = (currentStatus: string) => {
    if (currentStatus === 'assigned') return 'picked_up';
    if (currentStatus === 'picked_up') return 'in_transit';
    if (currentStatus === 'in_transit') return 'delivered';
    return 'delivered';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'assigned') return 'Pickup Order';
    if (status === 'picked_up') return 'Start Transit';
    if (status === 'in_transit') return 'Complete Delivery';
    return 'Complete';
  };

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Active Deliveries" subtitle="Currently in progress">
      {loading && (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && deliveries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No active deliveries</p>
        </div>
      )}

      {!loading && deliveries.length > 0 && (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">{delivery.delivery_number}</h3>
                <span className="ml-auto px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs animate-pulse">
                  {delivery.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p className="font-medium">{delivery.pickup_location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dropoff</p>
                      <p className="font-medium">{delivery.delivery_location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="p-3 bg-background/50 rounded-xl">
                    <p className="font-medium">Order: {delivery.order?.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      Status: {delivery.order?.status}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        if (delivery.delivery_lat && delivery.delivery_lng) {
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${delivery.delivery_lat},${delivery.delivery_lng}`,
                            '_blank'
                          );
                        }
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Navigate
                    </Button>
                    <Button
                      variant="ocean"
                      className="flex-1"
                      onClick={() =>
                        handleStatusUpdate(delivery.id, getNextStatus(delivery.status))
                      }
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {getStatusLabel(delivery.status)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DistributorActive;
