import React from 'react';
import { Bell, Package, ShoppingCart, DollarSign, Star, CheckCircle, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SellerNotifications: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'order',
      icon: ShoppingCart,
      title: 'New Order Received',
      message: 'Order #ORD-125 from Serena Hotel - 5kg Fresh Tilapia',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      icon: DollarSign,
      title: 'Payment Received',
      message: 'TZS 185,000 received for Order #ORD-124',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'review',
      icon: Star,
      title: 'New Review',
      message: 'John Makundi gave you 5 stars: "Excellent quality fish!"',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'delivery',
      icon: Package,
      title: 'Order Delivered',
      message: 'Order #ORD-123 has been delivered to Mama Lisu Restaurant',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'stock',
      icon: Package,
      title: 'Low Stock Alert',
      message: 'Nile Perch inventory is running low (2kg remaining)',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'order',
      icon: ShoppingCart,
      title: 'Order Confirmed',
      message: 'Order #ORD-122 has been confirmed and is being prepared',
      time: 'Yesterday',
      read: true,
    },
    {
      id: '7',
      type: 'achievement',
      icon: CheckCircle,
      title: 'Milestone Reached',
      message: 'Congratulations! You\'ve completed 100 orders this month',
      time: '2 days ago',
      read: true,
    },
  ];

  const iconColors = {
    order: 'bg-primary text-primary-foreground',
    payment: 'bg-secondary text-secondary-foreground',
    review: 'bg-yellow-500 text-white',
    delivery: 'bg-accent text-accent-foreground',
    stock: 'bg-orange-500 text-white',
    achievement: 'bg-green-500 text-white',
  };

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Notifications"
      subtitle="Stay updated on your business"
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

export default SellerNotifications;
