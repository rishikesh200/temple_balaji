import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';

const DEFAULT_TEMPLE_SETTINGS = {
  name:      'Sri Venkateswara Temple',
  tagline:   'A place of divine peace and spiritual renewal',
  address:   '123 Temple Road, Chennai, Tamil Nadu - 600001',
  phone:     '+91 44 1234 5678',
  email:     'info@temple.org',
  timings:   'Mon–Sun: 6:00 AM – 12:00 PM, 4:00 PM – 9:00 PM',
  aboutText: 'Sri Venkateswara Temple is a revered Hindu temple dedicated to Lord Vishnu, welcoming all devotees.',
  // Header bar — trust credentials
  trustRegNo:        '125/2020',
  showTrustReg:      true,
  is80GCertified:    true,
  show80G:           true,
  gstin:             '3AAAPPB1234K1Z5',
  showGstin:         true,
  officialTagline:   'Official Website of Paruthipattu Balaji Temple',
  showOfficialTagline: true,
};

function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 w-10 h-5 rounded-full shrink-0 transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {desc && <p className="text-xs text-gray-400">{desc}</p>}
      </div>
    </label>
  );
}

export default function TempleSettingsPage() {
  const { templeSettings, updateTempleSettings } = useAdminData();
  const [form, setForm] = useState({ ...DEFAULT_TEMPLE_SETTINGS, ...templeSettings });
  const [saved, setSaved] = useState(false);

  // Sync when DB data arrives
  useEffect(() => {
    if (templeSettings && Object.keys(templeSettings).length > 0) {
      setForm(f => ({ ...DEFAULT_TEMPLE_SETTINGS, ...templeSettings }));
    }
  }, [templeSettings]);

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

        {/* Header Bar — Trust Credentials */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-1 pb-3 border-b">Header Bar Information</h3>
          <p className="text-xs text-gray-400 mb-5">Controls what appears in the red top bar of the website header. Toggle each item to show or hide it.</p>

          <div className="space-y-6">
            {/* Official Tagline */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <Toggle
                checked={form.showOfficialTagline ?? true}
                onChange={v => set('showOfficialTagline', v)}
                label="Show Official Tagline"
                desc="Shown on the left side of the header bar" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline Text</label>
                <input value={form.officialTagline ?? ''} onChange={e => set('officialTagline', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  placeholder="Official Website of Paruthipattu Balaji Temple" />
              </div>
            </div>

            {/* Trust Reg */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <Toggle
                checked={form.showTrustReg ?? true}
                onChange={v => set('showTrustReg', v)}
                label="Show Trust Registration Number"
                desc="Displayed as 'Trust Reg No: XXXXX' in the header" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trust Registration Number</label>
                <input value={form.trustRegNo ?? ''} onChange={e => set('trustRegNo', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  placeholder="125/2020" />
              </div>
            </div>

            {/* 80G */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <Toggle
                checked={form.show80G ?? true}
                onChange={v => set('show80G', v)}
                label='Show 80G Certified Badge'
                desc="Displays '80G Certified' badge — only enable if your temple has valid 80G certification" />
            </div>

            {/* GSTIN */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <Toggle
                checked={form.showGstin ?? true}
                onChange={v => set('showGstin', v)}
                label="Show GSTIN"
                desc="Displays 'GSTIN: XXXXXXX' in the header" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                <input value={form.gstin ?? ''} onChange={e => set('gstin', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  placeholder="3AAAPPB1234K1Z5" />
              </div>
            </div>
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
