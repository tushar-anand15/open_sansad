'use client';

import { useMediaQuery, Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Query = 'up' | 'down' | 'between' | 'only';

export default function useResponsive(query: Query, key: Breakpoint, start?: Breakpoint, end?: Breakpoint) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(key));
  const mediaDown = useMediaQuery(theme.breakpoints.down(key));
  const mediaBetween = useMediaQuery(theme.breakpoints.between(start || key, end || key));
  const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  if (query === 'only') {
    return mediaOnly;
  }

  return false;
}

// Legacy hook for backwards compatibility
export function useResponsiveLegacy() {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
