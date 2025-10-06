'use client';

import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { getOpenSansadNavigation } from '../../../config/navigation';
import { useAuth } from '../../../hooks/useAuth';
import EmptyState from '../../../components/shared/EmptyState';
import { Settings } from '@mui/icons-material';

export default function SettingsPage() {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <DashboardLayout
      sidebarTitle="OpenSansad"
      sidebarSubtitle="Parliamentary Data Platform"
      navigationItems={getOpenSansadNavigation(handleLogout)}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
              mb: 1,
              color: 'text.primary',
            }}
          >
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account preferences and notifications
          </Typography>
        </Box>

        {/* Coming Soon */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <EmptyState
              icon={<Settings />}
              title="Settings Coming Soon"
              description="Configure your preferences, notifications, API access, and more."
            />
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
