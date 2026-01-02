import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  Package,
  DollarSign,
  User,
  ChevronDown,
  ChevronRight,
  Printer,
  Send
} from 'lucide-react';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const orders = [
    {
      id: '#ORD-2345',
      customer: 'John Mwamba',
      email: 'john.mwamba@email.com',
      phone: '+255 712 345 678',
      items: [
        { name: 'Fresh Tilapia (1kg)', quantity: 5, price: 5000 },
        { name: 'Nile Perch Fillet', quantity: 2, price: 6000 }
      ],
      subtotal: 37000,
      shipping: 3000,
      total: 40000,
      status: 'delivered',
      payment: 'paid',
      date: '2024-01-15',
      time: '14:30',
      address: '123 Uhuru Street, Dar es Salaam',
      tracking: 'TZ123456789',
      notes: 'Deliver before 6 PM'
    },
    {
      id: '#ORD-2344',
      customer: 'Sarah Kimaro',
      email: 'sarah.k@email.com',
      phone: '+255 756 234 567',
      items: [
        { name: 'Dried Dagaa (500g)', quantity: 10, price: 3000 },
        { name: 'Fresh Prawns', quantity: 3, price: 8000 }
      ],
      subtotal: 54000,
      shipping: 4000,
      total: 58000,
      status: 'processing',
      payment: 'paid',
      date: '2024-01-15',
      time: '12:15',
      address: '45 Kenyatta Road, Mwanza',
      tracking: 'TZ123456790',
      notes: ''
    },
    {
      id: '#ORD-2343',
      customer: 'David Mtui',
      email: 'dmtui@email.com',
      phone: '+255 768 345 789',
      items: [
        { name: 'Smoked Catfish', quantity: 8, price: 6000 },
        { name: 'Fresh Tilapia', quantity: 4, price: 5000 }
      ],
      subtotal: 68000,
      shipping: 5000,
      total: 73000,
      status: 'pending',
      payment: 'pending',
      date: '2024-01-14',
      time: '16:45',
      address: '78 Nelson Mandela Road, Arusha',
      tracking: '-',
      notes: 'Customer prefers M-Pesa payment'
    },
    {
      id: '#ORD-2342',
      customer: 'Grace Mollel',
      email: 'grace.mollel@email.com',
      phone: '+255 723 456 890',
      items: [
        { name: 'Fresh Fish Mix', quantity: 15, price: 4500 }
      ],
      subtotal: 67500,
      shipping: 3500,
      total: 71000,
      status: 'shipped',
      payment: 'paid',
      date: '2024-01-14',
      time: '09:20',
      address: '12 Kilimanjaro Avenue, Dodoma',
      tracking: 'TZ123456791',
      notes: ''
    },
    {
      id: '#ORD-2341',
      customer: 'James Kondo',
      email: 'jkondo@email.com',
      phone: '+255 734 567 901',
      items: [
        { name: 'Nile Perch', quantity: 6, price: 6000 },
        { name: 'Dried Fish', quantity: 4, price: 3500 }
      ],
      subtotal: 50000,
      shipping: 4500,
      total: 54500,
      status: 'cancelled',
      payment: 'refunded',
      date: '2024-01-13',
      time: '11:30',
      address: '89 Mkwawa Street, Mbeya',
      tracking: '-',
      notes: 'Customer cancelled - quality concerns'
    }
  ];

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const paymentColors: { [key: string]: string } = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    refunded: 'bg-gray-100 text-gray-800'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = [
    { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'text-blue-600' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: 'text-purple-600' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-green-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Amounts</option>
                <option>0 - 50,000</option>
                <option>50,000 - 100,000</option>
                <option>100,000+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedOrder === order.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        <span className="font-medium text-gray-900">{order.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {order.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{order.date}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">TZS {order.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex items-center space-x-1 text-xs font-semibold rounded-full border ${statusColors[order.status]}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${paymentColors[order.payment]}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                  <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold text-gray-900">TZS {(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                              ))}
                              <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Subtotal:</span>
                                  <span className="text-gray-900">TZS {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-gray-600">Shipping:</span>
                                  <span className="text-gray-900">TZS {order.shipping.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                                  <span className="text-gray-900">Total:</span>
                                  <span className="text-gray-900">TZS {order.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
                            <div className="space-y-3 bg-white p-4 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                                  <p className="text-sm text-gray-600">{order.address}</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Phone</p>
                                  <p className="text-sm text-gray-600">{order.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                                  <p className="text-sm text-gray-600">{order.tracking}</p>
                                </div>
                              </div>
                              {order.notes && (
                                <div className="flex items-start space-x-3">
                                  <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Notes</p>
                                    <p className="text-sm text-gray-600">{order.notes}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
