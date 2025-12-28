import React from 'react';
import { User, Lock, Bell, Store, CreditCard, HelpCircle, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const SellerSettings: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Settings"
      subtitle="Manage your seller account"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-2xl font-bold">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        {/* Settings List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {[
            { icon: Store, label: 'Store Information', desc: 'Business name, location, hours' },
            { icon: User, label: 'Account Details', desc: 'Personal information' },
            { icon: Lock, label: 'Password & Security', desc: 'Change password, 2FA' },
            { icon: CreditCard, label: 'Payment Settings', desc: 'Bank account, M-Pesa' },
            { icon: Bell, label: 'Notifications', desc: 'Order alerts, messages' },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-b-0"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Help */}
        <div className="bg-ocean-light border border-primary/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Seller Support</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Need help with your store? Our seller support team is here to assist.
          </p>
          <Button variant="ocean">Contact Support</Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 className="h-6 w-6 text-destructive" />
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your seller account and all associated data.
          </p>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            Delete Account
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerSettings;
