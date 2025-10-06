'use client';

import { ReactNode } from 'react';
import { Box, Container, Card, Stack, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
  subtitle?: string;
}

export default function AuthLayout({ children, subtitle = 'Parliamentary Data Platform' }: AuthLayoutProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        // OpenSansad warm gradient background
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.9)} 0%, 
          ${alpha(theme.palette.secondary.dark, 0.8)} 100%
        )`,
        py: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} alignItems="center" mb={4}>
          {/* Logo */}
          <Box
            onClick={() => router.push('/')}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
                mb: 1,
              }}
            >
              OpenSansad
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>

        <Card
          sx={{
            p: 4,
            boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.16)}`,
            borderRadius: 3,
          }}
        >
          {children}
        </Card>
      </Container>
    </Box>
  );
}
