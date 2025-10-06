'use client';

import { Container, Typography, Box, Card, CardContent, Stack, Chip, Paper, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { getOpenSansadNavigation } from '../../../config/navigation';
import { useAuth } from '../../../hooks/useAuth';
import EmptyState from '../../../components/shared/EmptyState';
import { Chat, AutoAwesome, Source, Speed } from '@mui/icons-material';

export default function SansadBuddyPage() {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const features = [
    {
      icon: AutoAwesome,
      color: theme.palette.primary.main,
      title: 'AI-Powered Responses',
      description: 'Get intelligent answers based on parliamentary records',
    },
    {
      icon: Source,
      color: theme.palette.secondary.main,
      title: 'Source Citations',
      description: 'Every response includes traceable source documents',
    },
    {
      icon: Speed,
      color: theme.palette.info.main,
      title: 'Fast & Accurate',
      description: 'RAG-powered search through millions of documents',
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
            SansadBuddy
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your AI assistant for parliamentary information
          </Typography>
        </Box>

        {/* Coming Soon Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <EmptyState
              icon={<Chat />}
              title="SansadBuddy Chat Coming Soon"
              description="Conversational AI interface powered by RAG (Retrieval-Augmented Generation) for querying parliamentary data with authoritative, traceable responses."
            />
          </CardContent>
        </Card>

        {/* Features Overview */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            What You Can Do with SansadBuddy
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {features.map((feature, idx) => (
              <Paper
                key={idx}
                sx={{
                  p: 3,
                  height: '100%',
                  border: `1px solid ${alpha(feature.color, 0.12)}`,
                  bgcolor: alpha(feature.color, 0.04),
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(feature.color, 0.12),
                      color: feature.color,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Example Queries */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Example Queries
          </Typography>
          <Stack spacing={1.5}>
            {[
              'What bills were discussed in the last session?',
              'Show me all questions related to education policy',
              'What did the Finance Minister say about the budget?',
              'Find debates about climate change from 2023',
              'Which members asked the most questions this year?',
            ].map((query, idx) => (
              <Chip
                key={idx}
                label={query}
                sx={{
                  justifyContent: 'flex-start',
                  height: 'auto',
                  py: 1.5,
                  px: 2,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '& .MuiChip-label': {
                    whiteSpace: 'normal',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
