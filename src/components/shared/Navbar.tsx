'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  alpha,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import useResponsive from '../../hooks/useResponsive';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useResponsive('down', 'md');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll for navbar background
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const isTransparent = transparent && !trigger;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '#about' },
    { label: 'Features', path: '#features' },
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isTransparent ? 0 : 2}
        sx={{
          bgcolor: isTransparent
            ? alpha(theme.palette.common.black, 0.3)
            : alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          borderBottom: isTransparent
            ? 'none'
            : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: theme.transitions.create(['background-color', 'backdrop-filter', 'border-bottom'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => router.push('/')}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Logo
                variant={isTransparent ? 'light' : 'color'}
                size={isMobile ? 32 : 40}
                withText={true}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: isTransparent
                        ? 'white'
                        : theme.palette.text.primary,
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: isTransparent
                          ? alpha(theme.palette.common.white, 0.1)
                          : alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/login')}
                    sx={{
                      borderColor: isTransparent
                        ? 'white'
                        : theme.palette.primary.main,
                      color: isTransparent
                        ? 'white'
                        : theme.palette.primary.main,
                      fontWeight: 600,
                      px: 3,
                      '&:hover': {
                        borderColor: isTransparent
                          ? 'white'
                          : theme.palette.primary.dark,
                        bgcolor: isTransparent
                          ? alpha(theme.palette.common.white, 0.1)
                          : alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push('/signup')}
                    sx={{
                      bgcolor: isTransparent
                        ? 'white'
                        : theme.palette.primary.main,
                      color: isTransparent
                        ? theme.palette.primary.main
                        : 'white',
                      fontWeight: 600,
                      px: 3,
                      boxShadow: isTransparent
                        ? `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`
                        : 'none',
                      '&:hover': {
                        bgcolor: isTransparent
                          ? 'white'
                          : theme.palette.primary.dark,
                        boxShadow: `0 6px 16px ${alpha(theme.palette.common.black, 0.2)}`,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  color: isTransparent ? 'white' : theme.palette.text.primary,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo variant="color" size={32} withText={false} />
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ p: 2, mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              router.push('/login');
              setMobileMenuOpen(false);
            }}
            sx={{ fontWeight: 600 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              router.push('/signup');
              setMobileMenuOpen(false);
            }}
            sx={{ fontWeight: 600 }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>

      {/* Spacer to prevent content from going under fixed navbar */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
    </>
  );
}
