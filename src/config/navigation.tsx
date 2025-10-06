import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { NavigationItem } from '../components/dashboard/DashboardSidebar';

export const getOpenSansadNavigation = (onLogout: () => void): NavigationItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    id: 'divider-1',
    label: '',
    icon: null,
  },
  {
    id: 'data-explorer',
    label: 'Data Explorer',
    icon: <SearchIcon />,
    path: '/dashboard/data-explorer',
  },
  {
    id: 'sansad-buddy',
    label: 'SansadBuddy',
    icon: <ChatIcon />,
    path: '/dashboard/sansad-buddy',
  },
  {
    id: 'divider-2',
    label: '',
    icon: null,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/dashboard/settings',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <PersonIcon />,
    path: '/dashboard/profile',
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogoutIcon />,
    onClick: onLogout,
  },
];
