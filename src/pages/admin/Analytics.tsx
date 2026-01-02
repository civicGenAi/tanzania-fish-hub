import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Package,
  Star
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [metric, setMetric] = useState('revenue');

  const performanceData = [
    { month: 'Jan', revenue: 45000, orders: 320, customers: 180, growth: 12 },
    { month: 'Feb', revenue: 52000, orders: 380, customers: 220, growth: 15.5 },
    { month: 'Mar', revenue: 48000, orders: 350, customers: 200, growth: 6.6 },
    { month: 'Apr', revenue: 61000, orders: 430, customers: 280, growth: 27 },
    { month: 'May', revenue: 55000, orders: 390, customers: 250, growth: -9.8 },
    { month: 'Jun', revenue: 67000, orders: 480, customers: 310, growth: 21.8 },
    { month: 'Jul', revenue: 72000, orders: 520, customers: 340, growth: 7.4 },
    { month: 'Aug', revenue: 69000, orders: 500, customers: 330, growth: -4.1 },
    { month: 'Sep', revenue: 78000, orders: 560, customers: 380, growth: 13 },
    { month: 'Oct', revenue: 84000, orders: 610, customers: 420, growth: 7.6 },
    { month: 'Nov', revenue: 91000, orders: 670, customers: 460, growth: 8.3 },
    { month: 'Dec', revenue: 95000, orders: 710, customers: 490, growth: 4.3 }
  ];

  const hourlyData = [
    { hour: '00:00', orders: 5 }, { hour: '02:00', orders: 3 }, { hour: '04:00', orders: 2 },
    { hour: '06:00', orders: 8 }, { hour: '08:00', orders: 25 }, { hour: '10:00', orders: 45 },
    { hour: '12:00', orders: 65 }, { hour: '14:00', orders: 55 }, { hour: '16:00', orders: 48 },
    { hour: '18:00', orders: 72 }, { hour: '20:00', orders: 60 }, { hour: '22:00', orders: 35 }
  ];

  const customerBehavior = [
    { category: 'Purchase Frequency', value: 85 },
    { category: 'Average Order Value', value: 72 },
    { category: 'Customer Retention', value: 90 },
    { category: 'Product Diversity', value: 65 },
    { category: 'Repeat Purchase Rate', value: 78 },
    { category: 'Customer Satisfaction', value: 88 }
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 10000, rate: 100 },
    { stage: 'Product Views', count: 6500, rate: 65 },
    { stage: 'Add to Cart', count: 3200, rate: 32 },
    { stage: 'Checkout Started', count: 2100, rate: 21 },
    { stage: 'Payment', count: 1800, rate: 18 },
    { stage: 'Completed', count: 1650, rate: 16.5 }
  ];

  const kpis = [
    {
      label: 'Customer Lifetime Value',
      value: 'TZS 125,450',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      label: 'Average Order Value',
      value: 'TZS 34,200',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      label: 'Conversion Rate',
      value: '16.5%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      label: 'Customer Retention',
      value: '89.7%',
      change: '-2.1%',
      trend: 'down',
      icon: Star,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-1">Deep insights into your business performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="12m">Last 12 Months</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2 space-x-1">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <div className="flex space-x-2 mt-4">
              {['revenue', 'orders', 'customers', 'growth'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    metric === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={metric}
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-sm font-semibold text-gray-900">{stage.rate}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${stage.rate}%` }}
                    ></div>
                  </div>
                  <span className="absolute right-0 -top-6 text-xs text-gray-500">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders Pattern */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Orders by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Behavior Radar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Behavior Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={customerBehavior}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AOV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">TZS {row.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{row.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{row.customers}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${row.growth >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {row.growth >= 0 ? '+' : ''}{row.growth}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    TZS {Math.round(row.revenue / row.orders).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
