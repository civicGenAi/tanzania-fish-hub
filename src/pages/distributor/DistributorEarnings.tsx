import React from 'react';
import { DollarSign, TrendingUp, Wallet, Download } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const DistributorEarnings: React.FC = () => {
  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Earnings" subtitle="Track your income">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground">
            <Wallet className="h-6 w-6 mb-3" />
            <p className="text-3xl font-bold">{formatTZS(325000)}</p>
            <p className="text-accent-foreground/80 text-sm">Available Balance</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <TrendingUp className="h-6 w-6 text-secondary mb-3" />
            <p className="text-2xl font-bold">{formatTZS(1250000)}</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <DollarSign className="h-6 w-6 text-primary mb-3" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">Deliveries Completed</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ocean"><DollarSign className="h-4 w-4" />Withdraw</Button>
          <Button variant="outline"><Download className="h-4 w-4" />Statement</Button>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Recent Earnings</h3>
          <div className="space-y-3">
            {[{ desc: 'Delivery #DEL-001', amount: 5000, date: 'Today' }, { desc: 'Delivery #DEL-002', amount: 7500, date: 'Today' }, { desc: 'Bonus - 10 deliveries', amount: 15000, date: 'Yesterday' }].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div><p className="font-medium text-sm">{item.desc}</p><p className="text-xs text-muted-foreground">{item.date}</p></div>
                <p className="font-semibold text-secondary">+{formatTZS(item.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorEarnings;
