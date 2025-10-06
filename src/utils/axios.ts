import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('parliament_token') : null;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('parliament_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Token ${token}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('parliament_token', token);
    }
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('parliament_token');
    }
  }
};
