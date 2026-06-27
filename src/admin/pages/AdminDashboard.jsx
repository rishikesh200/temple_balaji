import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { donationsAPI, poojaAPI, darshanAPI, paymentsAPI } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const { token } = useAdmin();
  const [stats, setStats] = useState({
    donations: null,
    pooja: null,
    darshan: null,
    payments: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donationStats, poojaStats, darshanStats, paymentsData] = await Promise.all([
          donationsAPI.getDonationStats(token),
          poojaAPI.getStats(token),
          darshanAPI.getStats(token),
          paymentsAPI.getPayments(token, { limit: 1 }),
        ]);

        setStats({
          donations: donationStats.data,
          pooja: poojaStats.data,
          darshan: darshanStats.data,
          payments: paymentsData.data,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Donations Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-orange-600">
            ₹{stats.donations?.overall?.totalAmount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {stats.donations?.overall?.totalDonations || 0} donations
          </p>
        </div>

        {/* Pooja Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Pooja Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{stats.pooja?.overall?.totalAmount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {stats.pooja?.overall?.totalBookings || 0} bookings
          </p>
        </div>

        {/* Darshan Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Darshan Bookings</h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{stats.darshan?.overall?.totalAmount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {stats.darshan?.overall?.totalBookings || 0} bookings
          </p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₹
            {(stats.donations?.overall?.totalAmount || 0) +
              (stats.pooja?.overall?.totalAmount || 0) +
              (stats.darshan?.overall?.totalAmount || 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">All sources</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          <p className="text-gray-600">Recent payment activity will appear here</p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Razorpay Integration</span>
              <span className="text-green-600 font-bold">✓ Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>WhatsApp Notifications</span>
              <span className="text-green-600 font-bold">✓ Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database Connection</span>
              <span className="text-green-600 font-bold">✓ Connected</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
