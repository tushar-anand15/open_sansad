'use client';

import { Container, Typography, Box, Card, CardContent, Stack, Chip, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { getOpenSansadNavigation } from '../../../config/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { Person, Email, Business, CalendarToday, Api, CloudDownload } from '@mui/icons-material';

export default function ProfilePage() {
  const router = useRouter();
  const { logout, user, profile } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const infoItems = [
    { icon: Person, label: 'Username', value: user?.username },
    { icon: Email, label: 'Email', value: user?.email },
    { icon: Person, label: 'Full Name', value: `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Not set' },
    { icon: Business, label: 'Organization', value: profile?.organization || 'Not specified' },
    { icon: CalendarToday, label: 'User Type', value: profile?.user_type },
  ];

  const usageItems = [
    { icon: Api, label: 'API Calls Today', value: `${profile?.api_calls_today || 0} / ${profile?.daily_api_limit || 1000}` },
    { icon: CloudDownload, label: 'Downloads This Month', value: `${profile?.downloads_this_month || 0} / ${profile?.monthly_download_limit || 500}` },
  ];

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
            Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your account information and usage statistics
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {/* Profile Information */}
          <Box>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  {infoItems.map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'action.hover',
                          color: 'text.secondary',
                        }}
                      >
                        <item.icon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {item.value || 'N/A'}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Usage Statistics */}
          <Box>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Usage Statistics
                  </Typography>
                  <Chip 
                    label={profile?.subscription_tier?.toUpperCase() || 'FREE'}
                    color="primary"
                    size="small"
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={3}>
                  {usageItems.map((item, idx) => (
                    <Box key={idx}>
                      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'action.hover',
                            color: 'text.secondary',
                          }}
                        >
                          <item.icon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {item.label}
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
