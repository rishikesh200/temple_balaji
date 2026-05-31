import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { inputCls, labelCls, thCls } from '../utils/formStyles';
import ImageUploader, { FALLBACKS } from '../components/ImageUploader';
import { useToast } from '../components/Toast';
import { useConfirm } from '../components/ConfirmDialog';

const CATEGORIES = [
  { key: 'daily',       label: 'Normal Poojas' },
  { key: 'special',     label: 'Special Sevas' },
  { key: 'nerthikadan', label: 'Nerthikadans'  },
];

const BOOKING_TYPE_OPTIONS = [
  { value: 'payment', label: '💳 Pay Online',   desc: 'Razorpay — pay before booking' },
  { value: 'spot',    label: '🛕 Pay on Spot',   desc: 'Book slot now, pay cash at temple' },
  { value: 'free',    label: '🆓 Free',           desc: 'No payment — just book the slot' },
  { value: 'both',    label: '🔀 Both',           desc: 'User picks: pay online or pay on spot' },
];

const emptyForm = {
  category: 'daily', name: '', price: '', time: '',
  description: '', image: '', about: '', other: '',
  benefits: ['', '', ''], active: true, showInHome: false, bookingType: 'payment',
};

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

function PoojaModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setBenefit = (i, v) => setForm(f => {
    const b = [...(f.benefits || ['', '', ''])]; b[i] = v;
    return { ...f, benefits: b };
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{isNew ? 'Add New Pooja' : `Edit: ${item?.name}`}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} placeholder="Pooja name" />
            </div>
            <div>
              <label className={labelCls}>Price (₹)</label>
              <input type="number" value={form.price} onChange={e => set('price', Number(e.target.value))} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Time / Schedule</label>
              <input value={form.time} onChange={e => set('time', e.target.value)} className={inputCls} placeholder="06:00 AM Daily" />
            </div>
          </div>

          {/* Booking Type */}
          <div>
            <label className={labelCls}>Booking Type</label>
            <div className="flex gap-2 flex-wrap">
              {BOOKING_TYPE_OPTIONS.map(opt => (
                <button key={opt.value} type="button"
                  onClick={() => set('bookingType', opt.value)}
                  className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg border text-sm text-left transition ${
                    form.bookingType === opt.value
                      ? 'border-orange-500 bg-orange-50 font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <ImageUploader
            value={form.image}
            onChange={url => set('image', url)}
            folder="pooja"
            fallback={FALLBACKS[`pooja_${form.category}`] || FALLBACKS.pooja_daily}
            label="Pooja Image"
          />
          <div>
            <label className={labelCls}>Short Description</label>
            <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Detailed About</label>
            <textarea rows={3} value={form.about} onChange={e => set('about', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Benefits (up to 3)</label>
            {(form.benefits || ['', '', '']).map((b, i) => (
              <input key={i} value={b} onChange={e => setBenefit(i, e.target.value)}
                className={`${inputCls} mb-2`} placeholder={`Benefit ${i + 1}`} />
            ))}
          </div>
          <div>
            <label className={labelCls}>Instructions / Other Notes</label>
            <textarea rows={2} value={form.other} onChange={e => set('other', e.target.value)} className={`${inputCls} resize-none`} />
          </div>

          {/* Tamil Translations */}
          <details className="border border-dashed border-gray-300 rounded-xl">
            <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 select-none hover:bg-gray-50 rounded-xl">
              🇮🇳 Tamil Translation <span className="text-xs text-gray-400 font-normal ml-1">(optional — falls back to English if empty)</span>
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-3">
              <div>
                <label className={labelCls}>பெயர் (Name in Tamil)</label>
                <input value={form.name_ta || ''} onChange={e => set('name_ta', e.target.value)} className={inputCls} placeholder="e.g. சுப்ரபாத சேவை" />
              </div>
              <div>
                <label className={labelCls}>நேரம் (Time in Tamil)</label>
                <input value={form.time_ta || ''} onChange={e => set('time_ta', e.target.value)} className={inputCls} placeholder="e.g. தினமும் 05:00 AM" />
              </div>
              <div>
                <label className={labelCls}>சுருக்கம் (Short Description in Tamil)</label>
                <textarea rows={2} value={form.description_ta || ''} onChange={e => set('description_ta', e.target.value)} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>விரிவான விளக்கம் (About in Tamil)</label>
                <textarea rows={3} value={form.about_ta || ''} onChange={e => set('about_ta', e.target.value)} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>வழிமுறைகள் (Instructions in Tamil)</label>
                <textarea rows={2} value={form.other_ta || ''} onChange={e => set('other_ta', e.target.value)} className={`${inputCls} resize-none`} />
              </div>
            </div>
          </details>

          {/* Toggles */}
          <div className="flex gap-6 pt-1 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.active} onChange={v => set('active', v)} />
              <span className="text-sm text-gray-700">Active (visible on site)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.showInHome} onChange={v => set('showInHome', v)} />
              <span className="text-sm text-gray-700">Show in Home Page</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
            {isNew ? 'Add Pooja' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PoojaManagePage() {
  const confirm = useConfirm();
  const toast = useToast();
  const { poojas, updatePooja, addPooja, deletePooja } = useAdminData();
  const [activeTab, setActiveTab] = useState('daily');
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = poojas.filter(p => p.category === activeTab);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pooja & Seva Management</h2>
          <p className="text-sm text-gray-500 mt-1">Control visibility, home page display, and booking type per pooja</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          + Add New Pooja
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500 bg-white border rounded-lg p-3">
        <span><span className="font-semibold text-green-600">Active</span> = shown on /pooja page</span>
        <span className="text-gray-300">|</span>
        <span><span className="font-semibold text-amber-600">Show in Home</span> = appears on home page pooja grid</span>
        <span className="text-gray-300">|</span>
        <span>
          <span className="font-semibold text-blue-600">💳 Pay Online</span> = Razorpay &nbsp;·&nbsp;
          <span className="font-semibold text-amber-600">🛕 Pay on Spot</span> = book slot, pay cash at temple &nbsp;·&nbsp;
          <span className="font-semibold text-green-600">🆓 Free</span> = no payment &nbsp;·&nbsp;
          <span className="font-semibold text-purple-600">🔀 Both</span> = user picks online or spot
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-5 border-b">
        {CATEGORIES.map(cat => {
          const count = poojas.filter(p => p.category === cat.key).length;
          return (
            <button key={cat.key} onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === cat.key
                  ? 'border-orange-600 text-orange-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              {cat.label}
              <span className="ml-1.5 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className={thCls}>Pooja / Seva</th>
              <th className={thCls}>Price</th>
              <th className={thCls}>Booking Type</th>
              <th className={`${thCls} text-center`}>Active</th>
              <th className={`${thCls} text-center`}>Show in Home</th>
              <th className={thCls}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-10 text-center text-gray-400">No items</td></tr>
            )}
            {filtered.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0"
                        onError={e => e.target.style.display = 'none'} />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.time || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {item.price > 0 ? `₹${item.price}` : 'Free'}
                </td>
                <td className="py-3 px-4">
                  <BookingTypeBadge type={item.bookingType || 'payment'} />
                </td>
                <td className="py-3 px-4 text-center">
                  <Toggle checked={item.active} onChange={v => updatePooja(item.id, { active: v })} />
                </td>
                <td className="py-3 px-4 text-center">
                  <Toggle checked={item.showInHome || false} onChange={v => updatePooja(item.id, { showInHome: v })} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditItem(item)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200">Edit</button>
                    <button onClick={async () => { if (await confirm(`Remove "${item.name}"?`)) deletePooja(item.id); }}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && <PoojaModal item={editItem} onClose={() => setEditItem(null)} onSave={d => updatePooja(editItem.id, d)} isNew={false} />}
      {showAdd   && <PoojaModal item={{ ...emptyForm, category: activeTab }} onClose={() => setShowAdd(false)} onSave={d => addPooja(d)} isNew />}
    </AdminLayout>
  );
}
