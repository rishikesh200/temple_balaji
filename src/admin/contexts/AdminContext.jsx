import React, { createContext, useContext, useState, useCallback } from 'react';

const AdminContext = createContext();

const IS_DEV = import.meta.env.DEV; // true in `npm run dev`, false in production build
const DEMO_TOKEN = 'demo-local-token';

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};

export const AdminProvider = ({ children }) => {
  const [admin,   setAdmin]   = useState(() => {
    // Restore admin from localStorage on page reload (demo mode only)
    if (localStorage.getItem('adminToken') === DEMO_TOKEN) {
      try { return JSON.parse(localStorage.getItem('adminUser') || 'null'); } catch { return null; }
    }
    return null;
  });
  const [token,   setToken]   = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Demo login (dev-only) ──────────────────────────────────────
  const loginDemo = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username: 'admin', role: 'superadmin' };
      setToken(DEMO_TOKEN);
      setAdmin(adminData);
      localStorage.setItem('adminToken', DEMO_TOKEN);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  // ── Real login ─────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    // Fallback to demo mode only in dev when API is not configured
    if (IS_DEV && (!apiUrl || apiUrl === 'undefined')) {
      const result = loginDemo(username, password);
      setLoading(false);
      if (!result.success) setError(result.error);
      return result;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Network succeeded but body might be empty
      const text = await response.text();
      if (!text) throw new Error('Empty response from server. Is the backend running?');

      const data = JSON.parse(text);

      if (!response.ok) throw new Error(data.message || 'Login failed');

      setToken(data.data.token);
      setAdmin(data.data);
      localStorage.setItem('adminToken', data.data.token);

      return { success: true };
    } catch (err) {
      // Network error — fallback to demo in dev only
      if (IS_DEV && err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
        const result = loginDemo(username, password);
        if (result.success) return result;
      }
      const msg = err.message || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }, []);

  const getMe = useCallback(async () => {
    if (!token) return;
    if (token === DEMO_TOKEN) {
      try {
        const stored = localStorage.getItem('adminUser');
        if (stored) setAdmin(JSON.parse(stored));
      } catch {}
      return;
    }
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setAdmin(data.data);
      else logout();
    } catch {
      // Network down — keep current session, don't force logout
    }
  }, [token, logout]);

  return (
    <AdminContext.Provider value={{
      admin, token, loading, error,
      isAuthenticated: !!token,
      isDemoMode: token === DEMO_TOKEN,
      login, logout, getMe,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
