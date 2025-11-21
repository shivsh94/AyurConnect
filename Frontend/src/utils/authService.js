import axios from 'axios';

class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    this.setupAxiosInterceptors();
  }

  // Setup axios interceptors for automatic token handling
  setupAxiosInterceptors() {
    // Request interceptor - ensure credentials are included for cookie-based auth
    axios.interceptors.request.use(
      (config) => {
        // Only set withCredentials if not already set
        if (config.withCredentials === undefined) {
          config.withCredentials = true;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loops - only retry once and not for auth endpoints
        if (
          error.response?.status === 401 && 
          !originalRequest._retry &&
          !originalRequest.url?.includes('/signin') &&
          !originalRequest.url?.includes('/signup') &&
          !originalRequest.url?.includes('/refresh-token')
        ) {
          originalRequest._retry = true;

          // Try to refresh token
          try {
            const refreshed = await this.refreshToken();
            if (refreshed) {
              return axios(originalRequest);
            } else {
              // Refresh failed, logout user
              this.clearAuthData();
              if (window.location.pathname !== '/login') {
                window.location.href = '/login';
              }
            }
          } catch (refreshError) {
            // If refresh fails, logout user
            this.clearAuthData();
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Check if user is authenticated
  async checkAuthStatus() {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        return { isAuthenticated: false, user: null };
      }

      // Parse stored user data
      const userData = JSON.parse(user);
      
      // Return authenticated status based on localStorage
      // Don't make API call to /profile since it doesn't exist
      return { 
        isAuthenticated: true, 
        user: userData 
      };
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid data
      this.clearAuthData();
    }

    return { isAuthenticated: false, user: null };
  }

  // Login user
  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/v1/user/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Backend uses httpOnly cookies for JWT tokens, not response body tokens
        // Store user data with role information (backend already sends isDoctor)
        const userData = response.data.data;
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        return {
          success: true,
          user: userData,
          message: response.data.message
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await axios.post(`${this.baseURL}/api/v1/user/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Clear all authentication data
  clearAuthData() {
    localStorage.removeItem('user');
    // Tokens are in httpOnly cookies, cleared by backend on logout
  }

  // Refresh token (if implemented)
  async refreshToken() {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/v1/user/refresh-token`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        // Cookies are refreshed automatically by backend
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return false;
  }

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Check if user is a doctor
  isDoctor() {
    const user = this.getCurrentUser();
    return user?.isDoctor || false;
  }

  // Check if user is a patient
  isPatient() {
    const user = this.getCurrentUser();
    return user && !user.isDoctor;
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService; 