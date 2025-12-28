import React from 'react';
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomerAddresses: React.FC = () => {
  const addresses = [
    {
      id: '1',
      label: 'Home',
      icon: Home,
      address: 'Plot 123, Masaki Peninsula',
      city: 'Dar es Salaam',
      region: 'Kinondoni',
      phone: '+255 712 345 678',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Office',
      icon: Briefcase,
      address: 'Posta Building, 5th Floor',
      city: 'Dar es Salaam',
      region: 'Ilala',
      phone: '+255 712 345 679',
      isDefault: false,
    },
  ];

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="My Addresses"
      subtitle="Manage your delivery addresses"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{addresses.length} saved addresses</p>
          <Button variant="ocean">
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                "bg-card border rounded-2xl p-5 relative",
                addr.isDefault ? "border-primary" : "border-border"
              )}
            >
              {addr.isDefault && (
                <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Default
                </span>
              )}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ocean-light flex items-center justify-center">
                  <addr.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{addr.label}</h3>
                  <p className="text-sm text-muted-foreground">{addr.phone}</p>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm">{addr.address}</p>
                <p className="text-sm text-muted-foreground">{addr.region}, {addr.city}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                {!addr.isDefault && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Add New Address Card */}
          <button className="bg-muted/30 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/30 transition-all min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium">Add New Address</p>
            <p className="text-sm text-muted-foreground">Save a delivery location</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerAddresses;
