import React, { createContext, useContext, useState, useCallback } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DEMO_USER = 'admin';
  const DEMO_PASS = 'admin123';
  const DEMO_TOKEN = 'demo-local-token';

  const loginDemo = (username, password) => {
    if (username === DEMO_USER && password === DEMO_PASS) {
      const adminData = { username: DEMO_USER, role: 'superadmin' };
      setToken(DEMO_TOKEN);
      setAdmin(adminData);
      localStorage.setItem('adminToken', DEMO_TOKEN);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    // Use demo login if no API URL is configured or if it is a placeholder
    if (!apiUrl || apiUrl === 'undefined') {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.data.token);
      setAdmin(data.data);
      localStorage.setItem('adminToken', data.data.token);

      return { success: true };
    } catch (err) {
      // If network error (backend down), fall back to demo credentials
      if (err instanceof TypeError && err.message.includes('fetch')) {
        const result = loginDemo(username, password);
        if (result.success) return result;
      }
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
  }, []);

  const getMe = useCallback(async () => {
    if (!token) return;

    // Demo token — restore admin from localStorage without API call
    if (token === DEMO_TOKEN) {
      try {
        const stored = localStorage.getItem('adminUser');
        if (stored) setAdmin(JSON.parse(stored));
      } catch {}
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setAdmin(data.data);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  }, [token, logout]);

  const value = {
    admin,
    token,
    loading,
    error,
    login,
    logout,
    getMe,
    isAuthenticated: !!token,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
