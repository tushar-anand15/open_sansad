import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export default function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      {icon && (
        <Box sx={{ mb: 3, color: 'text.disabled', '& > *': { fontSize: 64 } }}>
          {icon}
        </Box>
      )}
      
      <Typography variant="h6" gutterBottom color="text.secondary">
        {title}
      </Typography>
      
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          {description}
        </Typography>
      )}
      
      {action}
    </Box>
  );
}
