import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (config, showToast = true) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      
      if (showToast && response.data.message) {
        toast.success(response.data.message);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (showToast) {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, config = {}, showToast = false) => {
    return apiCall({ ...config, method: 'GET', url }, showToast);
  }, [apiCall]);

  const post = useCallback((url, data = {}, config = {}, showToast = true) => {
    return apiCall({ ...config, method: 'POST', url, data }, showToast);
  }, [apiCall]);

  const put = useCallback((url, data = {}, config = {}, showToast = true) => {
    return apiCall({ ...config, method: 'PUT', url, data }, showToast);
  }, [apiCall]);

  const del = useCallback((url, config = {}, showToast = true) => {
    return apiCall({ ...config, method: 'DELETE', url }, showToast);
  }, [apiCall]);

  return {
    loading,
    error,
    apiCall,
    get,
    post,
    put,
    delete: del
  };
}; 