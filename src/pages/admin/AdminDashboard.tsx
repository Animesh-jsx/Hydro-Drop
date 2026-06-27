import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingCart,
  UserPlus,
  TrendingUp,
  Plus,
  ClipboardList,
  Megaphone,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { dashboardAPI } from '../../services/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [metricsData, ordersData, alertsData, chartData] = await Promise.all([
        dashboardAPI.getMetrics(),
        dashboardAPI.getRecentOrders(),
        dashboardAPI.getInventoryAlerts(),
        dashboardAPI.getSalesChart(),
      ]);
      setMetrics(metricsData);
      setRecentOrders(ordersData);
      setInventoryAlerts(alertsData);
      setSalesData(chartData);
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 1000).toFixed(0)}k`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processing': return 'Processing';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500">Key metrics and recent activity for Hydra Drop.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">Total Revenue</span>
            <IndianRupee className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics?.totalRevenue || 0)}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">Orders Today</span>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics?.ordersToday || 0}</p>
          <p className="text-xs text-red-500 mt-1">-3% from yesterday</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">New Customers</span>
            <UserPlus className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics?.newCustomers || 0}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +5% from last week
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">Avg Order Value</span>
            <IndianRupee className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{metrics?.avgOrderValue || 0}</p>
          <p className="text-xs text-gray-500 mt-1">= Stable this week</p>
        </div>
      </div>

      {/* Sales Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    chartPeriod === period ? 'bg-emerald-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {/* Simple chart visualization */}
          <div className="h-48 flex items-end justify-between gap-2 px-4">
            {(salesData.length > 0 ? salesData : [
              { month: 'Jan', revenue: 45000 },
              { month: 'Feb', revenue: 52000 },
              { month: 'Mar', revenue: 78000 },
              { month: 'Apr', revenue: 95000 },
              { month: 'May', revenue: 120000 },
              { month: 'Jun', revenue: 98000 },
            ]).map((item, i) => {
              const maxRevenue = Math.max(...(salesData.length > 0 ? salesData : [{ revenue: 120000 }]).map((d: any) => d.revenue));
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-900 to-emerald-600 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/admin/products"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Product</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              to="/admin/inventory"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-blue-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">Check Inventory</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              to="/admin/customization"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-purple-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">View Requests</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders + Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm text-gray-500 hover:text-emerald-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-3 font-mono text-xs">{order.orderId}</td>
                    <td className="py-3">{order.customer?.name || 'Unknown'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">₹{order.total?.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-3">
            {inventoryAlerts.map((product) => (
              <div key={product._id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-amber-600">{product.stock} units remaining</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-emerald-700 hover:text-emerald-900 bg-white px-2 py-1 rounded border border-gray-200">
                  Restock
                </button>
              </div>
            ))}
            {inventoryAlerts.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No low stock alerts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
