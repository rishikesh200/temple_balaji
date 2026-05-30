import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import ImageUploader, { FALLBACKS } from '../components/ImageUploader';

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );
}

const ICON_OPTIONS = ['heart', 'building', 'landmark', 'heartHandshake', 'book', 'sparkles', 'flame', 'users'];

const emptyForm = {
  title: '', description: '', inputMode: 'presets',
  presetAmounts: [501, 1001, 5001], ctaIcon: 'heart', active: true, imageUrl: '',
};

function DonationModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item ? { ...item, imageUrl: item.imageUrl || '' } : emptyForm);
  const [presetsInput, setPresetsInput] = useState(
    (item?.presetAmounts || [501, 1001, 5001]).join(', ')
  );
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    const amounts = presetsInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    onSave({ ...form, presetAmounts: amounts });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold">{isNew ? 'Add Donation Cause' : `Edit: ${item?.title}`}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Annadanam" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
          </div>
          <ImageUploader
            value={form.imageUrl}
            onChange={url => set('imageUrl', url)}
            folder="donation"
            fallback={FALLBACKS.donation}
            label="Cause Image"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Mode</label>
            <div className="flex gap-4">
              {['presets', 'custom'].map(mode => (
                <label key={mode} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="inputMode" value={mode}
                    checked={form.inputMode === mode} onChange={() => set('inputMode', mode)} />
                  {mode === 'presets' ? 'Preset Amounts' : 'Custom Amount Input'}
                </label>
              ))}
            </div>
          </div>
          {form.inputMode === 'presets' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preset Amounts (comma-separated, ₹)
              </label>
              <input value={presetsInput} onChange={e => setPresetsInput(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="501, 1001, 5001" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.active} onChange={v => set('active', v)} />
              <span className="text-sm text-gray-600">Show on donation page</span>
            </label>
          </div>

          {/* Tamil Translations */}
          <details className="border border-dashed border-gray-300 rounded-xl">
            <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 select-none hover:bg-gray-50 rounded-xl">
              🇮🇳 Tamil Translation <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">தலைப்பு (Title in Tamil)</label>
                <input value={form.title_ta || ''} onChange={e => set('title_ta', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. அன்னதானம்" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">விளக்கம் (Description in Tamil)</label>
                <textarea rows={3} value={form.description_ta || ''} onChange={e => set('description_ta', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
              </div>
            </div>
          </details>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={handleSave}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
            {isNew ? 'Add Cause' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DonationCausesManagePage() {
  const { donationItems, updateDonation, addDonation, deleteDonation, resetDonation } = useAdminData();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donation Causes</h2>
          <p className="text-sm text-gray-500 mt-1">Manage causes shown on the donation page — toggle, edit amounts, and add new causes</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
          + Add Cause
        </button>
      </div>

      <div className="grid gap-4">
        {donationItems.map(item => (
          <div key={item.id}
            className={`bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-4 items-start ${item._deleted ? 'opacity-50' : ''}`}>

            {/* Image */}
            <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              {(item.imageUrl || item.image) ? (
                <img src={item.imageUrl || item.image} alt={item.title}
                  className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  item.inputMode === 'presets' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {item.inputMode === 'presets' ? 'Presets' : 'Custom Input'}
                </span>
                {item.inputMode === 'presets' && item.presetAmounts?.map(a => (
                  <span key={a} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs">₹{a}</span>
                ))}
              </div>
            </div>

            {/* Toggles + Actions */}
            <div className="flex flex-col gap-3 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <Toggle checked={item.active} onChange={v => updateDonation(item.id, { active: v })} />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <div className="flex gap-2">
                <button onClick={() => setEditItem(item)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200">
                  Edit
                </button>
                <button onClick={() => { if (window.confirm(`Remove "${item.title}"?`)) deleteDonation(item.id); }}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <DonationModal item={editItem} onClose={() => setEditItem(null)}
          onSave={data => updateDonation(editItem.id, data)} isNew={false} />
      )}
      {showAdd && (
        <DonationModal item={emptyForm} onClose={() => setShowAdd(false)}
          onSave={data => addDonation(data)} isNew />
      )}
    </AdminLayout>
  );
}
