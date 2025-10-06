import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps } from '@mui/material';

interface IconifyProps {
  icon: IconifyIcon | string;
  width?: number | string;
  sx?: SxProps;
}

export default function Iconify({ icon, width = 20, sx, ...other }: IconifyProps) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
}
