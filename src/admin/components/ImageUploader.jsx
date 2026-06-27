import React, { useRef, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { uploadImage } from '../services/api';

const MAX_MB = 7;
const MAX_BYTES = MAX_MB * 1024 * 1024;

// Fallback images per section type — used when no image is set
export const FALLBACKS = {
  pooja_daily:       'https://lh3.googleusercontent.com/aida-public/AB6AXuDy8sz-TiNcKoYo5Pht81ynM9Z_MO-vQ6r7wXlLkqCs54zcn4w-F5O5lIpvo2CbXW1dkCEWxBtk-XlGeoy5YIOvi3axaTSPsF2dEhpIaiq2cgpBTKb9Z0G51CU-Wf57D55jK68YPp-MlZyZTp7CNNOA-dUS3CsBOXwU2zzpNARiQPVSg2l5m3st6ZZCGNCwzFqls7GVVkwHIV_bri6OU7Gfrmey6p9OvEWlM8T_oz_pZBP98jLtiNVS7yJFJYrRERuX1locTacD3a4',
  pooja_special:     'https://lh3.googleusercontent.com/aida-public/AB6AXuB66J1mQ6og1J1zQOaP5yC72Nm3388D4Bp6tCiwtU77gtGrn5LQ4CuYCW2vAwBcXHCXtnFKQnKj4SnS-ajTMX4qFWMWtc8Xgb-PLkk-s4q1jBQxds8e8lEvFPUq7iB-Ipc1wy6qI7k2djIP96jhgA_SC9jAtL9lkH2RTRwTKyJ63QEibIGECJWozg0EnDCIfW18VaQvsLMZEyQdSvFf2LQb0A7z5eViNES_vOyeKMl4g7upEWzCp7DiqeV154wyU8_9kxjoBLoWd6g',
  pooja_nerthikadan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBeY42kZrEU50Ovv4ZplL-C1cbtbwoORE-Ka5euZ0LJJ3BTNq8NBcRIEN08X9Tj2iSRU-bzWu93ahKhoizyNJD2j98POmelMWHsUgGraVaBMGvvdGMXq2oHB24-Ed_cY7zqjjEQJgjeZ3l8QwyP9ByzZgX5gH8QFnKjQdE0j6PmkM2x0njCuL3L9IqQhvTcs-vWdikMeggRcuBPeO0triar7k6zJtzN9GCSOSBaZaZXoGN3bqva4D9cnoKO8kUsSilFNMSIfU8GRM',
  darshan:           'https://lh3.googleusercontent.com/aida-public/AB6AXuDy8sz-TiNcKoYo5Pht81ynM9Z_MO-vQ6r7wXlLkqCs54zcn4w-F5O5lIpvo2CbXW1dkCEWxBtk-XlGeoy5YIOvi3axaTSPsF2dEhpIaiq2cgpBTKb9Z0G51CU-Wf57D55jK68YPp-MlZyZTp7CNNOA-dUS3CsBOXwU2zzpNARiQPVSg2l5m3st6ZZCGNCwzFqls7GVVkwHIV_bri6OU7Gfrmey6p9OvEWlM8T_oz_pZBP98jLtiNVS7yJFJYrRERuX1locTacD3a4',
  donation:          'https://lh3.googleusercontent.com/aida-public/AB6AXuA_rWUOTVD5dXG_9zbwEGkp694Eph1gmGO3_3ia7VkyK0dbpqfJu3ebBtVrzvHCC4DTEGx6dH8Wbs9_lVlmL-iRtSidVv2vunIOlpeqgAKQYQkzuc5PIWbWb4O5zOMVV8-gRSQzFYYoLZWA3WWaxDd69VfU01ojEg5G3MhRVrqPPLIpnxiGyex-btOqlkyjjg9J2cxS9eVyiT2e4-Lm-B1OGxBnUXhW8uTj-jLL-kU7TjcUQIDh3o71hXQod_AHCbXdJrDXZ3xyykg',
  event:             'https://lh3.googleusercontent.com/aida-public/AB6AXuB66J1mQ6og1J1zQOaP5yC72Nm3388D4Bp6tCiwtU77gtGrn5LQ4CuYCW2vAwBcXHCXtnFKQnKj4SnS-ajTMX4qFWMWtc8Xgb-PLkk-s4q1jBQxds8e8lEvFPUq7iB-Ipc1wy6qI7k2djIP96jhgA_SC9jAtL9lkH2RTRwTKyJ63QEibIGECJWozg0EnDCIfW18VaQvsLMZEyQdSvFf2LQb0A7z5eViNES_vOyeKMl4g7upEWzCp7DiqeV154wyU8_9kxjoBLoWd6g',
};

/**
 * ImageUploader — reusable image upload widget for admin modals
 *
 * Props:
 *  value       string   current image URL (Vercel Blob URL or any URL)
 *  onChange    fn(url)  called after successful upload or URL paste
 *  folder      string   Vercel Blob folder (e.g. 'pooja', 'darshan')
 *  fallback    string   URL shown when value is empty
 *  label       string   optional label text
 */
export default function ImageUploader({ value, onChange, folder = 'temple', fallback = '', label = 'Image' }) {
  const { token } = useAdmin();
  const inputRef  = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState('');
  const [urlInput,  setUrlInput]  = useState('');
  const [showUrl,   setShowUrl]   = useState(false);

  const previewSrc = value || fallback;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Client-side size check
    if (file.size > MAX_BYTES) {
      setError(`File is too large. Maximum allowed size is ${MAX_MB} MB.`);
      e.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed (JPG, PNG, WebP, etc.)');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImage(token, file, folder);
      if (result.success) {
        onChange(result.url);
        setError('');
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed — check backend connection');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleUrlPaste = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrl(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowUrl(v => !v)}
            className="text-xs text-gray-400 hover:text-gray-600 underline">
            {showUrl ? 'Cancel' : 'Paste URL instead'}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden border border-dashed border-gray-300">
        {previewSrc ? (
          <>
            <img src={previewSrc} alt="preview"
              className="w-full h-full object-cover"
              onError={e => { if (fallback) e.target.src = fallback; }} />
            {/* overlay controls */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
              <button type="button"
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 bg-white text-gray-800 text-xs font-semibold rounded-lg shadow hover:bg-gray-100">
                Replace
              </button>
              <button type="button" onClick={handleRemove}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg shadow hover:bg-red-700">
                Remove
              </button>
            </div>
          </>
        ) : (
          <button type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <span className="text-3xl">🖼️</span>
            <span className="text-xs font-medium">Click to upload image</span>
            <span className="text-xs text-gray-300">JPG, PNG, WebP · max {MAX_MB} MB</span>
          </button>
        )}

        {/* Upload spinner overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            <span className="text-xs text-gray-600 font-medium">Uploading…</span>
          </div>
        )}
      </div>

      {/* Upload button (visible when no image) */}
      {!previewSrc && !uploading && (
        <button type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-2 border border-orange-300 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
          📁 Choose Image File (max {MAX_MB} MB)
        </button>
      )}

      {/* Replace button (visible when image exists) */}
      {previewSrc && !uploading && (
        <button type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-1.5 border border-gray-200 text-gray-500 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
          🔄 Replace Image
        </button>
      )}

      {/* URL paste row */}
      {showUrl && (
        <div className="flex gap-2">
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUrlPaste()}
            placeholder="https://..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
          />
          <button type="button" onClick={handleUrlPaste}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
            Use
          </button>
        </div>
      )}

      {/* Vercel Blob URL indicator */}
      {value && value.includes('vercel-storage.com') && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          ☁️ Stored in Vercel Blob
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠️ {error}
        </p>
      )}

      {/* Hidden file input */}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
