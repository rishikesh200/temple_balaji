import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { inputCls, labelCls } from '../utils/formStyles';
import ImageUploader, { FALLBACKS } from '../components/ImageUploader';
import { useToast } from '../components/Toast';
import { useConfirm } from '../components/ConfirmDialog';

const CATEGORIES = [
  { value: 'general',   label: 'General' },
  { value: 'festival',  label: 'Festival' },
  { value: 'darshan',   label: 'Darshan' },
  { value: 'pooja',     label: 'Pooja' },
  { value: 'annadanam', label: 'Annadanam' },
  { value: 'gopuram',   label: 'Gopuram / Architecture' },
];

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );
}

const emptyForm = {
  imageUrl: '', caption: '', category: 'general', isHome: false, isActive: true, sortOrder: 0,
};

function ImageModal({ item, onClose, onSave, isNew }) {
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{isNew ? 'Add Gallery Image' : 'Edit Image'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <ImageUploader
            value={form.imageUrl}
            onChange={url => set('imageUrl', url)}
            folder="gallery"
            fallback={FALLBACKS.gallery || FALLBACKS.event}
            label="Image"
          />

          <div>
            <label className={labelCls}>Caption (optional)</label>
            <input value={form.caption} onChange={e => set('caption', e.target.value)}
              className={inputCls} placeholder="e.g. Brahmotsavam 2024" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))}
                className={inputCls} placeholder="0" />
            </div>
          </div>

          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.isActive} onChange={v => set('isActive', v)} />
              <span className="text-sm text-gray-700">Active (visible in gallery)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Toggle checked={form.isHome} onChange={v => set('isHome', v)} />
              <span className="text-sm text-gray-700">Show on Home Page</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
            {isNew ? 'Add Image' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Live Stream Section ────────────────────────────────────────────
function LiveStreamSection() {
  const { liveStream, updateLiveStream } = useAdminData();
  const toast = useToast();
  const [form, setForm] = useState(liveStream);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const isYouTube = (url) => /youtu\.be|youtube\.com/i.test(url);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (/youtube\.com\/watch\?v=/.test(url)) {
      const id = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
    }
    if (/youtu\.be\//.test(url)) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
    }
    if (/youtube\.com\/live\//.test(url)) {
      const id = url.split('/live/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
    }
    return url;
  };

  const handleSave = async () => {
    await updateLiveStream(form);
    toast.success('Live stream settings saved!');
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">🔴 Home Page Live Stream</h3>
          <p className="text-sm text-gray-500 mt-0.5">Show a live video or YouTube stream on the home page</p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Toggle checked={form.enabled} onChange={v => set('enabled', v)} />
          <span className="text-sm font-medium text-gray-700">{form.enabled ? 'Enabled' : 'Disabled'}</span>
        </label>
      </div>

      <div>
        <label className={labelCls}>Stream Title</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          className={inputCls} placeholder="e.g. Live Darshan — Brahmotsavam 2025" />
      </div>

      <div>
        <label className={labelCls}>Video URL</label>
        <input value={form.url} onChange={e => set('url', e.target.value)}
          className={inputCls}
          placeholder="YouTube link (youtube.com/watch?v=... or youtu.be/...) or direct video URL" />
        <p className="text-xs text-gray-400 mt-1">
          Supports YouTube watch links, YouTube live links, youtu.be short links, or any direct MP4/HLS video URL.
        </p>
      </div>

      {form.url && (
        <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video bg-black">
          {isYouTube(form.url) ? (
            <iframe
              src={getEmbedUrl(form.url)}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Live stream preview"
            />
          ) : (
            <video
              src={form.url}
              controls
              className="w-full h-full"
              onError={e => e.target.style.display = 'none'}
            />
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={handleSave}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          Save Stream Settings
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function GalleryManagePage() {
  const confirm = useConfirm();
  const toast = useToast();
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useAdminData();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filterCat, setFilterCat] = useState('all');

  const filtered = filterCat === 'all'
    ? gallery
    : gallery.filter(g => g.category === filterCat);

  const stats = {
    total:  gallery.length,
    active: gallery.filter(g => g.isActive).length,
    home:   gallery.filter(g => g.isHome).length,
  };

  return (
    <AdminLayout>
      {/* ── Gallery Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery & Live Stream</h2>
          <p className="text-sm text-gray-500 mt-1">Manage gallery images and the home page live stream</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700">
          + Add Image
        </button>
      </div>

      {/* ── Live Stream Section ── */}
      <div className="mb-8">
        <LiveStreamSection />
      </div>

      {/* ── Gallery Stats ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Images', value: stats.total,  color: 'text-gray-700' },
          { label: 'Active',       value: stats.active, color: 'text-green-600' },
          { label: 'On Home Page', value: stats.home,   color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Category Filter ── */}
      <div className="flex gap-2 flex-wrap mb-5">
        {[{ value: 'all', label: 'All' }, ...CATEGORIES].map(c => (
          <button key={c.value} onClick={() => setFilterCat(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              filterCat === c.value
                ? 'bg-orange-600 text-white border-orange-600'
                : 'border-gray-300 text-gray-600 hover:border-orange-400'
            }`}>
            {c.label}
            {c.value !== 'all' && (
              <span className="ml-1 opacity-70">
                ({gallery.filter(g => g.category === c.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Image Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">🖼️</p>
          <p className="font-medium">No images yet</p>
          <p className="text-sm mt-1">Click "Add Image" to upload your first gallery photo</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(img => (
            <div key={img.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col transition-opacity ${!img.isActive ? 'opacity-50' : ''}`}>

              {/* Image */}
              <div className="relative aspect-square bg-gray-100">
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt={img.caption || 'Gallery'}
                    className="w-full h-full object-cover"
                    onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🖼️</div>
                )}
                {/* Badges */}
                <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                  {img.isHome && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">HOME</span>
                  )}
                  {!img.isActive && (
                    <span className="bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">OFF</span>
                  )}
                </div>
              </div>

              {/* Info + Controls */}
              <div className="p-2.5 flex flex-col gap-2 flex-1">
                {img.caption && (
                  <p className="text-xs text-gray-600 font-medium line-clamp-1">{img.caption}</p>
                )}
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded self-start capitalize">
                  {img.category}
                </span>

                {/* Toggles */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Toggle checked={img.isActive} onChange={v => updateGalleryImage(img.id, { isActive: v })} />
                    <span className="text-[11px] text-gray-600">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Toggle checked={img.isHome || false} onChange={v => updateGalleryImage(img.id, { isHome: v })} />
                    <span className="text-[11px] text-gray-600">Show on Home</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 mt-1">
                  <button onClick={() => setEditItem(img)}
                    className="flex-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-[11px] font-medium hover:bg-blue-200">
                    Edit
                  </button>
                  <button onClick={async () => {
                    if (await confirm('Delete this image?')) deleteGalleryImage(img.id);
                  }}
                    className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-[11px] font-medium hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editItem && (
        <ImageModal item={editItem} onClose={() => setEditItem(null)}
          onSave={d => updateGalleryImage(editItem.id, d)} isNew={false} />
      )}
      {showAdd && (
        <ImageModal item={emptyForm} onClose={() => setShowAdd(false)}
          onSave={d => addGalleryImage(d)} isNew />
      )}
    </AdminLayout>
  );
}
