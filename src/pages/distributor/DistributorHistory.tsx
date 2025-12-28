import React, { useState } from 'react';
import { Clock, Calendar, TrendingUp, Download } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';
import { formatTZS } from '@/data/fishData';

const DistributorHistory: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const monthlyData = [
    { month: 'January', deliveries: 245, earnings: 612500, avgRating: 4.9 },
    { month: 'February', deliveries: 218, earnings: 545000, avgRating: 4.8 },
    { month: 'March', deliveries: 267, earnings: 667500, avgRating: 4.9 },
    { month: 'April', deliveries: 289, earnings: 722500, avgRating: 5.0 },
    { month: 'May', deliveries: 312, earnings: 780000, avgRating: 4.9 },
    { month: 'June', deliveries: 298, earnings: 745000, avgRating: 4.8 },
  ];

  const totalDeliveries = monthlyData.reduce((sum, m) => sum + m.deliveries, 0);
  const totalEarnings = monthlyData.reduce((sum, m) => sum + m.earnings, 0);

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Delivery History" subtitle="View your past performance">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Deliveries', value: totalDeliveries.toString(), icon: Clock, color: 'bg-primary' },
            { label: 'Total Earned', value: formatTZS(totalEarnings), icon: TrendingUp, color: 'bg-secondary' },
            { label: 'Avg per Month', value: Math.round(totalDeliveries / 6).toString(), icon: Calendar, color: 'bg-accent' },
            { label: 'Success Rate', value: '98.5%', icon: TrendingUp, color: 'bg-green-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Performance Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-6">Performance Trends</h3>
          <div className="h-64 flex items-end justify-between gap-3">
            {monthlyData.map((data, i) => {
              const maxDeliveries = Math.max(...monthlyData.map(m => m.deliveries));
              const height = (data.deliveries / maxDeliveries) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full ocean-gradient rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                    style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.deliveries} deliveries
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month.slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Monthly Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Deliveries</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Earnings</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Avg Rating</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data) => (
                  <tr key={data.month} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{data.month}</td>
                    <td className="py-3 px-4 text-right">{data.deliveries}</td>
                    <td className="py-3 px-4 text-right font-medium">{formatTZS(data.earnings)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-secondary">
                        {data.avgRating} ⭐
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorHistory;
