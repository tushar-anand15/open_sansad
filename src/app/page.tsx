'use client';

import { Box, Container, Typography, Button, Stack, Card, CardContent, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { ArrowForward, Search, Chat, Shield, Speed } from '@mui/icons-material';
import Navbar from '../components/shared/Navbar';

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: Search,
      title: 'Comprehensive Data',
      description: 'Access 50,000+ parliamentary questions, debates, and bills',
    },
    {
      icon: Chat,
      title: 'AI-Powered Chat',
      description: 'Ask natural language questions and get cited answers',
    },
    {
      icon: Shield,
      title: 'Authoritative Sources',
      description: 'Every response includes traceable source documents',
    },
    {
      icon: Speed,
      title: 'Fast & Efficient',
      description: 'RAG-powered search through millions of records',
    },
  ];

  return (
    <>
      {/* Navbar with transparent background initially */}
      <Navbar transparent />

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* Hero Section */}
        <Box
          id="home"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.9)} 0%, 
              ${alpha(theme.palette.secondary.dark, 0.8)} 100%
            )`,
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 8, md: 9 },
          }}
        >
        {/* Decorative pattern */}
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
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              OpenSansad
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 720,
                mx: 'auto',
                mb: 6,
                fontWeight: 500,
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              Democratizing Parliamentary Information with AI-Powered Search
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => router.push('/signup')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  height: 56,
                  px: 4,
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.24)}`,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 32px ${alpha(theme.palette.common.black, 0.32)}`,
                  },
                }}
              >
                Get Started Free
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => router.push('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  height: 56,
                  px: 4,
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Container>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
                  mb: 2,
                }}
              >
                About OpenSansad
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
                OpenSansad is a next-generation platform that democratizes access to parliamentary information.
                Using advanced AI and RAG (Retrieval-Augmented Generation) technology, we make it easy for
                citizens, researchers, journalists, and students to explore and understand India&apos;s parliamentary
                proceedings, debates, questions, and bills.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 6 }}>
              <Card
                sx={{
                  flex: 1,
                  p: 4,
                  textAlign: 'center',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                  50,000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Parliamentary Questions & Debates
                </Typography>
              </Card>

              <Card
                sx={{
                  flex: 1,
                  p: 4,
                  textAlign: 'center',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                  AI-Powered
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Natural Language Search & Chat
                </Typography>
              </Card>

              <Card
                sx={{
                  flex: 1,
                  p: 4,
                  textAlign: 'center',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                  100%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Traceable & Verified Sources
                </Typography>
              </Card>
            </Stack>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12 }} id="features">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif", mb: 2 }}>
              Why OpenSansad?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
              Powerful tools to explore, analyze, and understand parliamentary proceedings
            </Typography>
          </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          {features.map((feature, idx) => (
            <Card
              key={idx}
              sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <feature.icon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
          </Box>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: alpha(theme.palette.background.paper, 0.6),
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 OpenSansad. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}