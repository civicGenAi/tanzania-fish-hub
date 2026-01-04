import { supabase } from '@/lib/supabase';

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface RevenueByPeriod {
  period: string;
  revenue: number;
  orders: number;
}

export interface ProductPerformance {
  product_id: string;
  product_name: string;
  total_sales: number;
  total_revenue: number;
  total_orders: number;
  average_rating: number;
  total_reviews: number;
}

export interface CustomerInsight {
  total_customers: number;
  repeat_customers: number;
  new_customers_this_month: number;
  customer_retention_rate: number;
}

export interface TopCustomer {
  customer_id: string;
  customer_name: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

class AnalyticsService {
  // Get seller sales analytics
  async getSellerAnalytics(sellerId: string, startDate?: string, endDate?: string): Promise<SalesAnalytics> {
    try {
      let query = supabase
        .from('order_items')
        .select('total_price, order:orders(created_at, status)')
        .eq('seller_id', sellerId);

      if (startDate) {
        query = query.gte('order.created_at', startDate);
      }

      if (endDate) {
        query = query.lte('order.created_at', endDate);
      }

      const { data: items, error } = await query;

      if (error) throw error;

      // Filter for completed orders
      const completedItems = items?.filter((item: any) =>
        item.order?.status === 'delivered'
      ) || [];

      const totalRevenue = completedItems.reduce((sum: number, item: any) =>
        sum + (item.total_price || 0), 0
      );

      const uniqueOrders = new Set(completedItems.map((item: any) => item.order?.id)).size;

      // Get total products count
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('seller_id', sellerId)
        .eq('status', 'active');

      const totalProducts = products?.length || 0;

      const averageOrderValue = uniqueOrders > 0 ? totalRevenue / uniqueOrders : 0;

      // Calculate growth (comparing to previous period)
      const previousPeriodRevenue = 0; // TODO: Implement period comparison
      const previousPeriodOrders = 0;

      const revenueGrowth = previousPeriodRevenue > 0
        ? ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100
        : 0;

      const ordersGrowth = previousPeriodOrders > 0
        ? ((uniqueOrders - previousPeriodOrders) / previousPeriodOrders) * 100
        : 0;

      return {
        totalRevenue,
        totalOrders: uniqueOrders,
        totalProducts,
        averageOrderValue,
        revenueGrowth,
        ordersGrowth,
      };
    } catch (error) {
      console.error('Error fetching seller analytics:', error);
      throw error;
    }
  }

