import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { darshanAPI } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const DarshanBookingsPage = () => {
  const { token } = useAdmin();
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    page: 1,
    search: '',
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const result = await darshanAPI.getBookings(token, filters);
        if (result.success) {
          setBookings(result.data);
          setPagination(result.pagination);
        } else {
          setError(result.message || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSendConfirmation = async (bookingId) => {
    try {
      const result = await darshanAPI.sendConfirmation(token, bookingId, {
        method: 'whatsapp',
      });

      if (result.success) {
        alert('Confirmation sent successfully via WhatsApp!');
        setFilters((prev) => ({ ...prev }));
      } else {
        alert('Failed: ' + result.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleSendReminder = async (bookingId) => {
    try {
      const result = await darshanAPI.sendReminder(token, bookingId);

      if (result.success) {
        alert('Reminder sent successfully via WhatsApp!');
        setFilters((prev) => ({ ...prev }));
      } else {
        alert('Failed: ' + result.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Darshan Bookings</h2>

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
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Payment Status</label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name, email, phone, or booking ref"
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Booking Ref</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date & Slot</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">People</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-mono">{booking.bookingReference}</td>
                  <td className="px-6 py-3 text-sm">
                    <div>{booking.customerName}</div>
                    <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                  </td>
                  <td className="px-6 py-3 text-sm capitalize">{booking.darshanType}</td>
                  <td className="px-6 py-3 text-sm">
                    {new Date(booking.date).toLocaleDateString()}
                    <div className="text-xs text-gray-500">{booking.timeSlot}</div>
                  </td>
                  <td className="px-6 py-3 text-sm text-center">{booking.numberOfPeople}</td>
                  <td className="px-6 py-3 text-sm font-bold">₹{booking.amount}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-bold ${
                        booking.bookingStatus === 'confirmed'
                          ? 'bg-green-600'
                          : booking.bookingStatus === 'cancelled'
                          ? 'bg-red-600'
                          : booking.bookingStatus === 'completed'
                          ? 'bg-blue-600'
                          : booking.bookingStatus === 'no-show'
                          ? 'bg-gray-600'
                          : 'bg-yellow-600'
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm flex gap-2">
                    {booking.bookingStatus === 'pending' && (
                      <button
                        onClick={() => handleSendConfirmation(booking._id)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Confirm
                      </button>
                    )}
                    {booking.bookingStatus === 'confirmed' && (
                      <button
                        onClick={() => handleSendReminder(booking._id)}
                        className="text-purple-600 hover:text-purple-800 font-semibold"
                      >
                        Remind
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

export default DarshanBookingsPage;
