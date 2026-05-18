import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { paymentsAPI } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const PaymentsPage = () => {
  const { token } = useAdmin();
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    paymentType: '',
    page: 1,
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const result = await paymentsAPI.getPayments(token, filters);
        if (result.success) {
          setPayments(result.data);
          setPagination(result.pagination);
        } else {
          setError(result.message || 'Failed to fetch payments');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPayments();
    }
  }, [token, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleRefund = async (paymentId) => {
    const reason = prompt('Enter refund reason:');
    if (!reason) return;

    try {
      const result = await paymentsAPI.refundPayment(token, paymentId, {
        reason,
      });

      if (result.success) {
        alert('Refund processed successfully');
        setFilters((prev) => ({ ...prev })); // Trigger refresh
      } else {
        alert('Failed to process refund: ' + result.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Payments</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Type</label>
          <select
            value={filters.paymentType}
            onChange={(e) => handleFilterChange('paymentType', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">All Types</option>
            <option value="donation">Donation</option>
            <option value="pooja">Pooja</option>
            <option value="darshan">Darshan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm">{payment.razorpayOrderId}</td>
                  <td className="px-6 py-3 text-sm font-bold">₹{payment.amount}</td>
                  <td className="px-6 py-3 text-sm capitalize">{payment.paymentType}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-bold ${
                        payment.status === 'completed'
                          ? 'bg-green-600'
                          : payment.status === 'failed'
                          ? 'bg-red-600'
                          : payment.status === 'refunded'
                          ? 'bg-yellow-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">{payment.customerName}</td>
                  <td className="px-6 py-3 text-sm">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    {payment.status === 'completed' && (
                      <button
                        onClick={() => handleRefund(payment._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handleFilterChange('page', page)}
              className={`px-3 py-2 rounded ${
                filters.page === page
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default PaymentsPage;
