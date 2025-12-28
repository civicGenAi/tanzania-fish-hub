import React from 'react';
import { CreditCard, Plus, Smartphone, Building2, Trash2, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomerPayments: React.FC = () => {
  const paymentMethods = [
    {
      id: '1',
      type: 'mobile',
      provider: 'M-Pesa',
      number: '+255 712 ***678',
      icon: Smartphone,
      color: 'bg-green-500',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mobile',
      provider: 'Tigo Pesa',
      number: '+255 755 ***456',
      icon: Smartphone,
      color: 'bg-blue-500',
      isDefault: false,
    },
    {
      id: '3',
      type: 'card',
      provider: 'Visa',
      number: '**** **** **** 4521',
      icon: CreditCard,
      color: 'bg-purple-500',
      isDefault: false,
    },
  ];

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="Payment Methods"
      subtitle="Manage your payment options"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{paymentMethods.length} payment methods</p>
          <Button variant="ocean">
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={cn(
                "bg-card border rounded-2xl p-5 flex items-center gap-4",
                method.isDefault ? "border-primary" : "border-border"
              )}
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", method.color)}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{method.provider}</h3>
                  {method.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{method.number}</p>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm">Set as Default</Button>
                )}
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Options */}
        <div className="bg-muted/30 border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Add Payment Method</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-ocean-light/30 transition-all text-left">
              <Smartphone className="h-6 w-6 text-green-500 mb-2" />
              <p className="font-medium">Mobile Money</p>
              <p className="text-sm text-muted-foreground">M-Pesa, Tigo Pesa, Airtel</p>
            </button>
            <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-ocean-light/30 transition-all text-left">
              <CreditCard className="h-6 w-6 text-purple-500 mb-2" />
              <p className="font-medium">Credit/Debit Card</p>
              <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
            </button>
            <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-ocean-light/30 transition-all text-left">
              <Building2 className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium">Bank Transfer</p>
              <p className="text-sm text-muted-foreground">Direct bank payment</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerPayments;
