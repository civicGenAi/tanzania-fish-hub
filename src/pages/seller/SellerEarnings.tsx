import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight, Wallet } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const SellerEarnings: React.FC = () => {
  const transactions = [
    { id: 'TXN-001', date: 'Today', description: 'Order #ORD-001 payment', amount: 185000, status: 'completed' },
    { id: 'TXN-002', date: 'Today', description: 'Order #ORD-002 payment', amount: 320000, status: 'pending' },
    { id: 'TXN-003', date: 'Yesterday', description: 'Order #ORD-003 payment', amount: 95000, status: 'completed' },
    { id: 'TXN-004', date: 'Yesterday', description: 'Withdrawal to M-Pesa', amount: -400000, status: 'completed' },
  ];

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Earnings"
      subtitle="Track your income"
    >
      <div className="space-y-6">
        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-6 w-6" />
              <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">Available</span>
            </div>
            <p className="text-3xl font-bold mb-1">{formatTZS(1250000)}</p>
            <p className="text-primary-foreground/80 text-sm">Ready to withdraw</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-secondary" />
              <span className="text-xs text-secondary flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" />
                +18%
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{formatTZS(4850000)}</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <p className="text-2xl font-bold mb-1">{formatTZS(320000)}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="ocean">
            <DollarSign className="h-4 w-4" />
            Withdraw Funds
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
        </div>

        {/* Transactions */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-border">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-light' : 'bg-coral-light'}`}>
                    <DollarSign className={`h-5 w-5 ${tx.amount > 0 ? 'text-secondary' : 'text-accent'}`} />
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-secondary' : 'text-accent'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatTZS(Math.abs(tx.amount))}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-light text-secondary' : 'bg-yellow-100 text-yellow-700'}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerEarnings;
