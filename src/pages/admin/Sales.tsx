import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  CreditCard,
  Percent,
  Target
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Sales = () => {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('all');

  const salesData = [
    { date: 'Week 1', revenue: 125000, orders: 45, profit: 37500 },
    { date: 'Week 2', revenue: 142000, orders: 52, profit: 42600 },
    { date: 'Week 3', revenue: 135000, orders: 48, profit: 40500 },
    { date: 'Week 4', revenue: 158000, orders: 61, profit: 47400 }
  ];

  const categoryPerformance = [
    { name: 'Fresh Fish', revenue: 245000, orders: 120, growth: 15.2, margin: 28 },
    { name: 'Dried Fish', revenue: 189000, orders: 95, growth: 12.8, margin: 32 },
    { name: 'Smoked Fish', revenue: 167000, orders: 78, growth: -3.5, margin: 25 },
    { name: 'Seafood', revenue: 198000, orders: 102, growth: 18.7, margin: 22 },
    { name: 'Mixed Products', revenue: 134000, orders: 71, growth: 8.3, margin: 30 }
  ];

  const paymentMethods = [
    { name: 'M-Pesa', value: 45, color: '#10b981' },
    { name: 'Cash on Delivery', value: 30, color: '#3b82f6' },
    { name: 'Bank Transfer', value: 15, color: '#f59e0b' },
    { name: 'Credit Card', value: 10, color: '#8b5cf6' }
  ];

  const topCustomers = [
    { name: 'ABC Restaurant', revenue: 125000, orders: 24, lastOrder: '2 days ago' },
    { name: 'Fresh Market Ltd', revenue: 98000, orders: 18, lastOrder: '1 day ago' },
    { name: 'Ocean Deli', revenue: 87500, orders: 15, lastOrder: '3 hours ago' },
    { name: 'Harbor Seafood', revenue: 76200, orders: 12, lastOrder: '1 week ago' },
    { name: 'Coastal Bistro', revenue: 65800, orders: 11, lastOrder: '5 days ago' }
  ];

  const metrics = [
    {
      label: 'Total Sales',
      value: 'TZS 5,670,000',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Total Orders',
      value: '456',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      label: 'Average Order Value',
      value: 'TZS 12,434',
      change: '+4.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      label: 'Profit Margin',
      value: '28.5%',
      change: '-1.2%',
      trend: 'down',
      icon: Percent,
      color: 'bg-orange-500'
    }
  ];

  const salesTargets = [
    { metric: 'Monthly Revenue', target: 6000000, achieved: 5670000, percentage: 94.5 },
    { metric: 'Total Orders', target: 500, achieved: 456, percentage: 91.2 },
    { metric: 'New Customers', target: 100, achieved: 87, percentage: 87 },
    { metric: 'Customer Retention', target: 85, achieved: 89.7, percentage: 105.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600 mt-1">Track revenue, orders, and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2 space-x-1">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Overview Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">Revenue</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Orders</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Profit</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Performance & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left pb-3 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-right pb-3 text-sm font-medium text-gray-600">Revenue</th>
                  <th className="text-right pb-3 text-sm font-medium text-gray-600">Orders</th>
                  <th className="text-right pb-3 text-sm font-medium text-gray-600">Growth</th>
                  <th className="text-right pb-3 text-sm font-medium text-gray-600">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categoryPerformance.map((cat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="py-4 text-right text-gray-900">TZS {cat.revenue.toLocaleString()}</td>
                    <td className="py-4 text-right text-gray-600">{cat.orders}</td>
                    <td className="py-4 text-right">
                      <span className={`${cat.growth >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                        {cat.growth >= 0 ? '+' : ''}{cat.growth}%
                      </span>
                    </td>
                    <td className="py-4 text-right text-gray-900">{cat.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }}></div>
                  <span className="text-sm text-gray-700">{method.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{method.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Targets & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Targets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Targets</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {salesTargets.map((target, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{target.metric}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{target.achieved.toLocaleString()}</span>
                    <span className="text-sm text-gray-500"> / {target.target.toLocaleString()}</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${target.percentage >= 100 ? 'bg-green-500' : target.percentage >= 80 ? 'bg-blue-500' : 'bg-orange-500'}`}
                      style={{ width: `${Math.min(target.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="absolute right-0 -top-6 text-xs font-semibold text-gray-700">
                    {target.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Customers</h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.orders} orders · {customer.lastOrder}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">TZS {customer.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
