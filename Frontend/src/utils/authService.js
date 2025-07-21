import axios from 'axios';

class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    this.setupAxiosInterceptors();
  }

  // Setup axios interceptors for automatic token handling
  setupAxiosInterceptors() {
    // Request interceptor to add token to headers
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Try to refresh token
          try {
            const refreshed = await this.refreshToken();
            if (refreshed) {
              const token = localStorage.getItem('token');
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, logout user
            this.logout();
            window.location.href = '/login';
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
      const token = localStorage.getItem('token');
      if (!token) {
        return { isAuthenticated: false, user: null };
      }

      const response = await axios.get(`${this.baseURL}/api/v1/user/me`, {
        withCredentials: true
      });

      if (response.data.success) {
        return { 
          isAuthenticated: true, 
          user: response.data.user 
        };
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
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
        // Store token in localStorage for axios interceptor
        localStorage.setItem('token', response.data.token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return {
          success: true,
          user: response.data.user,
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
      await axios.post(`${this.baseURL}/api/v1/user/signout`, {}, {
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }

  // Refresh token (if implemented)
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const response = await axios.post(
        `${this.baseURL}/api/v1/user/refresh-token`,
        { refreshToken },
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
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