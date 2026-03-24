import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F5F1' }}>
        <div className="w-8 h-8 border-2 border-[var(--color-brass)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return session ? <>{children}</> : <Navigate to="/admin/login" replace />;
};
