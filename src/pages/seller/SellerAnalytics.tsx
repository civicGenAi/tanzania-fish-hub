import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Loader2, Star } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  analyticsService,
  SalesAnalytics,
  ProductPerformance,
  CustomerInsight,
  TopCustomer,
  RevenueByPeriod,
} from '@/services/analytics.service';
import { cn } from '@/lib/utils';

const SellerAnalytics: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<SalesAnalytics | null>(null);
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
  const [customerInsights, setCustomerInsights] = useState<CustomerInsight | null>(null);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueByPeriod[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!profile) return;

      try {
        setLoading(true);

        const { data: sellerProfile, error: sellerError } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerError) throw sellerError;
        setSellerId(sellerProfile.id);

        const [
          analyticsData,
          productData,
          customerData,
          customersData,
          revenueByPeriod,
        ] = await Promise.all([
          analyticsService.getSellerAnalytics(sellerProfile.id),
          analyticsService.getProductPerformance(sellerProfile.id, 10),
          analyticsService.getCustomerInsights(sellerProfile.id),
          analyticsService.getTopCustomers(sellerProfile.id, 5),
          analyticsService.getRevenueByPeriod(sellerProfile.id, 'day', 30),
        ]);

        setAnalytics(analyticsData);
        setProductPerformance(productData);
        setCustomerInsights(customerData);
        setTopCustomers(customersData);
        setRevenueData(revenueByPeriod);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          title: 'Error',
          description: 'Failed to load analytics',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [profile, toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatPercentage = (value: number) => {
    const prefix = value >= 0 ? '+' : '';
    return `${prefix}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <DashboardLayout sidebar={<SellerSidebar />} title="Analytics" subtitle="Track your business performance">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: formatPrice(analytics?.totalRevenue || 0),
      change: analytics?.revenueGrowth || 0,
      icon: DollarSign,
    },
    {
      label: 'Total Orders',
      value: analytics?.totalOrders || 0,
      change: analytics?.ordersGrowth || 0,
      icon: TrendingUp,
    },
    {
      label: 'Unique Customers',
      value: customerInsights?.total_customers || 0,
      change: 0,
      icon: Users,
    },
    {
      label: 'Avg Order Value',
      value: formatPrice(analytics?.averageOrderValue || 0),
      change: 0,
      icon: BarChart3,
    },
  ];

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Analytics"
      subtitle="Track your business performance"
    >
      <div className="space-y-6">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
                {stat.change !== 0 && (
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center gap-0.5",
                      stat.change >= 0 ? "text-secondary" : "text-destructive"
                    )}
                  >
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {formatPercentage(stat.change)}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="space-y-2">
            {revenueData.length > 0 ? (
              <div className="h-64 flex items-end gap-1">
                {revenueData.map((data, index) => {
                  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
                  const height = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full group">
                        <div
                          className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatPrice(data.revenue)}
                          <br />
                          {data.orders} orders
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground rotate-45 origin-left">
                        {new Date(data.period).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No revenue data available
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <div className="space-y-3">
              {productPerformance.length > 0 ? (
                productPerformance.map((product, index) => (
                  <div key={product.product_id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.product_name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{product.total_sales} sold</span>
                        {product.average_rating > 0 && (
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {product.average_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-bold text-primary">{formatPrice(product.total_revenue)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No product sales yet</p>
              )}
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Insights</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary">
                    {customerInsights?.total_customers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="text-2xl font-bold text-secondary">
                    {customerInsights?.repeat_customers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Repeat Customers</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="text-2xl font-bold text-accent">
                    {customerInsights?.new_customers_this_month || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="text-2xl font-bold">
                    {customerInsights?.customer_retention_rate.toFixed(0) || 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Top Customers</h4>
                <div className="space-y-2">
                  {topCustomers.length > 0 ? (
                    topCustomers.map((customer) => (
                      <div key={customer.customer_id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{customer.customer_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {customer.total_orders} orders
                          </p>
                        </div>
                        <p className="font-bold text-sm">{formatPrice(customer.total_spent)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground text-sm py-4">No customer data yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerAnalytics;
