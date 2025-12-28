import React from 'react';
import { Bell, Package, Truck, Tag, CheckCircle, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomerNotifications: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'order',
      icon: Package,
      title: 'Order Confirmed',
      message: 'Your order #ORD-001 has been confirmed and is being prepared.',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'delivery',
      icon: Truck,
      title: 'Out for Delivery',
      message: 'Your order #ORD-002 is on its way! Driver: John Mwangi',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'promo',
      icon: Tag,
      title: '20% Off Fresh Tilapia',
      message: 'Special weekend offer! Use code FISH20 at checkout.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'delivered',
      icon: CheckCircle,
      title: 'Order Delivered',
      message: 'Your order #ORD-003 has been delivered. Enjoy your fish!',
      time: 'Yesterday',
      read: true,
    },
  ];

  const iconColors = {
    order: 'bg-primary text-primary-foreground',
    delivery: 'bg-accent text-accent-foreground',
    promo: 'bg-yellow-500 text-white',
    delivered: 'bg-secondary text-secondary-foreground',
  };

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="Notifications"
      subtitle="Stay updated on your orders"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "bg-card border rounded-2xl p-4 flex items-start gap-4",
                !notification.read ? "border-primary bg-ocean-light/20" : "border-border"
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
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
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
      </div>
    </DashboardLayout>
  );
};

export default CustomerNotifications;
