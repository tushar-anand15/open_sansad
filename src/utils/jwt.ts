import axios from './axios';

// Helper function to check if token is valid (basic check)
export const isValidToken = (token: string): boolean => {
  if (!token) {
    return false;
  }
  // For Django Token auth, tokens don't expire by default
  // You can add additional validation here if needed
  return true;
};

// Set session token in axios headers
export const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem('parliament_token', token);
    axios.defaults.headers.common.Authorization = `Token ${token}`;
  } else {
    localStorage.removeItem('parliament_token');
    delete axios.defaults.headers.common.Authorization;
  }
};
