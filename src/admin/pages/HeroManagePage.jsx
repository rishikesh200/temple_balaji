import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { inputCls, labelCls } from '../utils/formStyles';
import { useToast } from '../components/Toast';
import { useConfirm } from '../components/ConfirmDialog';
import { useAdmin } from '../contexts/AdminContext';
import { uploadImage } from '../services/api';

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );
}

// Landscape-only image uploader (inline, no ImageUploader component)
function LandscapeUploader({ value, onChange }) {
  const { token } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const inputRef = React.useRef(null);

  const validate = (file) => new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width < img.height) {
        reject('Please upload a landscape (horizontal) image. Portrait images are not suitable for the hero section.');
      } else {
        resolve();
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
    img.src = url;
  });

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    try {
      await validate(file);
    } catch (msg) {
      setError(msg);
      e.target.value = '';
      return;
    }
    setUploading(true);
    try {
      const res = await uploadImage(token, file, 'hero');
      if (res.url) onChange(res.url);
      else setError(res.error || 'Upload failed.');
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleUrlSave = () => {
    if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(''); setShowUrl(false); }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Hero Image <span className="text-xs text-amber-600 font-normal">(landscape / horizontal only)</span>
        </label>
        <button type="button" onClick={() => setShowUrl(v => !v)}
          className="text-xs text-blue-600 hover:underline">
          {showUrl ? 'Upload file instead' : 'Paste URL instead'}
        </button>
      </div>

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100" style={{ aspectRatio: '16/7' }}>
          <img src={value} alt="Hero preview" className="w-full h-full object-cover"
            onError={e => e.target.style.display = 'none'} />
        </div>
      )}

      {showUrl ? (
        <div className="flex gap-2">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)}
            className={`${inputCls} flex-1`} placeholder="https://..." />
          <button type="button" onClick={handleUrlSave}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
            Set
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors disabled:opacity-50">
          {uploading ? 'Uploading…' : value ? '🔄 Replace Image' : '📸 Upload Landscape Image'}
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">
        Recommended: 1920×900 px or wider. Landscape (width &gt; height) images only.
      </p>
    </div>
  );
}

function HeroModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item || { imageUrl: '', caption: '', isActive: true, sortOrder: 0 });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl my-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{isNew ? 'Add Hero Image' : 'Edit Hero Image'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <LandscapeUploader value={form.imageUrl} onChange={url => set('imageUrl', url)} />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Caption (optional)</label>
              <input value={form.caption} onChange={e => set('caption', e.target.value)}
                className={inputCls} placeholder="e.g. Brahmotsavam Celebrations" />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))}
                className={inputCls} placeholder="0" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <Toggle checked={form.isActive} onChange={v => set('isActive', v)} />
            <span className="text-sm text-gray-700">Active (shown in slideshow)</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button
            onClick={() => { if (!form.imageUrl) return; onSave(form); onClose(); }}
            disabled={!form.imageUrl}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 disabled:opacity-40">
            {isNew ? 'Add Image' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroManagePage() {
  const confirm = useConfirm();
  const toast = useToast();
  const { heroImages, addHeroImage, updateHeroImage, deleteHeroImage } = useAdminData();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const active = heroImages.filter(h => h.isActive).length;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Slideshow Images</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage the background images for the home page hero section — landscape images only
          </p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          + Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total',  value: heroImages.length, color: 'text-gray-700' },
          { label: 'Active', value: active,             color: 'text-green-600' },
          { label: 'Hidden', value: heroImages.length - active, color: 'text-gray-400' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        <strong>Fallback:</strong> If no images are added here (or all are set inactive), the hero will show 2 built-in temple photos. Once you add at least 1 active image, only your images will be used.
      </div>

      {/* Image cards */}
      {heroImages.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">🏔️</p>
          <p className="font-medium">No hero images yet</p>
          <p className="text-sm mt-1">Click "Add Image" to upload your first landscape hero photo</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {[...heroImages].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((img, i) => (
            <div key={img.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col sm:flex-row gap-0 transition-opacity ${!img.isActive ? 'opacity-50' : ''}`}>

              {/* Landscape preview */}
              <div className="sm:w-72 h-40 sm:h-auto bg-gray-100 shrink-0 relative">
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt={img.caption || `Hero ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🖼️</div>
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    #{img.sortOrder ?? i}
                  </span>
                  {!img.isActive && (
                    <span className="bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded font-medium">HIDDEN</span>
                  )}
                </div>
              </div>

              {/* Info + controls */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{img.caption || <span className="text-gray-400 italic">No caption</span>}</p>
                  {img.imageUrl && (
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{img.imageUrl}</p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Toggle checked={img.isActive} onChange={v => updateHeroImage(img.id, { isActive: v })} />
                    <span className="text-sm text-gray-600">Active</span>
                  </label>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>Order:</span>
                    <input type="number" defaultValue={img.sortOrder ?? 0}
                      onBlur={e => updateHeroImage(img.id, { sortOrder: Number(e.target.value) })}
                      className="w-16 border rounded px-2 py-0.5 text-sm text-center" />
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button onClick={() => setEditItem(img)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">Edit</button>
                    <button onClick={async () => {
                      if (await confirm('Delete this hero image?')) deleteHeroImage(img.id);
                    }}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editItem && (
        <HeroModal item={editItem} onClose={() => setEditItem(null)}
          onSave={d => updateHeroImage(editItem.id, d)} isNew={false} />
      )}
      {showAdd && (
        <HeroModal onClose={() => setShowAdd(false)}
          onSave={d => addHeroImage(d)} isNew />
      )}
    </AdminLayout>
  );
}
