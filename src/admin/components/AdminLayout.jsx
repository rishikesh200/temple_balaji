import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Temple Admin Panel</h1>
            <p className="text-sm text-gray-600">Welcome, {admin?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-orange-400 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/payments')}
            className="hover:text-orange-400 transition"
          >
            Payments
          </button>
          <button
            onClick={() => navigate('/admin/donations')}
            className="hover:text-orange-400 transition"
          >
            Donations
          </button>
          <button
            onClick={() => navigate('/admin/pooja-bookings')}
            className="hover:text-orange-400 transition"
          >
            Pooja Bookings
          </button>
          <button
            onClick={() => navigate('/admin/darshan-bookings')}
            className="hover:text-orange-400 transition"
          >
            Darshan Bookings
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
