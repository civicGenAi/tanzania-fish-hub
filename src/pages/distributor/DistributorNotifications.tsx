import React from 'react';
import { Bell, Package, Truck, DollarSign, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DistributorNotifications: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'new_delivery',
      icon: Package,
      title: 'New Delivery Assigned',
      message: 'DEL-125: Pickup from Ferry Fish Market to Serena Hotel',
      time: '2 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      icon: DollarSign,
      title: 'Payment Received',
      message: 'TZS 125,000 has been sent to your M-Pesa account',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'urgent',
      icon: AlertCircle,
      title: 'Urgent Delivery',
      message: 'High-priority order DEL-124 needs immediate pickup',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'completed',
      icon: CheckCircle,
      title: 'Delivery Completed',
      message: 'DEL-123 marked as delivered. Customer gave 5-star rating!',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'route',
      icon: Truck,
      title: 'Route Optimized',
      message: 'Your delivery route has been updated for better efficiency',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'payment',
      icon: DollarSign,
      title: 'Weekly Earnings Summary',
      message: 'You earned TZS 450,000 this week. Great work!',
      time: 'Yesterday',
      read: true,
    },
    {
      id: '7',
      type: 'completed',
      icon: CheckCircle,
      title: 'Milestone Reached',
      message: 'Congratulations! You\'ve completed 500 deliveries',
      time: '2 days ago',
      read: true,
    },
  ];

  const iconColors = {
    new_delivery: 'bg-primary text-primary-foreground',
    payment: 'bg-secondary text-secondary-foreground',
    urgent: 'bg-accent text-accent-foreground',
    completed: 'bg-green-500 text-white',
    route: 'bg-blue-500 text-white',
  };

  return (
    <DashboardLayout
      sidebar={<DistributorSidebar />}
      title="Notifications"
      subtitle="Stay updated on your deliveries"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "bg-card border rounded-2xl p-4 flex items-start gap-4",
                !notification.read ? "border-accent bg-coral-light/20" : "border-border"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                iconColors[notification.type as keyof typeof iconColors]
              )}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className={cn("font-medium", !notification.read && "font-semibold")}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'New delivery assignments', description: 'Get notified when a new delivery is assigned to you' },
              { label: 'Payment notifications', description: 'Receive alerts when payments are processed' },
              { label: 'Urgent deliveries', description: 'High-priority delivery notifications' },
              { label: 'Customer messages', description: 'Alerts when customers send you messages' },
              { label: 'Route updates', description: 'Notifications about route optimizations' },
            ].map((setting) => (
              <div key={setting.label} className="flex items-start justify-between p-3 bg-muted/30 rounded-xl">
                <div className="flex-1">
                  <p className="font-medium text-sm">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorNotifications;
