'use client';

import { useMemo, ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  alpha,
} from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shadows: shadows('light'),
      shape: {
        borderRadius: 12,  // OpenSansad uses rounded corners
      },
      components: {
        // Button overrides
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',      // Sentence case
              fontWeight: 600,
              borderRadius: 12,
              padding: '10px 24px',
            },
            sizeLarge: {
              padding: '12px 32px',
              fontSize: '1rem',
            },
            contained: {
              boxShadow: `0 8px 16px ${alpha('#B55A3C', 0.24)}`,
              '&:hover': {
                boxShadow: `0 12px 24px ${alpha('#B55A3C', 0.32)}`,
              },
            },
          },
        },

        // Card overrides
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(46, 46, 46, 0.06)',
              border: '1px solid rgba(145, 158, 171, 0.12)',
            },
          },
        },

        // TextField overrides
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
          },
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: 12,
              },
            },
          },
        },

        // Paper overrides
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },

        // List overrides
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              marginBottom: 4,
              '&.Mui-selected': {
                backgroundColor: alpha('#B55A3C', 0.08),
                borderLeft: '3px solid #B55A3C',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: alpha('#B55A3C', 0.12),
                },
              },
            },
          },
        },
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
