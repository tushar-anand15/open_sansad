'use client';

import { Container, Typography, Card, CardContent, Stack, Box, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getOpenSansadNavigation } from '../../config/navigation';
import { useAuth } from '../../hooks/useAuth';
import { Search, Chat, TrendingUp, People } from '@mui/icons-material';

export default function DashboardPage() {
  const theme = useTheme();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const featuresData = [
    {
      icon: Search,
      color: theme.palette.primary.main,
      label: 'Data Explorer',
      description: 'Browse parliamentary sessions, bills, and debates with advanced filters',
      action: () => router.push('/dashboard/data-explorer'),
    },
    {
      icon: Chat,
      color: theme.palette.secondary.main,
      label: 'SansadBuddy',
      description: 'AI chatbot for parliamentary queries with source citations',
      action: () => router.push('/dashboard/sansad-buddy'),
    },
    {
      icon: TrendingUp,
      color: theme.palette.info.main,
      label: 'Analytics',
      description: 'Insights and trends from parliamentary data',
      action: () => router.push('/dashboard/analytics'),
    },
    {
      icon: People,
      color: theme.palette.success.main,
      label: 'Members',
      description: 'Directory of parliament members and their activities',
      action: () => router.push('/dashboard/members'),
    },
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
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.first_name || user?.username}! Explore parliamentary information below.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {featuresData.map((item, index) => (
            <Box key={index}>
              <Card
                onClick={item.action}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: `1px solid ${alpha(item.color, 0.12)}`,
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 12px 32px ${alpha(item.color, 0.16)}`,
                    borderColor: alpha(item.color, 0.24),
                    '& .icon-wrapper': {
                      transform: 'scale(1.1)',
                      bgcolor: alpha(item.color, 0.16),
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    {/* Icon */}
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(item.color, 0.08),
                        color: item.color,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <item.icon sx={{ fontSize: 32 }} />
                    </Box>

                    {/* Text */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Quick Stats Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Statistics
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary.main" gutterBottom>
                  50,000+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Parliamentary Questions
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h4" color="secondary.main" gutterBottom>
                  500+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Debate Sessions
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" gutterBottom>
                  4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lok Sabha Terms
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
