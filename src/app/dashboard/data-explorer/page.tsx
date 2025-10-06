'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  alpha,
  IconButton,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import {
  AccountBalance as LokSabhaIcon,
  Gavel as RajyaSabhaIcon,
  QuestionAnswer,
  Forum,
  ExpandMore,
  ArrowForward,
  ChevronLeft,
} from '@mui/icons-material';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { getOpenSansadNavigation } from '../../../config/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { Institution, ExplorerMode, ExplorerView } from '../../../types/explorer.types';
import DataExplorerTable from '../../../components/explorer/DataExplorerTable';

export default function DataExplorerPage() {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();
  const [view, setView] = useState<ExplorerView>('selection');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedMode, setSelectedMode] = useState<ExplorerMode | null>(null);
  const [expandedCard, setExpandedCard] = useState<Institution | null>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Color themes for LS (brick) and RS (green)
  const lsColors = {
    primary: theme.palette.primary.main,
    light: theme.palette.primary.light,
    lighter: '#E8D4CF', // Light terracotta from palette
    dark: theme.palette.primary.dark,
    bg: alpha(theme.palette.primary.main, 0.08),
  };

  const rsColors = {
    primary: theme.palette.success.main,
    light: theme.palette.success.light,
    lighter: '#E5EBE3', // Sage green lighter shade
    dark: theme.palette.success.dark,
    bg: alpha(theme.palette.success.main, 0.08),
  };

  const handleExplore = (institution: Institution, mode: ExplorerMode) => {
    setSelectedInstitution(institution);
    setSelectedMode(mode);
    setView('explorer');
  };

  const handleBack = () => {
    setView('selection');
    setSelectedInstitution(null);
    setSelectedMode(null);
    setExpandedCard(null);
  };

  const toggleExpand = (institution: Institution) => {
    setExpandedCard(expandedCard === institution ? null : institution);
  };

  return (
    <DashboardLayout
      sidebarTitle="OpenSansad"
      sidebarSubtitle="Parliamentary Data Platform"
      navigationItems={getOpenSansadNavigation(handleLogout)}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {view === 'selection' ? (
          <>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif",
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                Parliamentary Data Explorer
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
                Explore and analyze parliamentary questions and debates from both Houses with advanced filtering and search capabilities
              </Typography>
            </Box>

            {/* Institution Selection Cards */}
            <Box
              sx={{
                maxWidth: 1200,
                mx: 'auto',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
              }}
            >
              {/* Lok Sabha Card */}
              <Box>
                <Card
                  sx={{
                    height: '100%',
                    border: `2px solid ${lsColors.primary}`,
                    bgcolor: lsColors.bg,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 40px ${alpha(lsColors.primary, 0.2)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: lsColors.primary,
                            color: 'white',
                            mr: 2,
                          }}
                        >
                          <LokSabhaIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: lsColors.dark }}>
                            Lok Sabha
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            House of the People
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Access comprehensive data from Lok Sabha sessions 15-18, including starred and unstarred questions, debates, and proceedings.
                      </Typography>

                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <Chip
                          label="50,000+ Questions"
                          size="small"
                          sx={{
                            bgcolor: alpha(lsColors.primary, 0.15),
                            color: lsColors.dark,
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label="5,000+ Debates"
                          size="small"
                          sx={{
                            bgcolor: alpha(lsColors.primary, 0.15),
                            color: lsColors.dark,
                            fontWeight: 600,
                          }}
                        />
                      </Stack>

                      <Button
                        fullWidth
                        variant={expandedCard === 'lok_sabha' ? 'outlined' : 'contained'}
                        onClick={() => toggleExpand('lok_sabha')}
                        endIcon={
                          <ExpandMore
                            sx={{
                              transform: expandedCard === 'lok_sabha' ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s',
                            }}
                          />
                        }
                        sx={{
                          bgcolor: expandedCard === 'lok_sabha' ? 'transparent' : lsColors.primary,
                          color: expandedCard === 'lok_sabha' ? lsColors.primary : 'white',
                          borderColor: lsColors.primary,
                          fontWeight: 600,
                          py: 1.5,
                          '&:hover': {
                            bgcolor: expandedCard === 'lok_sabha' ? alpha(lsColors.primary, 0.08) : lsColors.dark,
                            borderColor: lsColors.dark,
                          },
                        }}
                      >
                        {expandedCard === 'lok_sabha' ? 'Collapse' : 'Explore Data'}
                      </Button>

                      <Collapse in={expandedCard === 'lok_sabha'} timeout="auto">
                        <Stack spacing={2} sx={{ mt: 3 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<QuestionAnswer />}
                            endIcon={<ArrowForward />}
                            onClick={() => handleExplore('lok_sabha', 'questions')}
                            sx={{
                              borderColor: lsColors.primary,
                              color: lsColors.dark,
                              py: 1.5,
                              justifyContent: 'space-between',
                              '&:hover': {
                                borderColor: lsColors.dark,
                                bgcolor: alpha(lsColors.primary, 0.05),
                              },
                            }}
                          >
                            Explore Questions
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Forum />}
                            endIcon={<ArrowForward />}
                            onClick={() => handleExplore('lok_sabha', 'debates')}
                            sx={{
                              borderColor: lsColors.primary,
                              color: lsColors.dark,
                              py: 1.5,
                              justifyContent: 'space-between',
                              '&:hover': {
                                borderColor: lsColors.dark,
                                bgcolor: alpha(lsColors.primary, 0.05),
                              },
                            }}
                          >
                            Explore Debates
                          </Button>
                        </Stack>
                    </Collapse>
                  </CardContent>
                </Card>
              </Box>

              {/* Rajya Sabha Card */}
              <Box>
                <Card
                    sx={{
                      height: '100%',
                      border: `2px solid ${rsColors.primary}`,
                      bgcolor: rsColors.bg,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 40px ${alpha(rsColors.primary, 0.2)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: rsColors.primary,
                            color: 'white',
                            mr: 2,
                          }}
                        >
                          <RajyaSabhaIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: rsColors.dark }}>
                            Rajya Sabha
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Council of States
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Explore Rajya Sabha proceedings, including questions, debates, and official reports from recent sessions.
                      </Typography>

                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <Chip
                          label="30,000+ Questions"
                          size="small"
                          sx={{
                            bgcolor: alpha(rsColors.primary, 0.15),
                            color: rsColors.dark,
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label="3,000+ Debates"
                          size="small"
                          sx={{
                            bgcolor: alpha(rsColors.primary, 0.15),
                            color: rsColors.dark,
                            fontWeight: 600,
                          }}
                        />
                      </Stack>

                      <Button
                        fullWidth
                        variant={expandedCard === 'rajya_sabha' ? 'outlined' : 'contained'}
                        onClick={() => toggleExpand('rajya_sabha')}
                        endIcon={
                          <ExpandMore
                            sx={{
                              transform: expandedCard === 'rajya_sabha' ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s',
                            }}
                          />
                        }
                        sx={{
                          bgcolor: expandedCard === 'rajya_sabha' ? 'transparent' : rsColors.primary,
                          color: expandedCard === 'rajya_sabha' ? rsColors.primary : 'white',
                          borderColor: rsColors.primary,
                          fontWeight: 600,
                          py: 1.5,
                          '&:hover': {
                            bgcolor: expandedCard === 'rajya_sabha' ? alpha(rsColors.primary, 0.08) : rsColors.dark,
                            borderColor: rsColors.dark,
                          },
                        }}
                      >
                        {expandedCard === 'rajya_sabha' ? 'Collapse' : 'Explore Data'}
                      </Button>

                      <Collapse in={expandedCard === 'rajya_sabha'} timeout="auto">
                        <Stack spacing={2} sx={{ mt: 3 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<QuestionAnswer />}
                            endIcon={<ArrowForward />}
                            onClick={() => handleExplore('rajya_sabha', 'questions')}
                            sx={{
                              borderColor: rsColors.primary,
                              color: rsColors.dark,
                              py: 1.5,
                              justifyContent: 'space-between',
                              '&:hover': {
                                borderColor: rsColors.dark,
                                bgcolor: alpha(rsColors.primary, 0.05),
                              },
                            }}
                          >
                            Explore Questions
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Forum />}
                            endIcon={<ArrowForward />}
                            onClick={() => handleExplore('rajya_sabha', 'debates')}
                            sx={{
                              borderColor: rsColors.primary,
                              color: rsColors.dark,
                              py: 1.5,
                              justifyContent: 'space-between',
                              '&:hover': {
                                borderColor: rsColors.dark,
                                bgcolor: alpha(rsColors.primary, 0.05),
                              },
                            }}
                          >
                            Explore Debates
                          </Button>
                        </Stack>
                    </Collapse>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </>
        ) : (
          <>
            {/* Data Explorer View */}
            <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={<ChevronLeft />}
                  onClick={handleBack}
                  sx={{
                    color: selectedInstitution === 'lok_sabha' ? lsColors.primary : rsColors.primary,
                    '&:hover': {
                      bgcolor: alpha(
                        selectedInstitution === 'lok_sabha' ? lsColors.primary : rsColors.primary,
                        0.08
                      ),
                    },
                  }}
                >
                  Back to Selection
                </Button>
              </Box>

              {selectedInstitution && selectedMode && (
                <DataExplorerTable
                  institution={selectedInstitution}
                  mode={selectedMode}
                  themeColors={selectedInstitution === 'lok_sabha' ? lsColors : rsColors}
                />
            )}
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}