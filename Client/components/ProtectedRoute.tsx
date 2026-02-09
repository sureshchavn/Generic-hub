import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role: User['role'];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If not logged in, redirect to login page, saving the intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // If logged in but with the wrong role, redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;