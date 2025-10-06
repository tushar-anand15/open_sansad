'use client';

import { useState, ReactNode } from 'react';
import { Box, IconButton, Tooltip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import DashboardSidebar, { NavigationItem } from './DashboardSidebar';
import { useResponsiveLegacy } from '../../hooks/useResponsive';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarTitle: string;
  sidebarSubtitle?: string;
  navigationItems: NavigationItem[];
  showSidebar?: boolean;
}

export default function DashboardLayout({
  children,
  sidebarTitle,
  sidebarSubtitle,
  navigationItems,
  showSidebar = true,
}: DashboardLayoutProps) {
  const theme = useTheme();
  const { isMobile } = useResponsiveLegacy();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        {showSidebar && !sidebarCollapsed && (
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '20.83%', // ~2.5/12 columns
              height: '100vh',
              flexShrink: 0,
              transition: 'all 0.3s ease',
            }}
          >
            <DashboardSidebar
              title={sidebarTitle}
              subtitle={sidebarSubtitle}
              items={navigationItems}
              collapsed={sidebarCollapsed}
              onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              isMobile={isMobile}
            />
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            width: showSidebar && !sidebarCollapsed ? '79.17%' : '100%',
            height: '100vh',
            overflow: 'auto',
            transition: 'all 0.3s ease',
            position: 'relative',
            // Custom scrollbar
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.text.primary, 0.1),
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.primary, 0.2),
              },
            },
          }}
        >
          {/* Hamburger Menu Button (when sidebar is collapsed) */}
          {showSidebar && sidebarCollapsed && (
            <Tooltip title="Open sidebar" placement="right">
              <IconButton
                onClick={() => setSidebarCollapsed(false)}
                sx={{
                  position: 'fixed',
                  top: 16,
                  left: 16,
                  zIndex: theme.zIndex.appBar,
                  bgcolor: 'background.paper',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.12)}`,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          {children}
        </Box>
      </Box>

      {/* Mobile Sidebar (overlay) */}
      {isMobile && showSidebar && !sidebarCollapsed && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: theme.zIndex.drawer,
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSidebarCollapsed(true)}
        >
          <Box
            sx={{
              width: 280,
              height: '100%',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[16],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardSidebar
              title={sidebarTitle}
              subtitle={sidebarSubtitle}
              items={navigationItems}
              collapsed={sidebarCollapsed}
              onCollapse={() => setSidebarCollapsed(true)}
              isMobile={true}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
