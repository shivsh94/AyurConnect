import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, isDoctor, isPatient, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => {
      if (role === 'doctor') return isDoctor;
      if (role === 'patient') return isPatient;
      return false;
    });

    if (!hasRequiredRole) {
      // Redirect to appropriate dashboard based on user role
      if (isDoctor) {
        return <Navigate to="/doctor/Docdashboard" replace />;
      } else {
        return <Navigate to="/patient/dashboard" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute; 