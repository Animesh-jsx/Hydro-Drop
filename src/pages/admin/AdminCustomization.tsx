import { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { customizationAPI } from '../../services/api';

export default function AdminCustomization() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadRequests();
  }, [statusFilter]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await customizationAPI.getAll(statusFilter !== 'all' ? statusFilter : undefined);
      setRequests(data);
      if (data.length > 0 && !selectedRequest) {
        setSelectedRequest(data[0]);
      }
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!selectedRequest) return;
    try {
      await customizationAPI.updateStatus(selectedRequest._id, status, adminNotes);
      setAdminNotes('');
      loadRequests();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'awaiting_design': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'revision_requested': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_review': return 'IN REVIEW';
      case 'awaiting_design': return 'AWAITING DESIGN';
      case 'approved': return 'APPROVED';
      case 'revision_requested': return 'REVISION REQUESTED';
      case 'rejected': return 'REJECTED';
      default: return status.toUpperCase();
    }
  };

  const getApplicationLabel = (app: string) => {
    switch (app) {
      case 'laser_engrave': return 'Laser Engrave';
      case 'color_print': return 'Color Print';
      case 'emboss': return 'Emboss';
      case 'screen_print': return 'Screen Print';
      default: return app;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customization Requests</h1>
          <p className="text-gray-500">Review and approve customer 'Brand Your Own' submissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Main Content - Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Queue</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
              {requests.length} Active
            </span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-900"></div>
              </div>
            ) : (
              requests.map((req) => (
                <button
                  key={req._id}
                  onClick={() => setSelectedRequest(req)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    selectedRequest?._id === req._id ? 'bg-emerald-50 border-l-3 border-l-emerald-700' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                      {req.companyName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{req.companyName}</p>
                      <p className="text-xs text-gray-500">
                        {req.product} • {getApplicationLabel(req.application)}
                      </p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(req.status)}`}>
                        {getStatusLabel(req.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
          {selectedRequest ? (
            <div className="space-y-6">
              {/* Request Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${getStatusColor(selectedRequest.status)}`}>
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                  <span className="text-sm text-gray-500 font-mono">ID: {selectedRequest.requestId}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900">{selectedRequest.companyName}</h2>

              {/* Design Assets Placeholder */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Design Assets</h4>
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  {selectedRequest.logoUrl ? (
                    <img src={selectedRequest.logoUrl} alt="Logo" className="max-h-full object-contain" />
                  ) : (
                    <p className="text-gray-400 text-sm">No design assets uploaded</p>
                  )}
                </div>
              </div>

              {/* Order Specifications */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Specifications</h4>
                <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Product</p>
                    <p className="text-sm font-medium">{selectedRequest.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Base Color</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-900"></span>
                      {selectedRequest.baseColor}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Application</p>
                    <p className="text-sm font-medium">{getApplicationLabel(selectedRequest.application)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-sm font-medium">{selectedRequest.quantity} Units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price Per Unit</p>
                    <p className="text-sm font-medium">₹{selectedRequest.pricePerUnit || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="text-sm font-bold text-emerald-700">₹{(selectedRequest.totalPrice || 0).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Admin Notes / Feedback</h4>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes or specify required revisions..."
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleStatusUpdate('revision_requested')}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  Request Revision
                </button>
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Approve for Print
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Select a request from the queue to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
