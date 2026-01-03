import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, DollarSign, ShoppingBag, TrendingUp, 
  AlertCircle, CheckCircle, XCircle, Settings, LogOut,
  BarChart3, MapPin, Shield, Bell
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { formatTZS, stats as platformStats } from '@/data/fishData';

const AdminDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    { label: 'Total Revenue', value: formatTZS(125000000), change: '+18%', icon: DollarSign, color: 'bg-secondary' },
    { label: 'Active Users', value: '12,458', change: '+324', icon: Users, color: 'bg-primary' },
    { label: 'Orders Today', value: '847', change: '+12%', icon: ShoppingBag, color: 'bg-accent' },
    { label: 'Growth Rate', value: '24%', change: '+5%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const pendingApprovals = [
    { id: 'V001', name: 'Kigamboni Fresh Fish', type: 'Seller', location: 'Kigamboni' },
    { id: 'V002', name: 'Ocean Harvest Ltd', type: 'Seller', location: 'Msasani' },
    { id: 'V003', name: 'Peter Express', type: 'Distributor', location: 'Kinondoni' },
  ];

  const recentDisputes = [
    { id: 'D001', customer: 'Hotel Africana', seller: 'Mwanza Fresh', issue: 'Quality complaint', status: 'pending' },
    { id: 'D002', customer: 'Mama Ntilie', seller: 'Ocean Fresh', issue: 'Late delivery', status: 'resolved' },
  ];

  const regions = [
    { name: 'Dar es Salaam', orders: 45000, revenue: 85000000, growth: '+22%' },
    { name: 'Mwanza', orders: 12000, revenue: 28000000, growth: '+15%' },
    { name: 'Tanga', orders: 8500, revenue: 18000000, growth: '+8%' },
    { name: 'Mbeya', orders: 4200, revenue: 9500000, growth: '+12%' },
  ];

  return (
    <Layout hideFooter>
      {/* Header */}
      <section className="bg-foreground py-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
              <div className="text-background">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-background/70 text-sm">FishHappy Platform Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-4 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-5 shadow-ocean">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs text-secondary font-medium bg-green-light px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Regional Performance */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Regional Performance</h2>
                  </div>
                  <Button variant="outline" size="sm">View Map</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Region</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Orders</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Revenue</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regions.map((region) => (
                        <tr key={region.name} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium">{region.name}</td>
                          <td className="py-3 px-2 text-right text-muted-foreground">{region.orders.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right">{formatTZS(region.revenue)}</td>
                          <td className="py-3 px-2 text-right text-secondary font-medium">{region.growth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Disputes */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold">Recent Disputes</h2>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {recentDisputes.map((dispute) => (
                    <div key={dispute.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        dispute.status === 'resolved' ? 'bg-green-light text-secondary' : 'bg-coral-light text-accent'
                      }`}>
                        {dispute.status === 'resolved' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{dispute.issue}</p>
                        <p className="text-sm text-muted-foreground">
                          {dispute.customer} vs {dispute.seller}
                        </p>
                      </div>
                      <Button variant={dispute.status === 'pending' ? 'ocean' : 'ghost'} size="sm">
                        {dispute.status === 'pending' ? 'Resolve' : 'View'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pending Approvals */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Pending Approvals</h2>
                </div>
                <div className="space-y-3">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-ocean-light border border-primary/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.type} • {item.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ocean" size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Stats */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  <h2 className="text-lg font-semibold">Platform Metrics</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fishermen</span>
                    <span className="font-semibold">{platformStats.fishermen.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Orders Delivered</span>
                    <span className="font-semibold">{platformStats.ordersDelivered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Satisfaction Rate</span>
                    <span className="font-semibold text-secondary">{platformStats.satisfactionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Regions</span>
                    <span className="font-semibold">{platformStats.regionsServed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
