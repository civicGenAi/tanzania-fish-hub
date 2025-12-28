import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { 
  Fish, LayoutDashboard, Package, ShoppingCart, BarChart3, 
  DollarSign, Users, Star, Settings, LogOut, Bell, 
  PlusCircle, Truck, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const SellerSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainNavItems = [
    { title: 'Dashboard', url: '/seller', icon: LayoutDashboard },
    { title: 'My Products', url: '/seller/products', icon: Package, badge: 8 },
    { title: 'Add Product', url: '/seller/products/new', icon: PlusCircle },
    { title: 'Orders', url: '/seller/orders', icon: ShoppingCart, badge: 5 },
  ];

  const businessItems = [
    { title: 'Analytics', url: '/seller/analytics', icon: BarChart3 },
    { title: 'Earnings', url: '/seller/earnings', icon: DollarSign },
    { title: 'Customers', url: '/seller/customers', icon: Users },
    { title: 'Reviews', url: '/seller/reviews', icon: Star, badge: 12 },
  ];

  const operationsItems = [
    { title: 'Deliveries', url: '/seller/deliveries', icon: Truck },
    { title: 'Messages', url: '/seller/messages', icon: MessageSquare, badge: 3 },
    { title: 'Notifications', url: '/seller/notifications', icon: Bell, badge: 7 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-border">
        <NavLink to="/" className="flex items-center gap-3 px-2 py-2">
          <div className="bg-secondary p-2 rounded-xl shrink-0">
            <Fish className="h-5 w-5 text-secondary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-secondary">FishHappy</span>
              <p className="text-xs text-muted-foreground">Seller Portal</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {/* Seller Profile */}
        <SidebarGroup>
          <div className={cn(
            "flex items-center gap-3 px-2 py-3 rounded-xl bg-green-light/50",
            collapsed && "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold shrink-0">
              {user?.name?.charAt(0) || 'S'}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{user?.name || 'Seller'}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-muted-foreground">4.8 Rating</span>
                </div>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Store Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && !collapsed && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business */}
        <SidebarGroup>
          <SidebarGroupLabel>Business</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && !collapsed && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Operations */}
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && !collapsed && (
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/seller/settings')}
                  tooltip="Settings"
                >
                  <NavLink to="/seller/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Log Out"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SellerSidebar;
