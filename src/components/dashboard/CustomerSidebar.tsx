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
  Fish, Home, ShoppingBag, Heart, MapPin, CreditCard, 
  Bell, Settings, LogOut, HelpCircle, Gift, History
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const CustomerSidebar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const mainNavItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'My Orders', url: '/dashboard/orders', icon: ShoppingBag, badge: 3 },
    { title: 'Order History', url: '/dashboard/history', icon: History },
    { title: 'Favorites', url: '/dashboard/favorites', icon: Heart, badge: 5 },
  ];

  const accountItems = [
    { title: 'Addresses', url: '/dashboard/addresses', icon: MapPin },
    { title: 'Payment Methods', url: '/dashboard/payments', icon: CreditCard },
    { title: 'Notifications', url: '/dashboard/notifications', icon: Bell, badge: 2 },
  ];

  const supportItems = [
    { title: 'Rewards', url: '/dashboard/rewards', icon: Gift },
    { title: 'Help Center', url: '/help', icon: HelpCircle },
    { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-border">
        <NavLink to="/" className="flex items-center gap-3 px-2 py-2">
          <div className="ocean-gradient p-2 rounded-xl shrink-0">
            <Fish className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FishHappy
            </span>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {/* User Info */}
        <SidebarGroup>
          <div className={cn(
            "flex items-center gap-3 px-2 py-3 rounded-xl bg-ocean-light/50",
            collapsed && "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground font-bold shrink-0">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{profile?.full_name || 'Customer'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
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

        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
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

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

export default CustomerSidebar;
