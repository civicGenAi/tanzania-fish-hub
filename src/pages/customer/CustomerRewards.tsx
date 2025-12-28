import React from 'react';
import { Gift, Star, Trophy, Zap, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const CustomerRewards: React.FC = () => {
  const points = 450;
  const nextReward = 500;

  const rewards = [
    { id: '1', name: 'Free Delivery', points: 100, icon: Zap },
    { id: '2', name: '10% Off Next Order', points: 250, icon: Gift },
    { id: '3', name: 'TZS 5,000 Voucher', points: 500, icon: Star },
    { id: '4', name: 'Premium Member Badge', points: 1000, icon: Trophy },
  ];

  const history = [
    { id: '1', action: 'Order #ORD-001', points: '+25', date: 'Today' },
    { id: '2', action: 'Review submitted', points: '+10', date: 'Yesterday' },
    { id: '3', action: 'Referral bonus', points: '+50', date: '3 days ago' },
    { id: '4', action: 'Free delivery redeemed', points: '-100', date: '1 week ago' },
  ];

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="Rewards & Points"
      subtitle="Earn and redeem points"
    >
      <div className="space-y-6">
        {/* Points Overview */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-foreground/80 text-sm">Your Points</p>
              <p className="text-4xl font-bold">{points}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Star className="h-8 w-8" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{points} / {nextReward} points</span>
              <span>{nextReward - points} to next reward</span>
            </div>
            <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-foreground rounded-full transition-all"
                style={{ width: `${(points / nextReward) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Rewards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center">
                  <reward.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground">{reward.points} points</p>
                </div>
                <Button 
                  variant={points >= reward.points ? "ocean" : "outline"} 
                  size="sm"
                  disabled={points < reward.points}
                >
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Points History</h2>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border">
            {history.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <span className={item.points.startsWith('+') ? 'text-secondary font-semibold' : 'text-accent font-semibold'}>
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerRewards;
