import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { DEFAULT_TEMPLE_SETTINGS } from '../contexts/AdminDataContext';

export default function TempleSettingsPage() {
  const { templeSettings, updateTempleSettings } = useAdminData();
  const [form, setForm] = useState(templeSettings);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setSaved(false);
  };

  const handleSave = () => {
    updateTempleSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all temple settings to defaults?')) {
      setForm(DEFAULT_TEMPLE_SETTINGS);
      updateTempleSettings(DEFAULT_TEMPLE_SETTINGS);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Temple Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Basic temple information shown on the website</p>
        </div>
        <button onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
          Reset to Default
        </button>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 pb-3 border-b">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temple Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                placeholder="Sri Venkateswara Temple" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Subtitle</label>
              <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                placeholder="A place of divine peace..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Text (shown in About Section)</label>
              <textarea rows={4} value={form.aboutText} onChange={e => set('aboutText', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none" />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 pb-3 border-b">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea rows={2} value={form.address} onChange={e => set('address', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  placeholder="+91 44 1234 5678" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  placeholder="info@temple.org" />
              </div>
            </div>
          </div>
        </div>

        {/* Timings */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 pb-3 border-b">Temple Timings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
            <input value={form.timings} onChange={e => set('timings', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              placeholder="Mon–Sun: 6:00 AM – 12:00 PM, 4:00 PM – 9:00 PM" />
            <p className="text-xs text-gray-400 mt-1">This is shown on the contact page and footer</p>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button onClick={handleSave}
            className="px-8 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
            Save Settings
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-medium flex items-center gap-1">
              ✓ Settings saved successfully
            </span>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
