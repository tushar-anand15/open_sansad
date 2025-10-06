'use client';

import { createContext, useEffect, useReducer, useCallback, useMemo, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { AuthState, User, UserProfile, LoginCredentials, SignupData } from '../types/auth.types';
import localStorageAvailable from '../utils/localStorageAvailable';
import { isValidToken, setSession } from '../utils/jwt';

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  profile: null,
};

type AuthAction =
  | { type: 'INITIAL'; payload: { isAuthenticated: boolean; user: User | null; profile: UserProfile | null } }
  | { type: 'LOGIN'; payload: { user: User; profile: UserProfile } }
  | { type: 'REGISTER'; payload: { user: User; profile: UserProfile } }
  | { type: 'LOGOUT' };

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
      };
    default:
      return state;
  }
};

interface AuthContextValue extends AuthState {
  method: 'jwt';
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  // Initialize auth on mount
  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('parliament_token') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const profileData = await authService.getProfile();

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: profileData.user,
            profile: profileData.profile,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
            profile: null,
          },
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
          profile: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    const { token } = response;

    if (storageAvailable) {
      localStorage.setItem('parliament_token', token);
    }
    setSession(token);

    // Fetch user profile after login
    const profileData = await authService.getProfile();

    dispatch({
      type: 'LOGIN',
      payload: {
        user: profileData.user,
        profile: profileData.profile,
      },
    });
  }, [storageAvailable]);

  // Register
  const register = useCallback(async (data: SignupData) => {
    const response = await authService.register(data);
    const { token } = response;

    if (storageAvailable) {
      localStorage.setItem('parliament_token', token);
    }
    setSession(token);

    // Fetch user profile after registration
    const profileData = await authService.getProfile();

    dispatch({
      type: 'REGISTER',
      payload: {
        user: profileData.user,
        profile: profileData.profile,
      },
    });
  }, [storageAvailable]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setSession(null);
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Update user profile
  const updateUser = useCallback(async () => {
    const profileData = await authService.getProfile();
    dispatch({
      type: 'LOGIN',
      payload: {
        user: profileData.user,
        profile: profileData.profile,
      },
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      profile: state.profile,
      method: 'jwt' as const,
      login,
      register,
      logout,
      updateUser,
    }),
    [state, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
