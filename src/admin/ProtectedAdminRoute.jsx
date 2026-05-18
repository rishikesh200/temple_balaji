import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from './contexts/AdminContext';

export const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, token } = useAdmin();

  if (!isAuthenticated && !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
