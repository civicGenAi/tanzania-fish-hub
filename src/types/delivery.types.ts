// Delivery types based on database schema

export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export type DeliveryPriority =
  | 'normal'
  | 'high'
  | 'urgent';

export interface Delivery {
  id: string;
  delivery_number: string;
  order_id: string;
  distributor_id: string | null;
  status: DeliveryStatus;
  priority: DeliveryPriority;
  pickup_location: string;
  delivery_location: string;
  pickup_lat: number | null;
  pickup_lng: number | null;
  delivery_lat: number | null;
  delivery_lng: number | null;
  distance: number | null;
  estimated_time: number | null;
  scheduled_time: string | null;
  pickup_time: string | null;
  delivery_time: string | null;
  proof_of_delivery: string | null;
  signature: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliveryWithDetails extends Delivery {
  order?: {
    id: string;
    order_number: string;
    customer_id: string;
    total: number;
    status: string;
  };
  distributor?: {
    id: string;
    user_id: string;
    full_name: string;
    phone: string;
    vehicle_type: string;
    vehicle_number: string;
  };
}

export interface CreateDeliveryData {
  order_id: string;
  pickup_location: string;
  delivery_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  delivery_lat?: number;
  delivery_lng?: number;
  priority?: DeliveryPriority;
  scheduled_time?: string;
  notes?: string;
}

export interface UpdateDeliveryData {
  status?: DeliveryStatus;
  distributor_id?: string;
  priority?: DeliveryPriority;
  pickup_time?: string;
  delivery_time?: string;
  proof_of_delivery?: string;
  signature?: string;
  notes?: string;
}

export interface DeliveryFilters {
  distributor_id?: string;
  status?: DeliveryStatus;
  priority?: DeliveryPriority;
  from_date?: string;
  to_date?: string;
}

export interface DeliveryLocation {
  lat: number;
  lng: number;
  timestamp: string;
}
