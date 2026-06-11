import React, { createContext, useContext, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Default values — mirror what's in index.css @theme
// These are ONLY used as fallback reference; CSS defaults already apply at load time.
export const DEFAULT_THEME = {
  btnBg:          '#8B1A1A',
  btnBgHover:     '#6B1414',
  btnText:        '#ffffff',
  maroon:         '#8B1A1A',
  maroonDark:     '#3A0A0A',
  maroonHover:    '#6B1414',
  maroonLight:    '#ffdad4',
  maroonShadow:   '#120502',
  gold:           '#D4AF37',
  goldLight:      '#E8C86A',
  goldDeep:       '#B8922A',
  earthDark:      '#2D1810',
  earthMedium:    '#6B4423',
  parchment:      '#FDF8F3',
  parchmentSoft:  '#F5E6D3',
  peachLight:     '#FFF3E6',
  borderWarm:     '#E5D5C5',
  grayWarmLight:  '#E8E4DF',
  grayWarmMedium: '#7A756D',
};

// Map token keys → CSS variable names
export const TOKEN_TO_CSS = {
  btnBg:          '--color-btn-bg',
  btnBgHover:     '--color-btn-bg-hover',
  btnText:        '--color-btn-text',
  maroon:         '--color-maroon',
  maroonDark:     '--color-maroon-dark',
  maroonHover:    '--color-maroon-hover',
  maroonLight:    '--color-maroon-light',
  maroonShadow:   '--color-maroon-shadow',
  gold:           '--color-gold',
  goldLight:      '--color-gold-light',
  goldDeep:       '--color-gold-deep',
  earthDark:      '--color-earth-dark',
  earthMedium:    '--color-earth-medium',
  parchment:      '--color-parchment',
  parchmentSoft:  '--color-parchment-soft',
  peachLight:     '--color-peach-light',
  borderWarm:     '--color-border-warm',
  grayWarmLight:  '--color-gray-warm-light',
  grayWarmMedium: '--color-gray-warm-medium',
};

// Apply a theme object to :root CSS variables
export function applyThemeToDOM(theme) {
  const root = document.documentElement;
  Object.entries(TOKEN_TO_CSS).forEach(([key, cssVar]) => {
    if (theme[key]) root.style.setProperty(cssVar, theme[key]);
  });
}

// Reset :root overrides — CSS @theme defaults take over
export function resetThemeFromDOM() {
  const root = document.documentElement;
  Object.values(TOKEN_TO_CSS).forEach(cssVar => root.style.removeProperty(cssVar));
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  useEffect(() => {
    fetch(`${API_URL}/api/config`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.theme && Object.keys(data.theme).length > 0) {
          applyThemeToDOM(data.theme);
        }
        // No theme saved → CSS @theme defaults in index.css stay as-is
      })
      .catch(() => {
        // Backend unavailable → CSS defaults stay as-is, nothing breaks
      });
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
