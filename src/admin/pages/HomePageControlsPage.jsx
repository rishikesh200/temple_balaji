import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';

const SECTION_DESCRIPTIONS = {
  hero:         'Full-width banner with temple image, tagline, and quick action buttons',
  quickActions: 'Row of quick-access buttons (Book Pooja, Darshan, Donate, Live Stream)',
  about:        'Temple introduction with about text and story',
  events:       'Upcoming festivals and special events listing',
  donation:     'Donation section with contribution tiers and progress bar',
  darshan:      'Darshan types cards with booking links',
  pooja:        'Pooja services grid with images and prices',
  gallery:      'Temple photo gallery section',
  stream:       'Live stream / YouTube embed section',
  trustBadges:  'Trust indicators — pilgrims served, years, secure payments etc.',
};

const SECTION_ICONS = {
  hero:         '🏛️',
  quickActions: '⚡',
  about:        'ℹ️',
  events:       '📅',
  donation:     '💛',
  darshan:      '🪷',
  pooja:        '🔔',
  gallery:      '🖼️',
  stream:       '📺',
  trustBadges:  '✅',
};

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 ${
        checked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
        checked ? 'translate-x-7' : ''
      }`} />
    </button>
  );
}

export default function HomePageControlsPage() {
  const { homePageSections, updateHomeSection, resetHomeSections } = useAdminData();

  const activeCount = Object.values(homePageSections).filter(s => s.active).length;
  const totalCount = Object.keys(homePageSections).length;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Home Page Section Controls</h2>
          <p className="text-sm text-gray-500 mt-1">
            Toggle which sections appear on the home page — changes are instant and live
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{activeCount} of {totalCount} sections active</span>
          <button
            onClick={() => { if (window.confirm('Reset all sections to default (all visible)?')) resetHomeSections(); }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Visual preview bar */}
      <div className="bg-white border rounded-xl p-4 mb-6">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-3">Home Page Section Order (top → bottom)</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(homePageSections).map(([key, section]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              section.active
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-gray-50 border-gray-200 text-gray-400 line-through'
            }`}>
              {SECTION_ICONS[key]} {section.label}
            </span>
          ))}
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid gap-3">
        {Object.entries(homePageSections).map(([key, section]) => (
          <div key={key}
            className={`bg-white rounded-xl border shadow-sm p-5 flex items-center gap-4 transition-all ${
              !section.active ? 'opacity-60 bg-gray-50' : ''
            }`}
          >
            <div className="text-3xl w-10 text-center shrink-0">{SECTION_ICONS[key]}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{section.label}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  section.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {section.active ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{SECTION_DESCRIPTIONS[key]}</p>
            </div>

            <Toggle
              checked={section.active}
              onChange={v => updateHomeSection(key, v)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Note:</strong> Section visibility changes take effect immediately on the home page.
        Hiding a section does not delete any content — you can re-enable it at any time.
      </div>
    </AdminLayout>
  );
}