  // Get revenue by period (daily, weekly, monthly)
  async getRevenueByPeriod(
    sellerId: string,
    period: 'day' | 'week' | 'month',
    limit: number = 30
  ): Promise<RevenueByPeriod[]> {
    try {
      const { data: items, error } = await supabase
        .from('order_items')
        .select('total_price, created_at, order:orders(status)')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Filter for completed orders
      const completedItems = items?.filter((item: any) =>
        item.order?.status === 'delivered'
      ) || [];

      // Group by period
      const grouped = new Map<string, { revenue: number; orders: Set<string> }>();

      completedItems.forEach((item: any) => {
        const date = new Date(item.created_at);
        let periodKey: string;

        if (period === 'day') {
          periodKey = date.toISOString().split('T')[0];
        } else if (period === 'week') {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          periodKey = weekStart.toISOString().split('T')[0];
        } else {
          periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        if (!grouped.has(periodKey)) {
          grouped.set(periodKey, { revenue: 0, orders: new Set() });
        }

        const entry = grouped.get(periodKey)!;
        entry.revenue += item.total_price || 0;
        entry.orders.add(item.order?.id);
      });

      return Array.from(grouped.entries())
        .map(([period, data]) => ({
          period,
          revenue: data.revenue,
          orders: data.orders.size,
        }))
        .slice(-limit);
    } catch (error) {
      console.error('Error fetching revenue by period:', error);
      throw error;
    }
  }

  // Get product performance
  async getProductPerformance(sellerId: string, limit: number = 10): Promise<ProductPerformance[]> {
    try {
      const { data: items, error } = await supabase
        .from('order_items')
        .select(`
          product_id,
          name,
          quantity,
          total_price,
          order:orders(id, status)
        `)
        .eq('seller_id', sellerId);

      if (error) throw error;

      // Filter for completed orders
      const completedItems = items?.filter((item: any) =>
        item.order?.status === 'delivered'
      ) || [];

      // Group by product
      const productMap = new Map<string, {
        name: string;
        sales: number;
        revenue: number;
        orders: Set<string>;
      }>();

      completedItems.forEach((item: any) => {
        if (!productMap.has(item.product_id)) {
          productMap.set(item.product_id, {
            name: item.name,
            sales: 0,
            revenue: 0,
            orders: new Set(),
          });
        }

        const product = productMap.get(item.product_id)!;
        product.sales += item.quantity || 0;
        product.revenue += item.total_price || 0;
        product.orders.add(item.order?.id);
      });

      // Get ratings for products
      const productIds = Array.from(productMap.keys());
      const { data: products } = await supabase
        .from('products')
        .select('id, rating, total_reviews')
        .in('id', productIds);

      const ratingsMap = new Map(
        products?.map(p => [p.id, { rating: p.rating || 0, total_reviews: p.total_reviews || 0 }]) || []
      );

      return Array.from(productMap.entries())
        .map(([productId, data]) => {
          const ratings = ratingsMap.get(productId) || { rating: 0, total_reviews: 0 };
          return {
            product_id: productId,
            product_name: data.name,
            total_sales: data.sales,
            total_revenue: data.revenue,
            total_orders: data.orders.size,
            average_rating: ratings.rating,
            total_reviews: ratings.total_reviews,
          };
        })
        .sort((a, b) => b.total_revenue - a.total_revenue)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching product performance:', error);
      throw error;
    }
  }

  // Get customer insights
  async getCustomerInsights(sellerId: string): Promise<CustomerInsight> {
    try {
      const { data: orders, error } = await supabase
        .from('order_items')
        .select('order:orders(customer_id, created_at, status)')
        .eq('seller_id', sellerId);

      if (error) throw error;

      // Get unique customers
      const customerOrders = new Map<string, number>();
      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      let newCustomersThisMonth = 0;

      orders?.forEach((item: any) => {
        if (item.order?.status === 'delivered') {
          const customerId = item.order.customer_id;
          const orderDate = new Date(item.order.created_at);

          if (!customerOrders.has(customerId)) {
            customerOrders.set(customerId, 0);
            if (orderDate >= thisMonth) {
              newCustomersThisMonth++;
            }
          }
          customerOrders.set(customerId, customerOrders.get(customerId)! + 1);
        }
      });

      const totalCustomers = customerOrders.size;
      const repeatCustomers = Array.from(customerOrders.values()).filter(count => count > 1).length;
      const customerRetentionRate = totalCustomers > 0
        ? (repeatCustomers / totalCustomers) * 100
        : 0;

      return {
        total_customers: totalCustomers,
        repeat_customers: repeatCustomers,
        new_customers_this_month: newCustomersThisMonth,
        customer_retention_rate: customerRetentionRate,
      };
    } catch (error) {
      console.error('Error fetching customer insights:', error);
      throw error;
    }
  }

  // Get top customers
  async getTopCustomers(sellerId: string, limit: number = 5): Promise<TopCustomer[]> {
    try {
      const { data: items, error } = await supabase
        .from('order_items')
        .select(`
          total_price,
          order:orders(
            id,
            customer_id,
            created_at,
            status,
            customer:customer_profiles(id, profiles(full_name))
          )
        `)
        .eq('seller_id', sellerId);

      if (error) throw error;

      // Group by customer
      const customerMap = new Map<string, {
        name: string;
        orders: Set<string>;
        spent: number;
        lastOrderDate: string;
      }>();

      items?.forEach((item: any) => {
        if (item.order?.status === 'delivered') {
          const customerId = item.order.customer_id;
          const customerName = item.order.customer?.profiles?.full_name || 'Unknown';

          if (!customerMap.has(customerId)) {
            customerMap.set(customerId, {
              name: customerName,
              orders: new Set(),
              spent: 0,
              lastOrderDate: item.order.created_at,
            });
          }

          const customer = customerMap.get(customerId)!;
          customer.orders.add(item.order.id);
          customer.spent += item.total_price || 0;

          // Update last order date if newer
          if (new Date(item.order.created_at) > new Date(customer.lastOrderDate)) {
            customer.lastOrderDate = item.order.created_at;
          }
        }
      });

      return Array.from(customerMap.entries())
        .map(([customerId, data]) => ({
          customer_id: customerId,
          customer_name: data.name,
          total_orders: data.orders.size,
          total_spent: data.spent,
          last_order_date: data.lastOrderDate,
        }))
        .sort((a, b) => b.total_spent - a.total_spent)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching top customers:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
