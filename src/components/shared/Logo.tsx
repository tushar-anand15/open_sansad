'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: number;
  withText?: boolean;
}

export default function Logo({ variant = 'color', size = 40, withText = true }: LogoProps) {
  const theme = useTheme();

  const getColor = () => {
    switch (variant) {
      case 'light':
        return '#FFFFFF';
      case 'dark':
        return theme.palette.text.primary;
      case 'color':
      default:
        return theme.palette.primary.main;
    }
  };

  const color = getColor();
  const textColor = variant === 'light' ? '#FFFFFF' : theme.palette.text.primary;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: withText ? 1.5 : 0,
      }}
    >
      {/* Parliament-inspired Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base/Foundation */}
        <rect x="10" y="80" width="80" height="8" fill={color} opacity="0.9" />
        
        {/* Columns - representing pillars of democracy */}
        <rect x="15" y="45" width="8" height="35" fill={color} opacity="0.85" />
        <rect x="32" y="45" width="8" height="35" fill={color} opacity="0.85" />
        <rect x="49" y="45" width="8" height="35" fill={color} opacity="0.85" />
        <rect x="66" y="45" width="8" height="35" fill={color} opacity="0.85" />
        <rect x="83" y="45" width="8" height="35" fill={color} opacity="0.85" />
        
        {/* Capitol Dome */}
        <ellipse cx="50" cy="30" rx="35" ry="15" fill={color} opacity="0.7" />
        
        {/* Dome Top */}
        <circle cx="50" cy="30" r="12" fill={color} />
        
        {/* Flag/Spire */}
        <rect x="48" y="12" width="4" height="18" fill={color} />
        <path d="M52 12 L52 20 L60 16 Z" fill={color} opacity="0.8" />
        
        {/* Entrance/Door - representing accessibility */}
        <rect x="44" y="65" width="12" height="15" fill={theme.palette.background.default} opacity="0.9" />
        
        {/* Windows/Transparency symbols */}
        <circle cx="25" cy="60" r="2" fill={theme.palette.background.default} opacity="0.7" />
        <circle cx="75" cy="60" r="2" fill={theme.palette.background.default} opacity="0.7" />
      </svg>

      {withText && (
        <Box
          component="span"
          sx={{
            fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
            fontSize: size * 0.5,
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.02em',
          }}
        >
          OpenSansad
        </Box>
      )}
    </Box>
  );
}
