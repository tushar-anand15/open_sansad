import axios from '../utils/axios';
import { LoginCredentials, SignupData, User, UserProfile } from '../types/auth.types';

export const authService = {
  // Register new user
  register: async (data: SignupData) => {
    const response = await axios.post('/auth/register/', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post('/auth/login/', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axios.post('/auth/logout/');
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<{ user: User; profile: UserProfile }> => {
    const response = await axios.get('/auth/profile/');
    return response.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>) => {
    const response = await axios.patch('/auth/profile/', data);
    return response.data;
  },
};
