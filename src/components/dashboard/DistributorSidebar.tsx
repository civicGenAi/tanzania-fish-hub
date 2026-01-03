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
  Fish, LayoutDashboard, Truck, Package, MapPin, 
  DollarSign, Clock, CheckCircle, Bell, Settings, 
  LogOut, Navigation, Phone, Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const DistributorSidebar: React.FC = () => {
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
    { title: 'Dashboard', url: '/distributor', icon: LayoutDashboard },
    { title: 'Delivery Queue', url: '/distributor/queue', icon: Package, badge: 8 },
    { title: 'Active Deliveries', url: '/distributor/active', icon: Truck, badge: 3 },
    { title: 'Route Map', url: '/distributor/map', icon: Navigation },
  ];

  const deliveryItems = [
    { title: 'Schedule', url: '/distributor/schedule', icon: Calendar },
    { title: 'Pickup Points', url: '/distributor/pickups', icon: MapPin },
    { title: 'Completed', url: '/distributor/completed', icon: CheckCircle },
    { title: 'History', url: '/distributor/history', icon: Clock },
  ];

  const accountItems = [
    { title: 'Earnings', url: '/distributor/earnings', icon: DollarSign },
    { title: 'Contact Support', url: '/distributor/support', icon: Phone },
    { title: 'Notifications', url: '/distributor/notifications', icon: Bell, badge: 4 },
    { title: 'Settings', url: '/distributor/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-border">
        <NavLink to="/" className="flex items-center gap-3 px-2 py-2">
          <div className="bg-accent p-2 rounded-xl shrink-0">
            <Truck className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-accent">FishHappy</span>
              <p className="text-xs text-muted-foreground">Delivery Hub</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {/* Driver Profile */}
        <SidebarGroup>
          <div className={cn(
            "flex items-center gap-3 px-2 py-3 rounded-xl bg-coral-light/50",
            collapsed && "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shrink-0">
              {profile?.full_name?.charAt(0) || 'D'}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{profile?.full_name || 'Driver'}</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-secondary">Online</span>
                </div>
              </div>
            )}
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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

        {/* Deliveries */}
        <SidebarGroup>
          <SidebarGroupLabel>Deliveries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {deliveryItems.map((item) => (
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

export default DistributorSidebar;
