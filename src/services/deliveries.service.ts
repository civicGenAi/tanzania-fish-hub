import { supabase } from '@/lib/supabase';
import {
  Delivery,
  DeliveryWithDetails,
  CreateDeliveryData,
  UpdateDeliveryData,
  DeliveryFilters,
  DeliveryLocation,
} from '@/types/delivery.types';

class DeliveriesService {
  // Create a new delivery
  async createDelivery(deliveryData: CreateDeliveryData): Promise<Delivery> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .insert({
          order_id: deliveryData.order_id,
          pickup_location: deliveryData.pickup_location,
          delivery_location: deliveryData.delivery_location,
          pickup_lat: deliveryData.pickup_lat,
          pickup_lng: deliveryData.pickup_lng,
          delivery_lat: deliveryData.delivery_lat,
          delivery_lng: deliveryData.delivery_lng,
          priority: deliveryData.priority || 'normal',
          scheduled_time: deliveryData.scheduled_time,
          notes: deliveryData.notes,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating delivery:', error);
      throw error;
    }
  }

  // Get delivery by ID with details
  async getDeliveryById(deliveryId: string): Promise<DeliveryWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select(`
          *,
          order:orders(id, order_number, customer_id, total, status),
          distributor:distributor_profiles(id, user_id, full_name, phone, vehicle_type, vehicle_number)
        `)
        .eq('id', deliveryId)
        .single();

      if (error) throw error;
      return data as DeliveryWithDetails;
    } catch (error) {
      console.error('Error fetching delivery:', error);
      return null;
    }
  }

  // Get deliveries with filters
  async getDeliveries(filters?: DeliveryFilters): Promise<Delivery[]> {
    try {
      let query = supabase
        .from('deliveries')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.distributor_id) {
        query = query.eq('distributor_id', filters.distributor_id);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }

      if (filters?.from_date) {
        query = query.gte('created_at', filters.from_date);
      }

      if (filters?.to_date) {
        query = query.lte('created_at', filters.to_date);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      throw error;
    }
  }

  // Get distributor deliveries with details
  async getDistributorDeliveries(
    distributorId: string,
    filters?: DeliveryFilters
  ): Promise<DeliveryWithDetails[]> {
    try {
      let query = supabase
        .from('deliveries')
        .select(`
          *,
          order:orders(id, order_number, customer_id, total, status)
        `)
        .eq('distributor_id', distributorId)
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as DeliveryWithDetails[];
    } catch (error) {
      console.error('Error fetching distributor deliveries:', error);
      throw error;
    }
  }

  // Get pending deliveries (queue)
  async getPendingDeliveries(): Promise<DeliveryWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select(`
          *,
          order:orders(id, order_number, customer_id, total, status)
        `)
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as DeliveryWithDetails[];
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
      throw error;
    }
  }

  // Update delivery
  async updateDelivery(deliveryId: string, updates: UpdateDeliveryData): Promise<Delivery> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update(updates)
        .eq('id', deliveryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating delivery:', error);
      throw error;
    }
  }

  // Assign delivery to distributor
  async assignDelivery(deliveryId: string, distributorId: string): Promise<Delivery> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          distributor_id: distributorId,
          status: 'assigned',
        })
        .eq('id', deliveryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error assigning delivery:', error);
      throw error;
    }
  }

  // Update delivery status
  async updateDeliveryStatus(
    deliveryId: string,
    status: string,
    additionalData?: Partial<UpdateDeliveryData>
  ): Promise<Delivery> {
    try {
      const updates: any = { status, ...additionalData };

      // Set timestamps based on status
      if (status === 'picked_up' && !updates.pickup_time) {
        updates.pickup_time = new Date().toISOString();
      } else if (status === 'delivered' && !updates.delivery_time) {
        updates.delivery_time = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('deliveries')
        .update(updates)
        .eq('id', deliveryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }
  }

  // Track delivery location
  async trackDeliveryLocation(
    deliveryId: string,
    location: DeliveryLocation
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('delivery_tracking')
        .insert({
          delivery_id: deliveryId,
          lat: location.lat,
          lng: location.lng,
          timestamp: location.timestamp,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking delivery location:', error);
      throw error;
    }
  }

  // Get delivery tracking history
  async getDeliveryTracking(deliveryId: string): Promise<DeliveryLocation[]> {
    try {
      const { data, error } = await supabase
        .from('delivery_tracking')
        .select('lat, lng, timestamp')
        .eq('delivery_id', deliveryId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching delivery tracking:', error);
      return [];
    }
  }

  // Get delivery statistics for distributor
  async getDistributorStats(distributorId: string): Promise<{
    total: number;
    pending: number;
    active: number;
    completed: number;
    failed: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select('status')
        .eq('distributor_id', distributorId);

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        pending: 0,
        active: 0,
        completed: 0,
        failed: 0,
      };

      data?.forEach((delivery: any) => {
        if (delivery.status === 'pending' || delivery.status === 'assigned') {
          stats.pending++;
        } else if (
          delivery.status === 'picked_up' ||
          delivery.status === 'in_transit'
        ) {
          stats.active++;
        } else if (delivery.status === 'delivered') {
          stats.completed++;
        } else if (delivery.status === 'failed' || delivery.status === 'cancelled') {
          stats.failed++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching distributor stats:', error);
      throw error;
    }
  }

  // Cancel delivery
  async cancelDelivery(deliveryId: string, reason?: string): Promise<Delivery> {
    return this.updateDelivery(deliveryId, {
      status: 'cancelled',
      notes: reason,
    });
  }
}

export const deliveriesService = new DeliveriesService();
