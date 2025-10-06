'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SnackbarProvider } from 'notistack';
import ThemeProvider from '../theme';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>OpenSansad - Parliamentary Data Platform</title>
        <meta name="description" content="Democratizing parliamentary information with AI-powered search and analysis" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              autoHideDuration={3000}
            >
              <AuthProvider>
                {children}
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}