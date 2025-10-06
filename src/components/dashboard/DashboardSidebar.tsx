'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Stack,
  Collapse,
  Chip,
  Divider,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode | null;
  path?: string;
  onClick?: () => void;
  badge?: number | string;
  children?: NavigationItem[];
}

interface DashboardSidebarProps {
  title: string;
  subtitle?: string;
  items: NavigationItem[];
  collapsed: boolean;
  onCollapse: () => void;
  isMobile?: boolean;
  currentPath?: string;
}

export default function DashboardSidebar({
  title,
  subtitle,
  items,
  collapsed,
  onCollapse,
  isMobile = false,
  currentPath,
}: DashboardSidebarProps) {
  const theme = useTheme();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      router.push(item.path);
      if (isMobile) {
        onCollapse();
      }
    } else if (item.children) {
      toggleExpanded(item.id);
    }
  };

  const isActive = (item: NavigationItem): boolean => {
    // Use window.location.pathname as fallback since router.pathname doesn't exist in App Router
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    if (!item.path) return false;
    return path === item.path || path.startsWith(item.path + '/');
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    // Divider
    if (!item.icon && !item.label) {
      return <Divider key={item.id} sx={{ my: 1 }} />;
    }

    const active = isActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <Box key={item.id}>
        <ListItemButton
          selected={active}
          onClick={() => handleItemClick(item)}
          sx={{
            py: 1.5,
            px: 2 + depth,
            borderRadius: 1,
            mb: 0.5,
            borderLeft: active ? '3px solid' : '3px solid transparent',
            borderColor: active ? 'primary.main' : 'transparent',
            bgcolor: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.04),
            },
            transition: 'all 0.2s ease',
          }}
        >
          {item.icon && (
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: active ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
          )}

          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: active ? 600 : 400,
              fontSize: '0.9375rem',
            }}
          />

          {item.badge !== undefined && (
            <Chip
              label={item.badge}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.75rem',
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: 'primary.dark',
              }}
            />
          )}

          {hasChildren && (
            <Box sx={{ ml: 1 }}>
              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </Box>
          )}
        </ListItemButton>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'primary.main',
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          <IconButton onClick={onCollapse} size="small" sx={{ ml: 1 }}>
            {isMobile ? <CloseIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Stack>
      </Box>

      {/* Navigation List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          // Custom scrollbar
          '&::-webkit-scrollbar': {
            width: '6px',
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
        <List disablePadding>
          {items.map((item) => renderNavItem(item))}
        </List>
      </Box>
    </Box>
  );
}
