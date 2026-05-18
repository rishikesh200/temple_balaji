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

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
      logout();
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
