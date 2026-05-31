import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard',     path: '/admin/dashboard',        icon: '📊' },
    ],
  },
  {
    label: 'Bookings & Finance',
    items: [
      { label: 'Payments',      path: '/admin/payments',         icon: '💳' },
      { label: 'Donations',     path: '/admin/donations',        icon: '💛' },
      { label: 'Pooja Bookings',path: '/admin/pooja-bookings',   icon: '📋' },
      { label: 'Darshan Bookings',path:'/admin/darshan-bookings',icon: '🪷' },
      { label: 'Contact Messages',path:'/admin/contacts',        icon: '💬' },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { label: 'Manage Poojas',    path: '/admin/manage-poojas',   icon: '🔔' },
      { label: 'Manage Darshan',   path: '/admin/manage-darshan',  icon: '🏛️' },
      { label: 'Donation Causes',  path: '/admin/manage-donations',icon: '🤝' },
      { label: 'Events',           path: '/admin/manage-events',   icon: '📅' },
      { label: 'Gallery & Stream', path: '/admin/manage-gallery',  icon: '🖼️' },
      { label: 'Hero Images',      path: '/admin/manage-hero',     icon: '🏔️' },
    ],
  },
  {
    label: 'Site Settings',
    items: [
      { label: 'Temple Settings', path: '/admin/temple-settings', icon: '⚙️' },
    ],
  },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white shadow-sm z-30 flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl">☰</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Temple Admin Panel</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Welcome, {admin?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer"
              className="text-xs text-orange-600 hover:underline hidden sm:block">
              View Site ↗
            </a>
            <button onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-20 w-60 bg-gray-900 text-white flex flex-col
          transform transition-transform duration-200 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:min-h-[calc(100vh-56px)] shrink-0
        `}>
          <div className="flex-1 overflow-y-auto py-4">
            {NAV_GROUPS.map(group => (
              <div key={group.label} className="mb-4">
                <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                  {group.label}
                </p>
                {group.items.map(item => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left transition-colors ${
                      isActive(item.path)
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
            Temple Admin v2.0
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
