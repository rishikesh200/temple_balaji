import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminData } from '../contexts/AdminDataContext';
import { DEFAULT_THEME, TOKEN_TO_CSS, applyThemeToDOM, resetThemeFromDOM } from '../../contexts/ThemeContext';

// Inject theme into iframe DOM directly (same-origin)
function applyThemeToIframe(iframe, theme) {
  try {
    const root = iframe?.contentDocument?.documentElement;
    if (!root) return;
    // Hide iframe's own scrollbar — outer container handles scrolling
    root.style.overflow = 'hidden';
    Object.entries(TOKEN_TO_CSS).forEach(([key, cssVar]) => {
      if (theme[key]) root.style.setProperty(cssVar, theme[key]);
    });
  } catch {
    // cross-origin guard — silently ignore
  }
}

// ─── Presets ──────────────────────────────────────────────────────────────────
const PRESETS = [
  {
    name: 'Classic Maroon',
    emoji: '🛕',
    desc: 'Original temple theme',
    swatch: '#8B1A1A',
    theme: { ...DEFAULT_THEME },
  },
  {
    name: 'Deep Crimson',
    emoji: '🔴',
    desc: 'Richer, darker red',
    swatch: '#7B0D0D',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#7B0D0D',       btnBgHover: '#5C0A0A',
      maroon: '#7B0D0D',      maroonDark: '#2E0505',  maroonHover: '#5C0A0A',
      maroonLight: '#ffc8c8', maroonShadow: '#0F0101',
      gold: '#C9A227',        goldLight: '#DDB84F',   goldDeep: '#A8841A',
    },
  },
  {
    name: 'Royal Blue',
    emoji: '👑',
    desc: 'Regal royal blue',
    swatch: '#1A3A8B',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#1A3A8B',         btnBgHover: '#142E6B',
      maroon: '#1A3A8B',        maroonDark: '#0A1A3A',  maroonHover: '#142E6B',
      maroonLight: '#d4dcff',   maroonShadow: '#050A1E',
      gold: '#D4AF37',          goldLight: '#E8C86A',   goldDeep: '#B8922A',
      earthDark: '#101840',     earthMedium: '#234080',
      parchment: '#F3F5FD',     parchmentSoft: '#E0E6F5',
      peachLight: '#EEF1FF',    borderWarm: '#C5CEDD',
      grayWarmLight: '#DDE3EF', grayWarmMedium: '#6A72A0',
    },
  },
  {
    name: 'Ocean Blue',
    emoji: '🌊',
    desc: 'Calm ocean tones',
    swatch: '#0E6B8B',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#0E6B8B',         btnBgHover: '#0A4F6B',
      maroon: '#0E6B8B',        maroonDark: '#042030',  maroonHover: '#0A4F6B',
      maroonLight: '#c8eeff',   maroonShadow: '#010810',
      gold: '#E8B84D',          goldLight: '#F0CA7A',   goldDeep: '#C99B35',
      earthDark: '#0A2830',     earthMedium: '#155A6B',
      parchment: '#F0F8FC',     parchmentSoft: '#DDF0F5',
      peachLight: '#E5F5FA',    borderWarm: '#B8D8E5',
      grayWarmLight: '#D5E8EF', grayWarmMedium: '#5A7A85',
    },
  },
  {
    name: 'Navy Devotion',
    emoji: '🌌',
    desc: 'Deep navy blue',
    swatch: '#1B2A6B',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#1B2A6B',         btnBgHover: '#131F50',
      maroon: '#1B2A6B',        maroonDark: '#080D20',  maroonHover: '#131F50',
      maroonLight: '#d0d8ff',   maroonShadow: '#030510',
      gold: '#F0C040',          goldLight: '#F8D870',   goldDeep: '#C89A20',
      earthDark: '#0D1230',     earthMedium: '#2A3A80',
      parchment: '#F2F4FD',     parchmentSoft: '#E2E6F5',
      peachLight: '#EDF0FF',    borderWarm: '#C0C8E5',
      grayWarmLight: '#D8DCF0', grayWarmMedium: '#6068A0',
    },
  },
  {
    name: 'Sapphire Sacred',
    emoji: '💎',
    desc: 'Bright sapphire blue',
    swatch: '#1E5FA3',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#1E5FA3',         btnBgHover: '#164878',
      maroon: '#1E5FA3',        maroonDark: '#091E35',  maroonHover: '#164878',
      maroonLight: '#C8DEFF',   maroonShadow: '#020810',
      gold: '#FFD700',          goldLight: '#FFE54C',   goldDeep: '#C8A800',
      earthDark: '#0A1A30',     earthMedium: '#1D4080',
      parchment: '#F0F5FC',     parchmentSoft: '#DDE8F5',
      peachLight: '#E5EEFF',    borderWarm: '#B8CCDF',
      grayWarmLight: '#D5E0EE', grayWarmMedium: '#5878A0',
    },
  },
  {
    name: 'Midnight Blue',
    emoji: '🌙',
    desc: 'Dark midnight blue',
    swatch: '#0D1B4B',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#0D1B4B',         btnBgHover: '#081235',
      maroon: '#0D1B4B',        maroonDark: '#040818',  maroonHover: '#081235',
      maroonLight: '#C8D0F5',   maroonShadow: '#010208',
      gold: '#E8C040',          goldLight: '#F5D870',   goldDeep: '#C09820',
      earthDark: '#050A20',     earthMedium: '#1A2858',
      parchment: '#F0F2FA',     parchmentSoft: '#E0E4F5',
      peachLight: '#EAEDFF',    borderWarm: '#C0C5E0',
      grayWarmLight: '#D5D8EE', grayWarmMedium: '#5560A0',
    },
  },
  {
    name: 'Teal Temple',
    emoji: '🏛️',
    desc: 'Cool teal-blue',
    swatch: '#0D7A6B',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#0D7A6B',         btnBgHover: '#095C50',
      maroon: '#0D7A6B',        maroonDark: '#042820',  maroonHover: '#095C50',
      maroonLight: '#C8F0E8',   maroonShadow: '#010F0A',
      gold: '#D4A827',          goldLight: '#E8C055',   goldDeep: '#B08020',
      earthDark: '#042018',     earthMedium: '#0F5C48',
      parchment: '#F0FCF8',     parchmentSoft: '#DCF5EE',
      peachLight: '#E5FAF2',    borderWarm: '#B5DDD5',
      grayWarmLight: '#D0EDE8', grayWarmMedium: '#508070',
    },
  },
  {
    name: 'Forest Sacred',
    emoji: '🌿',
    desc: 'Earthy forest green',
    swatch: '#2D6B1A',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#2D6B1A',         btnBgHover: '#215010',
      maroon: '#2D6B1A',        maroonDark: '#0F2508',  maroonHover: '#215010',
      maroonLight: '#D4F0C8',   maroonShadow: '#040F02',
      gold: '#D4AF37',          goldLight: '#E8C86A',   goldDeep: '#B8922A',
      earthDark: '#0F2008',     earthMedium: '#2D5018',
      parchment: '#F3FCF0',     parchmentSoft: '#E0F5D8',
      peachLight: '#EDFAE5',    borderWarm: '#C0DDB8',
      grayWarmLight: '#D5EDD0', grayWarmMedium: '#607855',
    },
  },
  {
    name: 'Saffron Dawn',
    emoji: '🌅',
    desc: 'Warm saffron-orange',
    swatch: '#B85C00',
    theme: {
      ...DEFAULT_THEME,
      btnBg: '#B85C00',         btnBgHover: '#8A4300',
      maroon: '#B85C00',        maroonDark: '#3A1800',  maroonHover: '#8A4300',
      maroonLight: '#FFE0C0',   maroonShadow: '#150800',
      gold: '#FFB400',          goldLight: '#FFCD55',   goldDeep: '#CC8C00',
      earthDark: '#2A1000',     earthMedium: '#7A3800',
      parchment: '#FFF8F0',     parchmentSoft: '#FFE8CC',
      peachLight: '#FFF0E0',    borderWarm: '#E5C8A0',
      grayWarmLight: '#EEE0D0', grayWarmMedium: '#906040',
    },
  },
];

