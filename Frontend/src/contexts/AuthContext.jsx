import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/login/loginSlice';
import authService from '../utils/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);

  // Check authentication status on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is already logged in from localStorage
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          // Verify token with backend
          const { isAuthenticated, user } = await authService.checkAuthStatus();
          
          if (isAuthenticated && user) {
            dispatch(login(user));
          } else {
            // Token is invalid, clear stored data
            authService.clearAuthData();
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.clearAuthData();
        dispatch(logout());
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Login function
  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      const result = await authService.login(email, password);
      
      if (result.success) {
        dispatch(login(result.user));
        toast.success(result.message);
        return { success: true, user: result.user };
      } else {
        toast.error(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return { success: false, message: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logoutUser = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local data
      authService.clearAuthData();
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!currentUser;

  // Check if user is a doctor
  const isDoctor = currentUser?.isDoctor || false;

  // Check if user is a patient
  const isPatient = currentUser && !currentUser.isDoctor;

  const value = {
    currentUser,
    isAuthenticated,
    isDoctor,
    isPatient,
    isLoading,
    isInitialized,
    loginUser,
    logoutUser,
    checkAuthStatus: authService.checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 