// Order types based on database schema

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type PaymentMethod =
  | 'mpesa'
  | 'cash'
  | 'bank_transfer'
  | 'card';

export type OrderItemStatus =
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  subtotal: number;
  shipping_fee: number;
  tax: number;
  discount: number;
  total: number;
  notes: string | null;
  shipping_address_id: string | null;
  assigned_distributor_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  seller_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: OrderItemStatus;
  created_at: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: string;
  notes: string | null;
  changed_by: string | null;
  created_at: string;
}

export interface OrderWithDetails extends Order {
  items?: OrderItem[];
  customer?: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
  };
  status_history?: OrderStatusHistory[];
}

// DTOs for creating/updating orders
export interface CreateOrderData {
  customer_id: string;
  items: {
    product_id: string;
    seller_id: string;
    name: string;
    quantity: number;
    unit_price: number;
  }[];
  payment_method: PaymentMethod;
  subtotal: number;
  shipping_fee?: number;
  tax?: number;
  discount?: number;
  total: number;
  notes?: string;
  shipping_address_id?: string;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  payment_method?: PaymentMethod;
  notes?: string;
  assigned_distributor_id?: string;
}

export interface OrderFilters {
  customer_id?: string;
  seller_id?: string;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  from_date?: string;
  to_date?: string;
}