// ─── Color picker row ─────────────────────────────────────────────────────────
function ColorRow({ label, tokenKey, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded border border-gray-300 shadow-inner"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={e => onChange(tokenKey, e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
          title={value}
        />
        <span className="text-xs font-mono text-gray-500 w-16">{value}</span>
      </div>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ThemeControlsPage() {
  const { theme: savedTheme, updateTheme } = useAdminData();
  const [current, setCurrent] = useState({ ...DEFAULT_THEME });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const iframeRef = useRef(null);

  // Seed form from DB when data loads
  useEffect(() => {
    if (savedTheme && Object.keys(savedTheme).length > 0) {
      setCurrent({ ...DEFAULT_THEME, ...savedTheme });
    }
  }, [savedTheme]);

  // Every time current changes: update main page + iframe instantly
  useEffect(() => {
    applyThemeToDOM(current);                          // main page live update
    applyThemeToIframe(iframeRef.current, current);    // iframe live update
  }, [current]);

  const refreshIframe = () => {
    if (iframeRef.current) iframeRef.current.src = '/';
  };

  // Map outer container scroll → iframe internal scroll (1:1 ratio)
  const handlePreviewScroll = (e) => {
    try {
      const outer = e.currentTarget;
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      const iframeDoc = iframe.contentDocument;
      const maxInner = (iframeDoc.body.scrollHeight || 5000) - 900;
      const maxOuter = outer.scrollHeight - outer.clientHeight;
      const ratio = maxOuter > 0 ? outer.scrollTop / maxOuter : 0;
      iframe.contentWindow.scrollTo({ top: ratio * maxInner, behavior: 'instant' });
    } catch { /* cross-origin guard */ }
  };

  const set = (key, val) => {
    setActivePreset(null);
    setCurrent(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const applyPreset = (preset, idx) => {
    setActivePreset(idx);
    setCurrent({ ...preset.theme });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateTheme(current);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setCurrent({ ...DEFAULT_THEME });
    resetThemeFromDOM();
    setActivePreset(0);
    setSaved(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-screen-xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🎨 Theme Controls</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customize site colors. Changes apply live — save to persist across all visitors.
          </p>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── Left panel: controls ── */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-0">

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Presets
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p, i)}
                    title={`${p.name} — ${p.desc}`}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all text-center ${
                      activePreset === i
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                      style={{ background: p.swatch }}
                    />
                    <span className="text-[10px] leading-tight text-gray-600 font-medium">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            {/* Primary Brand */}
            <Section title="Primary Brand">
              <ColorRow label="Primary (Maroon)"    tokenKey="maroon"       value={current.maroon}       onChange={set} />
              <ColorRow label="Primary Dark"        tokenKey="maroonDark"   value={current.maroonDark}   onChange={set} />
              <ColorRow label="Primary Hover"       tokenKey="maroonHover"  value={current.maroonHover}  onChange={set} />
              <ColorRow label="Primary Light Tint"  tokenKey="maroonLight"  value={current.maroonLight}  onChange={set} />
              <ColorRow label="Primary Shadow"      tokenKey="maroonShadow" value={current.maroonShadow} onChange={set} />
            </Section>

            {/* Gold Accents */}
            <Section title="Gold Accents">
              <ColorRow label="Gold"       tokenKey="gold"      value={current.gold}      onChange={set} />
              <ColorRow label="Gold Light" tokenKey="goldLight" value={current.goldLight} onChange={set} />
              <ColorRow label="Gold Deep"  tokenKey="goldDeep"  value={current.goldDeep}  onChange={set} />
            </Section>

            {/* Buttons */}
            <Section title="Buttons">
              <ColorRow label="Button Background"   tokenKey="btnBg"       value={current.btnBg}       onChange={set} />
              <ColorRow label="Button Hover"        tokenKey="btnBgHover"  value={current.btnBgHover}  onChange={set} />
              <ColorRow label="Button Text"         tokenKey="btnText"     value={current.btnText}     onChange={set} />
            </Section>

            {/* Earth Tones */}
            <Section title="Earth Tones (Text)">
              <ColorRow label="Heading Text"    tokenKey="earthDark"   value={current.earthDark}   onChange={set} />
              <ColorRow label="Body Text"       tokenKey="earthMedium" value={current.earthMedium} onChange={set} />
            </Section>

            {/* Backgrounds */}
            <Section title="Backgrounds">
              <ColorRow label="Page Background"  tokenKey="parchment"     value={current.parchment}     onChange={set} />
              <ColorRow label="Card Background"  tokenKey="parchmentSoft" value={current.parchmentSoft} onChange={set} />
              <ColorRow label="Accent Panel"     tokenKey="peachLight"    value={current.peachLight}    onChange={set} />
            </Section>

            {/* Borders & Grays */}
            <Section title="Borders & Muted">
              <ColorRow label="Borders / Dividers" tokenKey="borderWarm"      value={current.borderWarm}      onChange={set} />
              <ColorRow label="Light Panel BG"     tokenKey="grayWarmLight"   value={current.grayWarmLight}   onChange={set} />
              <ColorRow label="Muted Text"         tokenKey="grayWarmMedium"  value={current.grayWarmMedium}  onChange={set} />
            </Section>

            {/* Actions */}
            <div className="flex gap-3 pt-2 pb-8">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                ↩ Reset to Default
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
              >
                {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* ── Right panel: live preview ── */}
          <div className="flex-1 sticky top-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Preview header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium ml-1">Live Preview — Homepage</span>
                </div>
                <button
                  onClick={refreshIframe}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Refresh ↻
                </button>
              </div>

              {/* Zoomed iframe
                  iframe height = 900px  →  100vh inside = 900px  →  min-h-screen hero is normal
                  scale(0.46)            →  visual size = 662 × 414px
                  outer div is 420px tall and scrollable
                  onScroll syncs outer scroll position → iframe internal window.scrollTo
                  so scrolling the outer track reveals every section of the page */}
              <div
                className="relative bg-white overflow-y-auto overflow-x-hidden"
                style={{ height: '420px' }}
                onScroll={handlePreviewScroll}
                title="Scroll to preview more sections"
              >
                {/* spacer sized to page real height (~6000px) × scale(0.46) = 2760px
                    gives the scrollbar the right travel range */}
                <div style={{ width: '662px', height: '2760px', position: 'relative' }}>
                  <iframe
                    ref={iframeRef}
                    src="/"
                    title="Site Preview"
                    onLoad={() => applyThemeToIframe(iframeRef.current, current)}
                    style={{
                      position: 'sticky',
                      top: 0,
                      left: 0,
                      width: '1440px',
                      height: '900px',
                      border: 'none',
                      transformOrigin: 'top left',
                      transform: 'scale(0.46)',
                      pointerEvents: 'none',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* Preview footer */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-400 text-center">
                Preview shows current unsaved colors. Visitors see saved colors.
              </div>
            </div>

            {/* Quick preview chips */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Swatch Check</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Btn', bg: current.btnBg, text: current.btnText },
                  { label: 'Brand', bg: current.maroon, text: '#fff' },
                  { label: 'Gold', bg: current.gold, text: current.earthDark },
                  { label: 'Page BG', bg: current.parchment, text: current.earthDark },
                  { label: 'Card BG', bg: current.parchmentSoft, text: current.earthDark },
                  { label: 'Border', bg: current.borderWarm, text: current.earthDark },
                  { label: 'Muted', bg: current.grayWarmMedium, text: '#fff' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold border border-gray-200 shadow-sm"
                    style={{ background: s.bg, color: s.text }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
