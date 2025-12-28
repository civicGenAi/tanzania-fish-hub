import React from 'react';
import { User, Bell, Phone, Settings as SettingsIcon, HelpCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DistributorSettings: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Settings" subtitle="Manage your account">
      <div className="max-w-3xl space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl font-bold">{user?.name?.charAt(0) || 'D'}</div>
            <div><h2 className="text-xl font-semibold">{user?.name}</h2><p className="text-muted-foreground">{user?.phone}</p></div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {[{ icon: User, label: 'Personal Info' }, { icon: Bell, label: 'Notifications' }, { icon: Phone, label: 'Contact Preferences' }, { icon: SettingsIcon, label: 'App Settings' }].map((item) => (
            <button key={item.label} className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-b-0">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><item.icon className="h-5 w-5 text-muted-foreground" /></div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="bg-coral-light border border-accent/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3"><HelpCircle className="h-6 w-6 text-accent" /><h3 className="font-semibold">Driver Support</h3></div>
          <p className="text-sm text-muted-foreground mb-4">Need help on the road? Contact our 24/7 driver support.</p>
          <Button variant="coral">Contact Support</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorSettings;
