import React, { useState, useEffect } from 'react';
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
  Send,
  Loader2
} from 'lucide-react';
import { adminService, AdminOrderFilters } from '@/services/admin.service';
import { OrderWithDetails, OrderStatus, PaymentStatus } from '@/types/order.types';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | 'all'>('all');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, fromDate, toDate, paymentStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const filters: AdminOrderFilters = {
        search: searchTerm || undefined,
      };

      if (selectedStatus !== 'all') {
        filters.status = selectedStatus as OrderStatus;
      }

      if (paymentStatus !== 'all') {
        filters.payment_status = paymentStatus as PaymentStatus;
      }

      if (fromDate) {
        filters.from_date = fromDate;
      }

      if (toDate) {
        filters.to_date = toDate;
      }

      const data = await adminService.getAllOrders(filters);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchOrders();
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setUpdatingStatus(orderId);
      await adminService.updateOrderStatus(orderId, newStatus);

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleExport = async () => {
    try {
      const filters: AdminOrderFilters = {};
      if (selectedStatus !== 'all') {
        filters.status = selectedStatus as OrderStatus;
      }

      const csv = await adminService.exportOrders(filters);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Orders exported successfully');
    } catch (error) {
      console.error('Error exporting orders:', error);
      toast.error('Failed to export orders');
    }
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'text-blue-600' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: 'text-purple-600' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-green-600' }
  ];


  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    refunded: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const paymentColors: { [key: string]: string } = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
      case 'refunded': return <XCircle className="h-4 w-4" />;
      case 'processing':
      case 'confirmed': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading orders...</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const orderDate = new Date(order.created_at);
                  const customerInitials = order.customer?.full_name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || '?';

                  return (
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
                            <span className="font-medium text-gray-900">{order.order_number}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                              {customerInitials}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{order.customer?.full_name || 'Unknown'}</p>
                              <p className="text-sm text-gray-500">{order.customer?.email || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{orderDate.toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">{orderDate.toLocaleTimeString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                          <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                              disabled={updatingStatus === order.id}
                              className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[order.status]} appearance-none pr-6 cursor-pointer`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="refunded">Refunded</option>
                            </select>
                            {updatingStatus === order.id && (
                              <Loader2 className="h-3 w-3 animate-spin absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${paymentColors[order.payment_status]}`}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
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
                                  {order.items && order.items.length > 0 ? (
                                    order.items.map((item) => (
                                      <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                        <div>
                                          <p className="font-medium text-gray-900">{item.name}</p>
                                          <p className="text-sm text-gray-500">
                                            Qty: {item.quantity} × {formatPrice(item.unit_price)}
                                          </p>
                                        </div>
                                        <p className="font-semibold text-gray-900">{formatPrice(item.total_price)}</p>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500">No items</p>
                                  )}
                                  <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Subtotal:</span>
                                      <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                      <span className="text-gray-600">Shipping:</span>
                                      <span className="text-gray-900">{formatPrice(order.shipping_fee)}</span>
                                    </div>
                                    {order.tax > 0 && (
                                      <div className="flex justify-between text-sm mt-1">
                                        <span className="text-gray-600">Tax:</span>
                                        <span className="text-gray-900">{formatPrice(order.tax)}</span>
                                      </div>
                                    )}
                                    {order.discount > 0 && (
                                      <div className="flex justify-between text-sm mt-1 text-green-600">
                                        <span>Discount:</span>
                                        <span>-{formatPrice(order.discount)}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                                      <span className="text-gray-900">Total:</span>
                                      <span className="text-gray-900">{formatPrice(order.total)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Shipping Info */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
                                <div className="space-y-3 bg-white p-4 rounded-lg">
                                  {order.shipping_address ? (
                                    <div className="flex items-start space-x-3">
                                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                                        <p className="text-sm text-gray-600">{(order.shipping_address as any).full_address}</p>
                                        <p className="text-sm text-gray-500">
                                          {(order.shipping_address as any).city}, {(order.shipping_address as any).region}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500">No shipping address</p>
                                  )}
                                  {order.customer?.phone && (
                                    <div className="flex items-start space-x-3">
                                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex items-start space-x-3">
                                    <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">Payment Method</p>
                                      <p className="text-sm text-gray-600 capitalize">
                                        {order.payment_method || 'Not specified'}
                                      </p>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
