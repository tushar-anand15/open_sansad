import { alpha } from '@mui/material/styles';

// OpenSansad Color System
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#E8D4CF',   // Light terracotta
  light: '#C98978',     // Soft brick
  main: '#B55A3C',      // Muted brick - PRIMARY BRAND COLOR
  dark: '#8B3E25',      // Deep brick
  darker: '#6B2E1A',    // Dark terracotta
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F5EDD9',   // Pale gold
  light: '#F0DFB3',     // Light mustard
  main: '#E6C07C',      // Soft mustard - ACCENT COLOR
  dark: '#D4A855',      // Golden mustard
  darker: '#B8883A',    // Deep gold
  contrastText: '#2E2E2E',
};

const INFO = {
  lighter: '#E3F2FD',
  light: '#90CAF9',
  main: '#5C9FCF',      // Parliamentary blue
  dark: '#2E5C8A',
  darker: '#1A3652',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E5EBE3',
  light: '#B5C8AF',
  main: '#7A8F6F',      // Sage green
  dark: '#5A6B52',
  darker: '#3F4B39',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FEF3C7',
  light: '#FCD34D',
  main: '#F59E0B',
  dark: '#D97706',
  darker: '#B45309',
  contrastText: '#2E2E2E',
};

const ERROR = {
  lighter: '#FEE2E2',
  light: '#FCA5A5',
  main: '#EF4444',
  dark: '#DC2626',
  darker: '#B91C1C',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light' as const,
    text: {
      primary: '#2E2E2E',   // Charcoal
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { 
      paper: '#FFFFFF',     // Pure white - CARDS
      default: '#FAF5EE',   // Off-white - MAIN BACKGROUND
      neutral: '#D8C4B6',   // Sandstone - PANELS
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark' as const,
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: '#2E2E2E',   // Charcoal
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return themeMode === 'light' ? light : dark;
}
