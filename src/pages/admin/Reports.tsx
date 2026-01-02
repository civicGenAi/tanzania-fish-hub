import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Printer,
  Mail,
  Filter
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: DollarSign },
    { id: 'orders', label: 'Orders Report', icon: ShoppingCart },
    { id: 'customers', label: 'Customer Report', icon: Users },
    { id: 'inventory', label: 'Inventory Report', icon: Package },
    { id: 'financial', label: 'Financial Report', icon: TrendingUp },
    { id: 'performance', label: 'Performance Report', icon: FileText }
  ];

  const salesData = [
    { date: '2024-01-01', revenue: 45000, orders: 32, profit: 13500 },
    { date: '2024-01-02', revenue: 52000, orders: 38, profit: 15600 },
    { date: '2024-01-03', revenue: 48000, orders: 35, profit: 14400 },
    { date: '2024-01-04', revenue: 61000, orders: 43, profit: 18300 },
    { date: '2024-01-05', revenue: 55000, orders: 39, profit: 16500 },
    { date: '2024-01-06', revenue: 67000, orders: 48, profit: 20100 },
    { date: '2024-01-07', revenue: 72000, orders: 52, profit: 21600 }
  ];

  const summaryMetrics = [
    {
      label: 'Total Revenue',
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
      label: 'New Customers',
      value: '87',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      label: 'Profit Margin',
      value: '28.5%',
      change: '-1.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentReports = [
    {
      id: 'RPT-001',
      name: 'Monthly Sales Report - December 2024',
      type: 'Sales',
      generatedBy: 'Admin User',
      date: '2024-01-01',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 'RPT-002',
      name: 'Customer Analytics Q4 2024',
      type: 'Customer',
      generatedBy: 'Sales Manager',
      date: '2023-12-28',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 'RPT-003',
      name: 'Inventory Summary - December 2024',
      type: 'Inventory',
      generatedBy: 'Inventory Manager',
      date: '2023-12-27',
      size: '956 KB',
      format: 'PDF'
    },
    {
      id: 'RPT-004',
      name: 'Financial Statement Q4 2024',
      type: 'Financial',
      generatedBy: 'Admin User',
      date: '2023-12-25',
      size: '3.2 MB',
      format: 'PDF'
    }
  ];

  const scheduledReports = [
    {
      id: 'SCH-001',
      name: 'Weekly Sales Summary',
      frequency: 'Weekly',
      nextRun: '2024-01-22',
      recipients: 'admin@fishub.tz, sales@fishub.tz',
      active: true
    },
    {
      id: 'SCH-002',
      name: 'Monthly Customer Report',
      frequency: 'Monthly',
      nextRun: '2024-02-01',
      recipients: 'admin@fishub.tz',
      active: true
    },
    {
      id: 'SCH-003',
      name: 'Daily Inventory Alert',
      frequency: 'Daily',
      nextRun: '2024-01-16',
      recipients: 'inventory@fishub.tz',
      active: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and download business reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Report Type</h3>
          <div className="space-y-2">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    reportType === type.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-500">
                      {report.type} · {report.date} · {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Printer className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
          <div className="space-y-3">
            {scheduledReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    report.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {report.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{report.frequency} · Next: {report.nextRun}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{report.recipients}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
