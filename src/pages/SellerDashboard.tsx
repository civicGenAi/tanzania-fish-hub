import React, { useState } from 'react';
import { 
  Package, DollarSign, Star, TrendingUp, Plus, Edit, Trash2,
  Eye, EyeOff, BarChart3, Users, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { sampleFish, formatTZS, sampleOrders } from '@/data/fishData';
import { cn } from '@/lib/utils';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  const myProducts = sampleFish.slice(0, 4);
  const pendingOrders = sampleOrders.filter(o => o.status !== 'delivered');

  const stats = [
    { label: 'Total Sales', value: formatTZS(2450000), change: '+12%', trend: 'up', icon: DollarSign, color: 'bg-secondary' },
    { label: 'Active Products', value: '8', change: '+2', trend: 'up', icon: Package, color: 'bg-primary' },
    { label: 'Pending Orders', value: '5', change: '-1', trend: 'down', icon: TrendingUp, color: 'bg-accent' },
    { label: 'Avg Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star, color: 'bg-yellow-500' },
  ];

  const tabs = [
    { id: 'products', label: 'My Products', count: 8 },
    { id: 'orders', label: 'Orders', count: 5 },
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
              <Button variant="ocean" size="sm">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {myProducts.map((product) => (
                  <div key={product.id} className="bg-muted/30 border border-border/50 rounded-xl overflow-hidden group">
                    <div className="relative">
                      <img
                        src={product.image}
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
                          product.inStock ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                        )}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.nameSwahili}</p>
                        </div>
                        <button className={cn(
                          "p-1.5 rounded-full transition-colors",
                          product.inStock ? 'bg-green-light text-secondary hover:bg-secondary hover:text-secondary-foreground' : 'bg-muted text-muted-foreground'
                        )}>
                          {product.inStock ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="font-bold text-primary">{formatTZS(product.price)}/{product.unit}</p>
                    </div>
                  </div>
                ))}
                
                {/* Add Product Card */}
                <button className="bg-muted/30 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/30 transition-all min-h-[200px]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">Add New Product</p>
                  <p className="text-sm text-muted-foreground">List your fresh catch</p>
                </button>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{order.id}</p>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium capitalize">
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {item.quantity}{item.fish.unit} {item.fish.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold">{formatTZS(order.total)}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">{order.deliveryAddress.split(',')[0]}</p>
                      </div>
                      <Button variant="ocean" size="sm">Process</Button>
                    </div>
                  </div>
                ))}
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
                  <div className="h-40 flex items-end justify-between gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full ocean-gradient rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${[60, 80, 45, 90, 70, 100, 55][i]}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold">Top Customers</h3>
                  </div>
                  <div className="space-y-3">
                    {['Serena Hotel', 'Mama Lisu Restaurant', 'Mikocheni Butchery'].map((customer, i) => (
                      <div key={customer} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{customer}</p>
                          <p className="text-xs text-muted-foreground">{12 - i * 3} orders</p>
                        </div>
                        <p className="font-semibold text-sm">{formatTZS((12 - i * 3) * 85000)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;
