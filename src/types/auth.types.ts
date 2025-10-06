export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
}

export interface UserProfile {
  user_type: 'citizen' | 'researcher' | 'journalist' | 'student';
  organization?: string;
  subscription_tier: 'free' | 'premium' | 'enterprise';
  api_calls_today: number;
  daily_api_limit: number;
  downloads_this_month: number;
  monthly_download_limit: number;
}

export interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  organization?: string;
}
