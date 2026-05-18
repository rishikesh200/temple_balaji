import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { donationsAPI } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const DonationsPage = () => {
  const { token } = useAdmin();
  const [donations, setDonations] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    cause: '',
    page: 1,
    search: '',
  });

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const result = await donationsAPI.getDonations(token, filters);
        if (result.success) {
          setDonations(result.data);
          setPagination(result.pagination);
        } else {
          setError(result.message || 'Failed to fetch donations');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDonations();
    }
  }, [token, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSendAcknowledgment = async (donationId) => {
    try {
      const result = await donationsAPI.sendAcknowledgment(token, donationId, {
        method: 'whatsapp',
      });

      if (result.success) {
        alert('Acknowledgment sent successfully via WhatsApp!');
        setFilters((prev) => ({ ...prev })); // Trigger refresh
      } else {
        alert('Failed to send acknowledgment: ' + result.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Donations</h2>

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
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Cause</label>
          <select
            value={filters.cause}
            onChange={(e) => handleFilterChange('cause', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">All Causes</option>
            <option value="general">General</option>
            <option value="maintenance">Maintenance</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="community">Community</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Donor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cause</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm">{donation.donorName}</td>
                  <td className="px-6 py-3 text-sm font-bold">₹{donation.amount}</td>
                  <td className="px-6 py-3 text-sm capitalize">{donation.cause}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-bold ${
                        donation.paymentStatus === 'completed'
                          ? 'bg-green-600'
                          : donation.paymentStatus === 'failed'
                          ? 'bg-red-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {donation.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">{donation.donorPhone}</td>
                  <td className="px-6 py-3 text-sm">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    {donation.paymentStatus === 'completed' && (
                      <button
                        onClick={() => handleSendAcknowledgment(donation._id)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Send Thank You
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

export default DonationsPage;
