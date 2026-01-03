import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, DollarSign, Star, TrendingUp, Plus, Edit, Trash2,
  Eye, EyeOff, BarChart3, Users, ArrowUpRight, ArrowDownRight, Loader2, ShoppingCart
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { productsService } from '@/services/products.service';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product.types';
import { cn } from '@/lib/utils';

const SellerDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!profile || profile.user_type !== 'seller') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Get seller_id
        const { data: sellerProfile } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerProfile) {
          // Get products
          const products = await productsService.getSellerProducts(sellerProfile.id);
          setMyProducts(products.slice(0, 4));
          setProductCount(products.length);

          // Get order count
          const { count } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('seller_id', sellerProfile.id)
            .in('status', ['pending', 'processing', 'confirmed']);

          setOrderCount(count || 0);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  const stats = [
    { label: 'Total Sales', value: formatPrice(0), change: '+0%', trend: 'up', icon: DollarSign, color: 'bg-secondary' },
    { label: 'Active Products', value: productCount.toString(), change: `+${productCount}`, trend: 'up', icon: Package, color: 'bg-primary' },
    { label: 'Pending Orders', value: orderCount.toString(), change: `+${orderCount}`, trend: 'up', icon: TrendingUp, color: 'bg-accent' },
    { label: 'Avg Rating', value: '0.0', change: '+0.0', trend: 'up', icon: Star, color: 'bg-yellow-500' },
  ];

  const tabs = [
    { id: 'products', label: 'My Products', count: productCount },
    { id: 'orders', label: 'Orders', count: orderCount },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Seller Dashboard"
      subtitle={`Welcome back, ${user?.name || 'Seller'}`}
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 md:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className={cn(
                  "flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full",
                  stat.trend === 'up' ? 'text-secondary bg-green-light' : 'text-accent bg-coral-light'
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2",
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                )}
              >
                {tab.label}
                {tab.count && (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-xs",
                    activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
            <div className="ml-auto px-2">
              <Link to="/seller/products/new">
                <Button variant="ocean" size="sm">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {myProducts.map((product) => {
                      const inStock = product.status === 'active' && product.stock > 0;
                      return (
                        <div key={product.id} className="bg-muted/30 border border-border/50 rounded-xl overflow-hidden group">
                          <div className="relative">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                              alt={product.name}
                              className="w-full h-36 object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                inStock ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                              )}>
                                {inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-semibold text-sm">{product.name}</h3>
                                {product.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                                )}
                              </div>
                              <button className={cn(
                                "p-1.5 rounded-full transition-colors",
                                inStock ? 'bg-green-light text-secondary hover:bg-secondary hover:text-secondary-foreground' : 'bg-muted text-muted-foreground'
                              )}>
                                {inStock ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </button>
                            </div>
                            <p className="font-bold text-primary">{formatPrice(product.price)}/{product.unit}</p>
                          </div>
                        </div>
                      );
                    })}
                
                {/* Add Product Card */}
                <Link to="/seller/products/new" className="bg-muted/30 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/30 transition-all min-h-[200px]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">Add New Product</p>
                  <p className="text-sm text-muted-foreground">List your fresh catch</p>
                </Link>
              </div>
            )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No pending orders</p>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Weekly Sales</h3>
                      </div>
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Analytics coming soon</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold">Top Customers</h3>
                      </div>
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No customer data yet</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;
