import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from './contexts/AdminContext';
import { ToastProvider } from './components/Toast';
import { ConfirmProvider } from './components/ConfirmDialog';

export const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, token } = useAdmin();

  if (!isAuthenticated && !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <ToastProvider>
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </ToastProvider>
  );
};
