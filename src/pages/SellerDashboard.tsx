import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, DollarSign, Star, TrendingUp, Plus, Edit, Trash2,
  Eye, EyeOff, LogOut, Settings, Bell, BarChart3, Users
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { sampleFish, formatTZS, sampleOrders } from '@/data/fishData';

const SellerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const myProducts = sampleFish.slice(0, 4);
  const pendingOrders = sampleOrders.filter(o => o.status !== 'delivered');

  const stats = [
    { label: 'Total Sales', value: formatTZS(2450000), change: '+12%', icon: DollarSign, color: 'text-secondary' },
    { label: 'Active Products', value: '8', change: '+2', icon: Package, color: 'text-primary' },
    { label: 'Pending Orders', value: '5', change: '-1', icon: TrendingUp, color: 'text-accent' },
    { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-yellow-500' },
  ];

  const tabs = [
    { id: 'products', label: 'My Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <Layout hideFooter>
      {/* Header */}
      <section className="ocean-gradient py-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-xl font-bold">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div className="text-primary-foreground">
                <h1 className="text-xl font-bold">Seller Dashboard</h1>
                <p className="text-primary-foreground/80 text-sm">{user?.name || 'Seller'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="hero-outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-6 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 shadow-ocean">
                <div className="flex items-start justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs text-secondary font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
            <div className="ml-auto">
              <Button variant="ocean" size="sm">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProducts.map((product) => (
                <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.nameSwahili}</p>
                      </div>
                      <button className={`p-1.5 rounded-full ${product.inStock ? 'bg-green-light text-secondary' : 'bg-muted text-muted-foreground'}`}>
                        {product.inStock ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary">{formatTZS(product.price)}/{product.unit}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-light text-secondary' : 'bg-muted text-muted-foreground'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Product Card */}
              <button className="bg-muted/50 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">Add New Product</p>
                <p className="text-sm text-muted-foreground">List your catch</p>
              </button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium capitalize">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-sm bg-muted px-2 py-1 rounded">
                        {item.quantity}{item.fish.unit} {item.fish.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatTZS(order.total)}</span>
                      <Button variant="ocean" size="sm">Process</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Sales Overview</h3>
                </div>
                <div className="h-48 flex items-end justify-between gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full ocean-gradient rounded-t-lg"
                        style={{ height: `${Math.random() * 100 + 20}px` }}
                      />
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold">Top Customers</h3>
                </div>
                <div className="space-y-3">
                  {['Serena Hotel', 'Mama Lisu Restaurant', 'Mikocheni Butchery'].map((customer, i) => (
                    <div key={customer} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{customer}</p>
                        <p className="text-sm text-muted-foreground">{12 - i * 3} orders</p>
                      </div>
                      <p className="font-semibold">{formatTZS((12 - i * 3) * 85000)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SellerDashboard;
