import React from 'react';
import { User, Lock, Bell, Globe, Moon, Shield, HelpCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const CustomerSettings: React.FC = () => {
  const { user, profile } = useAuth();

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', description: 'Update your name, email, and phone' },
        { icon: Lock, label: 'Password & Security', description: 'Change password, enable 2FA' },
        { icon: Shield, label: 'Privacy Settings', description: 'Manage your data and privacy' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notification Settings', description: 'Choose what notifications you receive' },
        { icon: Globe, label: 'Language', description: 'English / Swahili', value: 'English' },
        { icon: Moon, label: 'Appearance', description: 'Light / Dark mode', value: 'Light' },
      ],
    },
  ];

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="Settings"
      subtitle="Manage your account preferences"
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile?.full_name || 'Customer'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <div key={group.title} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">{group.title}</h3>
            </div>
            <div className="divide-y divide-border">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {item.value && (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Help */}
        <div className="bg-ocean-light border border-primary/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Need Help?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our support team for assistance with your account.
          </p>
          <Button variant="ocean">Contact Support</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerSettings;
