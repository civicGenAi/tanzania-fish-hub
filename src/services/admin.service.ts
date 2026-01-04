import { supabase } from '@/lib/supabase';
import {
  Order,
  OrderWithDetails,
  OrderStatus,
  PaymentStatus,
  UpdateOrderData,
} from '@/types/order.types';

export interface AdminOrderFilters {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  from_date?: string;
  to_date?: string;
  search?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface AdminOrderStats {
  total_orders: number;
  pending_orders: number;
  processing_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  total_revenue: number;
  pending_revenue: number;
}

export interface ShippingAddress {
  id: string;
  full_address: string;
  city: string;
  region: string;
  phone: string;
}

class AdminService {
  // Get all orders with filters (admin view)
  async getAllOrders(filters?: AdminOrderFilters): Promise<OrderWithDetails[]> {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            id,
            product_id,
            name,
            quantity,
            unit_price,
            total_price,
            status
          ),
          customer:customer_profiles(
            id,
            profiles(full_name, email, phone)
          ),
          shipping_address:shipping_addresses(
            id,
            full_address,
            city,
            region,
            phone
          )
        `)
        .order('created_at', { ascending: false });

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

      if (filters?.min_amount) {
        query = query.gte('total', filters.min_amount);
      }

      if (filters?.max_amount) {
        query = query.lte('total', filters.max_amount);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter by search term (order_number or customer name)
      let filteredData = data || [];
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (order: any) =>
            order.order_number.toLowerCase().includes(searchLower) ||
            order.customer?.profiles?.full_name?.toLowerCase().includes(searchLower) ||
            order.customer?.profiles?.email?.toLowerCase().includes(searchLower)
        );
      }

      return filteredData as OrderWithDetails[];
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  }

  // Get order statistics (admin dashboard)
  async getOrderStats(): Promise<AdminOrderStats> {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('status, payment_status, total');

      if (error) throw error;

      const stats = {
        total_orders: orders?.length || 0,
        pending_orders: orders?.filter((o) => o.status === 'pending').length || 0,
        processing_orders: orders?.filter((o) => o.status === 'processing').length || 0,
        shipped_orders: orders?.filter((o) => o.status === 'shipped').length || 0,
        delivered_orders: orders?.filter((o) => o.status === 'delivered').length || 0,
        cancelled_orders: orders?.filter((o) => o.status === 'cancelled').length || 0,
        total_revenue:
          orders
            ?.filter((o) => o.payment_status === 'paid')
            .reduce((sum, o) => sum + (o.total || 0), 0) || 0,
        pending_revenue:
          orders
            ?.filter((o) => o.payment_status === 'pending')
            .reduce((sum, o) => sum + (o.total || 0), 0) || 0,
      };

      return stats;
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  }

  // Update order status (admin only)
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    notes?: string
  ): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      // Add to status history
      if (notes || status) {
        await supabase.from('order_status_history').insert({
          order_id: orderId,
          status,
          notes,
        });
      }

      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Update payment status (admin only)
  async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus
  ): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  // Assign distributor to order (admin only)
  async assignDistributor(orderId: string, distributorId: string): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          assigned_distributor_id: distributorId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error assigning distributor:', error);
      throw error;
    }
  }

  // Bulk update order status
  async bulkUpdateOrderStatus(
    orderIds: string[],
    status: OrderStatus
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .in('id', orderIds);

      if (error) throw error;

      // Add to status history for each order
      const historyRecords = orderIds.map((orderId) => ({
        order_id: orderId,
        status,
        notes: 'Bulk status update',
      }));

      await supabase.from('order_status_history').insert(historyRecords);
    } catch (error) {
      console.error('Error bulk updating order status:', error);
      throw error;
    }
  }

  // Get order details by ID
  async getOrderById(orderId: string): Promise<OrderWithDetails> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            id,
            product_id,
            name,
            quantity,
            unit_price,
            total_price,
            status,
            seller:seller_profiles(id, business_name)
          ),
          customer:customer_profiles(
            id,
            full_name,
            email,
            phone
          ),
          shipping_address:shipping_addresses(
            id,
            full_address,
            city,
            region,
            phone
          ),
          status_history:order_status_history(
            id,
            status,
            notes,
            created_at
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;

      return data as OrderWithDetails;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }

  // Export orders to CSV
  async exportOrders(filters?: AdminOrderFilters): Promise<string> {
    try {
      const orders = await this.getAllOrders(filters);

      const csvHeaders = [
        'Order Number',
        'Customer Name',
        'Customer Email',
        'Date',
        'Status',
        'Payment Status',
        'Subtotal',
        'Shipping',
        'Total',
        'Items Count',
      ].join(',');

      const csvRows = orders.map((order) => {
        return [
          order.order_number,
          order.customer?.profiles?.full_name || '',
          order.customer?.profiles?.email || '',
          new Date(order.created_at).toLocaleDateString(),
          order.status,
          order.payment_status,
          order.subtotal,
          order.shipping_fee,
          order.total,
          order.items?.length || 0,
        ].join(',');
      });

      return [csvHeaders, ...csvRows].join('\n');
    } catch (error) {
      console.error('Error exporting orders:', error);
      throw error;
    }
  }

  // Get all distributors for assignment
  async getDistributors(): Promise<Array<{ id: string; name: string }>> {
    try {
      const { data, error } = await supabase
        .from('distributor_profiles')
        .select('id, company_name')
        .eq('status', 'active');

      if (error) throw error;

      return (
        data?.map((d) => ({
          id: d.id,
          name: d.company_name,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching distributors:', error);
      throw error;
    }
  }

  // ==================== USER MANAGEMENT ====================

  // Get all users (customers, sellers, distributors)
  async getAllUsers(filters?: {
    user_type?: string;
    status?: string;
    search?: string;
  }): Promise<any[]> {
    try {
      let query = supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          phone,
          avatar_url,
          user_type,
          status,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });

      if (filters?.user_type && filters.user_type !== 'all') {
        query = query.eq('user_type', filters.user_type);
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter by search term
      let filteredData = data || [];
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (user: any) =>
            user.full_name?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower) ||
            user.phone?.includes(searchLower)
        );
      }

      return filteredData;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats(): Promise<{
    total_users: number;
    active_users: number;
    suspended_users: number;
    customers: number;
    sellers: number;
    distributors: number;
    admins: number;
  }> {
    try {
      const { data: users, error } = await supabase
        .from('profiles')
        .select('user_type, status');

      if (error) throw error;

      return {
        total_users: users?.length || 0,
        active_users: users?.filter((u) => u.status === 'active').length || 0,
        suspended_users: users?.filter((u) => u.status === 'suspended').length || 0,
        customers: users?.filter((u) => u.user_type === 'customer').length || 0,
        sellers: users?.filter((u) => u.user_type === 'seller').length || 0,
        distributors: users?.filter((u) => u.user_type === 'distributor').length || 0,
        admins: users?.filter((u) => u.user_type === 'admin').length || 0,
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }

  // Update user status (activate/suspend)
  async updateUserStatus(
    userId: string,
    status: 'active' | 'inactive' | 'suspended'
  ): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  // Update user role/type
  async updateUserType(
    userId: string,
    userType: 'customer' | 'seller' | 'distributor' | 'admin'
  ): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ user_type: userType, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating user type:', error);
      throw error;
    }
  }

  // Get user details with role-specific info
  async getUserDetails(userId: string): Promise<any> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      let roleProfile = null;

      // Fetch role-specific profile
      switch (profile.user_type) {
        case 'customer':
          const { data: customerProfile } = await supabase
            .from('customer_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
          roleProfile = customerProfile;
          break;

        case 'seller':
          const { data: sellerProfile } = await supabase
            .from('seller_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
          roleProfile = sellerProfile;
          break;

        case 'distributor':
          const { data: distributorProfile } = await supabase
            .from('distributor_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
          roleProfile = distributorProfile;
          break;
      }

      return {
        ...profile,
        role_profile: roleProfile,
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  // Delete user (admin only)
  async deleteUser(userId: string): Promise<void> {
    try {
      // Note: This should cascade delete role-specific profiles
      const { error } = await supabase.from('profiles').delete().eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Export users to CSV
  async exportUsers(filters?: {
    user_type?: string;
    status?: string;
  }): Promise<string> {
    try {
      const users = await this.getAllUsers(filters);

      const csvHeaders = [
        'ID',
        'Name',
        'Email',
        'Phone',
        'User Type',
        'Status',
        'Created At',
      ].join(',');

      const csvRows = users.map((user) => {
        return [
          user.id,
          user.full_name || '',
          user.email,
          user.phone || '',
          user.user_type,
          user.status,
          new Date(user.created_at).toLocaleDateString(),
        ].join(',');
      });

      return [csvHeaders, ...csvRows].join('\n');
    } catch (error) {
      console.error('Error exporting users:', error);
      throw error;
    }
  }
}

export const adminService = new AdminService();
