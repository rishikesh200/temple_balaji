import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { inputCls, labelCls, thCls } from '../utils/formStyles';
import ImageUploader, { FALLBACKS } from '../components/ImageUploader';
import { useToast } from '../components/Toast';
import { useConfirm } from '../components/ConfirmDialog';

const BOOKING_TYPE_OPTIONS = [
  { value: 'payment', label: '💳 Pay Online',  desc: 'Razorpay — pay before booking' },
  { value: 'spot',    label: '🛕 Pay on Spot',  desc: 'Book slot now, pay cash at temple' },
  { value: 'free',    label: '🆓 Free',          desc: 'No payment — just book the slot' },
  { value: 'both',    label: '🔀 Both',          desc: 'User picks: pay online or pay on spot' },
];

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );
}

function BookingTypeBadge({ type }) {
  const map    = { payment: 'bg-blue-100 text-blue-700', spot: 'bg-amber-100 text-amber-800', free: 'bg-green-100 text-green-700', both: 'bg-purple-100 text-purple-700' };
  const labels = { payment: '💳 Pay Online', spot: '🛕 Pay on Spot', free: '🆓 Free', both: '🔀 Both' };
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${map[type] || map.payment}`}>{labels[type] || type}</span>;
}

const emptyForm = {
  title: '', summary: '', description: '', priceLabel: '', badge: '',
  tagline: '', price: 0, ctaLabel: 'Book Now', featured: false,
  active: true, showInHome: true, bookingType: 'payment', imageUrl: '',
};

function DarshanModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item ? { ...item, imageUrl: item.imageUrl || '' } : emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{isNew ? 'Add Darshan Type' : `Edit: ${item?.title}`}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Price (₹)</label>
              <input type="number" value={form.price} onChange={e => {
                const p = Number(e.target.value);
                set('price', p);
                set('priceLabel', p === 0 ? 'FREE' : `₹${p}`);
                set('badge', p === 0 ? 'FREE' : `₹${p}`);
              }} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Badge Label</label>
              <input value={form.badge} onChange={e => set('badge', e.target.value)} className={inputCls} placeholder="FREE / ₹250" />
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input value={form.tagline} onChange={e => set('tagline', e.target.value)} className={inputCls} placeholder="Fast-Track" />
            </div>
            <div>
              <label className={labelCls}>CTA Button</label>
              <input value={form.ctaLabel} onChange={e => set('ctaLabel', e.target.value)} className={inputCls} />
            </div>
          </div>

          <ImageUploader
            value={form.imageUrl}
            onChange={url => set('imageUrl', url)}
            folder="darshan"
            fallback={FALLBACKS.darshan}
            label="Darshan Image"
          />

          {/* Booking Type */}
          <div>
            <label className={labelCls}>Booking Type</label>
            <div className="flex gap-2 flex-wrap">
              {BOOKING_TYPE_OPTIONS.map(opt => (
                <button key={opt.value} type="button" onClick={() => set('bookingType', opt.value)}
                  className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg border text-sm text-left transition ${
                    form.bookingType === opt.value ? 'border-orange-500 bg-orange-50 font-semibold' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Short Summary</label>
            <textarea rows={2} value={form.summary} onChange={e => set('summary', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Full Description</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className={`${inputCls} resize-none`} />
          </div>

          {/* Tamil Translations */}
          <details className="border border-dashed border-gray-300 rounded-xl">
            <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 select-none hover:bg-gray-50 rounded-xl">
              🇮🇳 Tamil Translation <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-3">
              <div>
                <label className={labelCls}>தலைப்பு (Title in Tamil)</label>
                <input value={form.title_ta || ''} onChange={e => set('title_ta', e.target.value)} className={inputCls} placeholder="e.g. சர்வ தரிசனம்" />
              </div>
              <div>
                <label className={labelCls}>குறிச்சொல் (Tagline in Tamil)</label>
                <input value={form.tagline_ta || ''} onChange={e => set('tagline_ta', e.target.value)} className={inputCls} placeholder="e.g. விரைவு பாதை" />
              </div>
              <div>
                <label className={labelCls}>சுருக்கம் (Summary in Tamil)</label>
                <textarea rows={2} value={form.summary_ta || ''} onChange={e => set('summary_ta', e.target.value)} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>விரிவான விளக்கம் (Description in Tamil)</label>
                <textarea rows={3} value={form.description_ta || ''} onChange={e => set('description_ta', e.target.value)} className={`${inputCls} resize-none`} />
              </div>
            </div>
          </details>

          <div className="flex flex-wrap gap-6 pt-1">
            {[
              ['active',     'Active (visible on site)'],
              ['showInHome', 'Show in Home Page'],
              ['featured',   'Featured (highlighted)'],
            ].map(([k, lbl]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <Toggle checked={form[k] || false} onChange={v => set(k, v)} />
                <span className="text-sm text-gray-700">{lbl}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
            {isNew ? 'Add' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DarshanManagePage() {
  const confirm = useConfirm();
  const toast = useToast();
  const { darshanItems, updateDarshan, addDarshan, deleteDarshan } = useAdminData();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Darshan Management</h2>
          <p className="text-sm text-gray-500 mt-1">Control each darshan type — visibility, home display, and booking type</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          + Add Darshan Type
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-xs text-gray-500 bg-white border rounded-lg p-3">
        <span><span className="font-semibold text-green-600">Active</span> = shown on /darshan page</span>
        <span className="text-gray-300">|</span>
        <span><span className="font-semibold text-amber-600">Show in Home</span> = appears on home page darshan section</span>
        <span className="text-gray-300">|</span>
        <span>
          <span className="font-semibold text-blue-600">💳 Pay Online</span> = Razorpay &nbsp;·&nbsp;
          <span className="font-semibold text-amber-600">🛕 Pay on Spot</span> = book slot, pay cash at temple &nbsp;·&nbsp;
          <span className="font-semibold text-green-600">🆓 Free</span> = no payment needed &nbsp;·&nbsp;
          <span className="font-semibold text-purple-600">🔀 Both</span> = user picks online or spot
        </span>
      </div>

      <div className="grid gap-4">
        {darshanItems.map(item => (
          <div key={item.id}
            className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-start transition-opacity ${!item.active ? 'opacity-60' : ''}`}>

            <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              {(item.imageUrl || item.image) ? (
                <img src={item.imageUrl || item.image} alt={item.title}
                  className="w-full h-full object-cover"
                  onError={e => e.target.style.display = 'none'} />
              ) : null}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  item.badge === 'FREE' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-800'
                }`}>{item.badge || item.priceLabel}</span>
                <BookingTypeBadge type={item.bookingType || 'free'} />
              </div>
              <p className="text-sm text-gray-500">{item.summary}</p>

              <div className="flex flex-wrap gap-5 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={item.active} onChange={v => updateDarshan(item.id, { active: v })} />
                  <span className="text-xs text-gray-600">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={item.showInHome || false} onChange={v => updateDarshan(item.id, { showInHome: v })} />
                  <span className="text-xs text-gray-600">Show in Home</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={item.featured || false} onChange={v => updateDarshan(item.id, { featured: v })} />
                  <span className="text-xs text-gray-600">Featured</span>
                </label>
              </div>

              <div className="flex gap-1.5 mt-3 flex-wrap">
                {BOOKING_TYPE_OPTIONS.map(opt => (
                  <button key={opt.value} type="button"
                    onClick={() => updateDarshan(item.id, { bookingType: opt.value })}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                      (item.bookingType || 'free') === opt.value
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}>{opt.label}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditItem(item)}
                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">Edit</button>
              <button onClick={async () => { if (await confirm(`Remove "${item.title}"?`)) deleteDarshan(item.id); }}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {editItem && <DarshanModal item={editItem} onClose={() => setEditItem(null)} onSave={d => updateDarshan(editItem.id, d)} isNew={false} />}
      {showAdd   && <DarshanModal item={emptyForm} onClose={() => setShowAdd(false)} onSave={d => addDarshan(d)} isNew />}
    </AdminLayout>
  );
}
