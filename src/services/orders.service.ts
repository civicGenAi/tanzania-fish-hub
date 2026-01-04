import { supabase } from '@/lib/supabase';
import {
  Order,
  OrderWithDetails,
  CreateOrderData,
  UpdateOrderData,
  OrderFilters,
  OrderItem,
} from '@/types/order.types';

class OrdersService {
  // Create a new order
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const { items, ...orderDetails } = orderData;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: orderDetails.customer_id,
          payment_method: orderDetails.payment_method,
          subtotal: orderDetails.subtotal,
          shipping_fee: orderDetails.shipping_fee || 0,
          tax: orderDetails.tax || 0,
          discount: orderDetails.discount || 0,
          total: orderDetails.total,
          notes: orderDetails.notes,
          shipping_address_id: orderDetails.shipping_address_id,
          status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        seller_id: item.seller_id,
        name: item.name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
        status: 'pending',
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get order by ID with details
  async getOrderById(orderId: string): Promise<OrderWithDetails | null> {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*),
          customer:customer_profiles(id, user_id, profiles(full_name, email, phone))
        `)
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;
      return order as OrderWithDetails;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  // Get orders with filters
  async getOrders(filters?: OrderFilters): Promise<Order[]> {
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.payment_status) {
        query = query.eq('payment_status', filters.payment_status);
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
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Get seller orders (orders containing seller's products)
  async getSellerOrders(sellerId: string, filters?: OrderFilters): Promise<OrderWithDetails[]> {
    try {
      // Query order_items for this seller with joined order data
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          order:orders(*)
        `)
        .eq('seller_id', sellerId);

      if (error) throw error;

      // Group items by order
      const ordersMap = new Map<string, OrderWithDetails>();
      data?.forEach((item: any) => {
        const order = item.order;
        // Apply status filter if provided
        if (filters?.status && order.status !== filters.status) {
          return;
        }

        if (!ordersMap.has(order.id)) {
          ordersMap.set(order.id, { ...order, items: [] });
        }
        ordersMap.get(order.id)!.items!.push(item);
      });

      // Convert to array and sort by order created_at (descending)
      return Array.from(ordersMap.values())
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error('Error fetching seller orders:', error);
      throw error;
    }
  }

  // Update order
  async updateOrder(orderId: string, updates: UpdateOrderData): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      // Add to status history if status changed
      if (updates.status) {
        await this.addStatusHistory(orderId, updates.status, updates.notes);
      }

      return data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  // Update order item status
  async updateOrderItemStatus(itemId: string, status: string): Promise<OrderItem> {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .update({ status })
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating order item status:', error);
      throw error;
    }
  }

  // Add status history entry
  async addStatusHistory(orderId: string, status: string, notes?: string): Promise<void> {
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      const { error } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status,
          notes,
          changed_by: userId || null,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding status history:', error);
      throw error;
    }
  }

  // Cancel order
  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    return this.updateOrder(orderId, {
      status: 'cancelled',
      notes: reason,
    });
  }

  // Get order statistics for seller
  async getSellerOrderStats(sellerId: string): Promise<{
    total: number;
    pending: number;
    processing: number;
    completed: number;
    revenue: number;
  }> {
    try {
      const { data: items, error } = await supabase
        .from('order_items')
        .select('*, order:orders(status)')
        .eq('seller_id', sellerId);

      if (error) throw error;

      const stats = {
        total: items?.length || 0,
        pending: 0,
        processing: 0,
        completed: 0,
        revenue: 0,
      };

      items?.forEach((item: any) => {
        const status = item.order?.status;
        if (status === 'pending') stats.pending++;
        else if (status === 'processing' || status === 'confirmed') stats.processing++;
        else if (status === 'delivered') {
          stats.completed++;
          stats.revenue += item.total_price;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching seller order stats:', error);
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
