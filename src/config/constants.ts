// App Constants for OpenSansad

export const APP_NAME = 'OpenSansad';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Parliamentary Data Platform';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const API_WS_URL = process.env.NEXT_PUBLIC_API_WS_URL || 'ws://localhost:8000/ws';

// Authentication
export const TOKEN_KEY = 'parliament_token';
export const USER_KEY = 'parliament_user';

// Pagination
export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 100;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  DATA_EXPLORER: '/dashboard/data-explorer',
  SANSAD_BUDDY: '/dashboard/sansad-buddy',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
};

// Lok Sabha numbers available
export const LOK_SABHA_NUMBERS = ['15', '16', '17', '18'];

// Question types
export const QUESTION_TYPES = ['STARRED', 'UNSTARRED'];

// Debate statuses
export const DEBATE_STATUSES = ['pending', 'completed', 'failed'];

// User types
export const USER_TYPES = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'journalist', label: 'Journalist' },
  { value: 'student', label: 'Student' },
];
