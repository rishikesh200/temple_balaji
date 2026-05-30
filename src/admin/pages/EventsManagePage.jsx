import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import ImageUploader, { FALLBACKS } from '../components/ImageUploader';

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );
}

const CATEGORIES = [
  { value: 'upcoming',  label: '🔥 Festival / Celebration' },
  { value: 'community', label: '🤝 Community Seva' },
];

const emptyForm = {
  title: '', category: 'upcoming', date: '', time: '',
  location: '', participants: '', details: '',
  imageKey: 'festival', imageUrl: '',
  ctaText: '', ctaLink: '/donate',
  active: true, showInHome: true,
};

function EventModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{isNew ? 'Add New Event' : `Edit: ${item?.title}`}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="label">Event Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} className="input" placeholder="e.g. Vaikunta Ekadashi" />
            </div>
            <div>
              <label className="label">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="input">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Date</label>
              <input value={form.date} onChange={e => set('date', e.target.value)} className="input" placeholder="May 22, 2026" />
            </div>
            <div>
              <label className="label">Time</label>
              <input value={form.time} onChange={e => set('time', e.target.value)} className="input" placeholder="05:00 AM - 09:00 PM" />
            </div>
            <div>
              <label className="label">Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} className="input" placeholder="Main Sanctum Hall" />
            </div>
            <div className="col-span-2">
              <label className="label">Participants / Entry</label>
              <input value={form.participants} onChange={e => set('participants', e.target.value)} className="input" placeholder="Open for all devotees" />
            </div>
          </div>

          <div>
            <label className="label">Event Details / Description</label>
            <textarea rows={4} value={form.details} onChange={e => set('details', e.target.value)} className="input resize-none" />
          </div>

          <ImageUploader
            value={form.imageUrl}
            onChange={url => set('imageUrl', url)}
            folder="events"
            fallback={FALLBACKS.event}
            label="Event Image"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">CTA Button Text</label>
              <input value={form.ctaText} onChange={e => set('ctaText', e.target.value)} className="input" placeholder="Sponsor Annadanam" />
            </div>
            <div>
              <label className="label">CTA Link</label>
              <input value={form.ctaLink} onChange={e => set('ctaLink', e.target.value)} className="input" placeholder="/donate" />
            </div>
          </div>

          {/* Tamil Translations */}
          <details className="border border-dashed border-gray-300 rounded-xl">
            <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 select-none hover:bg-gray-50 rounded-xl">
              🇮🇳 Tamil Translation <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-3">
              <div>
                <label className="label">நிகழ்வு பெயர் (Title in Tamil)</label>
                <input value={form.title_ta || ''} onChange={e => set('title_ta', e.target.value)} className="input" placeholder="e.g. வைகுண்ட ஏகாதசி" />
              </div>
              <div>
                <label className="label">இடம் (Location in Tamil)</label>
                <input value={form.location_ta || ''} onChange={e => set('location_ta', e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">விவரங்கள் (Details in Tamil)</label>
                <textarea rows={3} value={form.details_ta || ''} onChange={e => set('details_ta', e.target.value)} className="input resize-none" />
              </div>
            </div>
          </details>

          <div className="flex gap-6 pt-1 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.active} onChange={v => set('active', v)} />
              <span className="text-sm text-gray-700">Active (visible on Events page)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.showInHome} onChange={v => set('showInHome', v)} />
              <span className="text-sm text-gray-700">Show in Home Page marquee</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
            {isNew ? 'Add Event' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsManagePage() {
  const { events, updateEvent, addEvent, deleteEvent } = useAdminData();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const upcoming  = events.filter(e => e.category === 'upcoming');
  const community = events.filter(e => e.category === 'community');

  return (
    <AdminLayout>
      <style>{`.input{width:100%;border:1px solid #d1d5db;border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}.label{display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem}`}</style>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage temple events — shown on the Events page and home marquee</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          + Add Event
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Events',   value: events.length,                   color: 'text-gray-700' },
          { label: 'Active',         value: events.filter(e=>e.active).length, color: 'text-green-600' },
          { label: 'Shown on Home',  value: events.filter(e=>e.showInHome).length, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-xs text-gray-500 bg-white border rounded-lg p-3">
        <span><span className="font-semibold text-green-600">Active</span> = shown on /events page</span>
        <span className="text-gray-300">|</span>
        <span><span className="font-semibold text-amber-600">Show in Home</span> = appears in the scrolling home marquee</span>
      </div>

      {/* Event Cards */}
      <div className="grid gap-4">
        {events.map(ev => (
          <div key={ev.id}
            className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col sm:flex-row gap-4 transition-opacity ${!ev.active ? 'opacity-60' : ''}`}>

            {/* Image */}
            <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              {ev.imageUrl ? (
                <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🎪</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-gray-900">{ev.title}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  ev.category === 'upcoming' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ev.category === 'upcoming' ? '🔥 Festival' : '🤝 Seva'}
                </span>
              </div>
              <p className="text-sm text-gray-500">📅 {ev.date} {ev.time && `· ${ev.time}`}</p>
              {ev.location && <p className="text-xs text-gray-400 mt-0.5">📍 {ev.location}</p>}

              <div className="flex flex-wrap gap-5 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={ev.active} onChange={v => updateEvent(ev.id, { active: v })} />
                  <span className="text-xs text-gray-600">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={ev.showInHome || false} onChange={v => updateEvent(ev.id, { showInHome: v })} />
                  <span className="text-xs text-gray-600">Show in Home</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditItem(ev)}
                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">Edit</button>
              <button onClick={() => { if (window.confirm(`Delete "${ev.title}"?`)) deleteEvent(ev.id); }}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editItem && <EventModal item={editItem} onClose={() => setEditItem(null)} onSave={d => updateEvent(editItem.id, d)} isNew={false} />}
      {showAdd   && <EventModal item={emptyForm} onClose={() => setShowAdd(false)} onSave={d => addEvent(d)} isNew />}
    </AdminLayout>
  );
}
