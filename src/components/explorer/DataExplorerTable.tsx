'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Typography,
  Stack,
  Grid,
  CircularProgress,
  Alert,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  Download,
  PictureAsPdf,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { parliamentService } from '../../services/parliament.service';
import {
  Institution,
  ExplorerMode,
  LSQuestion,
  RSQuestion,
  LSDebateSession,
  RSDebateSession,
  QuestionFilters,
  DebateFilters,
  QuestionsMetadata,
  DebatesMetadata,
  Pagination,
} from '../../types/explorer.types';

interface DataExplorerTableProps {
  institution: Institution;
  mode: ExplorerMode;
  themeColors: {
    primary: string;
    light: string;
    lighter: string;
    dark: string;
    bg: string;
  };
}

export default function DataExplorerTable({ institution, mode, themeColors }: DataExplorerTableProps) {
  const { enqueueSnackbar } = useSnackbar();
  
  // Data state
  const [data, setData] = useState<(LSQuestion | RSQuestion | LSDebateSession | RSDebateSession)[]>([]);
  const [metadata, setMetadata] = useState<QuestionsMetadata | DebatesMetadata | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<QuestionFilters | DebateFilters>({
    limit: 50,
    offset: 0,
    sort_by: mode === 'questions' ? 'date' : 'lok_sabha_number',
    order: 'desc',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // Load metadata on mount
  useEffect(() => {
    loadMetadata();
  }, [institution, mode]);

  // Load data when filters change
  useEffect(() => {
    loadData();
  }, [filters, institution, mode]);

  const loadMetadata = async () => {
    try {
      const response = mode === 'questions'
        ? await parliamentService.getQuestionsMetadata(institution)
        : await parliamentService.getDebatesMetadata(institution);
      setMetadata(response.metadata);
    } catch (error: any) {
      console.error('Error loading metadata:', error);
      enqueueSnackbar('Failed to load filter options', { variant: 'error' });
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      let response;

      if (mode === 'questions') {
        if (institution === 'lok_sabha') {
          response = await parliamentService.exploreLSQuestions(filters as QuestionFilters);
          setData(response.data.questions || []);
        } else {
          response = await parliamentService.exploreRSQuestions(filters as QuestionFilters);
          setData(response.data.questions || []);
        }
      } else {
        if (institution === 'lok_sabha') {
          response = await parliamentService.exploreLSDebates(filters as DebateFilters);
          setData(response.data.debate_sessions || []);
        } else {
          response = await parliamentService.exploreRSDebates(filters as DebateFilters);
          setData(response.data.debate_sessions || []);
        }
      }

      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error('Error loading data:', error);
      enqueueSnackbar(error.response?.data?.error || 'Failed to load data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
      offset: 0, // Reset to first page when filter changes
    });
  };

  const handleSearch = () => {
    if (mode === 'questions') {
      setFilters({
        ...filters,
        search: searchTerm,
        offset: 0,
      } as QuestionFilters);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    const newOffset = newPage * (filters.limit || 50);
    setFilters({ ...filters, offset: newOffset });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilters({
      limit: 50,
      offset: 0,
      sort_by: mode === 'questions' ? 'date' : 'lok_sabha_number',
      order: 'desc',
    });
  };

  // Render filter controls
  const renderFilters = () => {
    const questionsMetadata = metadata as QuestionsMetadata;
    const debatesMetadata = metadata as DebatesMetadata;

    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: 'background.paper',
          border: `1px solid`,
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterList sx={{ color: themeColors.primary, fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<Refresh />}
              onClick={handleReset}
              variant="outlined"
              sx={{ 
                borderColor: alpha(themeColors.primary, 0.3),
                color: themeColors.primary,
                '&:hover': {
                  borderColor: themeColors.primary,
                  bgcolor: alpha(themeColors.primary, 0.04),
                },
              }}
            >
              Reset
            </Button>
            <IconButton 
              size="small" 
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                border: `1px solid ${alpha(themeColors.primary, 0.3)}`,
                '&:hover': {
                  bgcolor: alpha(themeColors.primary, 0.04),
                },
              }}
            >
              <FilterList sx={{ color: themeColors.primary, fontSize: 18 }} />
            </IconButton>
          </Stack>
        </Box>

        {showFilters && (
          <Grid container spacing={2}>
            {/* Search (Questions only) */}
            {mode === 'questions' && (
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search in subjects and ministry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    InputProps={{
                      startAdornment: <Search sx={{ color: themeColors.primary, mr: 1 }} />,
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      bgcolor: themeColors.primary,
                      '&:hover': { bgcolor: themeColors.dark },
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </Grid>
            )}

            {/* Lok Sabha filter (LS only) */}
            {institution === 'lok_sabha' && questionsMetadata?.lok_sabhas && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Lok Sabha</InputLabel>
                  <Select
                    value={(filters as QuestionFilters).lok_sabha || ''}
                    onChange={(e) => handleFilterChange('lok_sabha', e.target.value)}
                    label="Lok Sabha"
                  >
                    <MenuItem value="">All</MenuItem>
                    {questionsMetadata.lok_sabhas.map((ls) => (
                      <MenuItem key={ls} value={ls}>
                        LS {ls}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Session filter */}
            {metadata && 'sessions' in metadata && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Session</InputLabel>
                  <Select
                    value={filters.session || ''}
                    onChange={(e) => handleFilterChange('session', e.target.value)}
                    label="Session"
                  >
                    <MenuItem value="">All</MenuItem>
                    {metadata.sessions.map((session) => (
                      <MenuItem key={session} value={session}>
                        Session {session}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Question Type (Questions mode) */}
            {mode === 'questions' && questionsMetadata?.question_types && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Type</InputLabel>
                  <Select
                    value={(filters as QuestionFilters).question_type || ''}
                    onChange={(e) => handleFilterChange('question_type', e.target.value)}
                    label="Type"
                  >
                    <MenuItem value="">All</MenuItem>
                    {questionsMetadata.question_types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Debate Category (Debates mode) */}
            {mode === 'debates' && debatesMetadata?.debate_categories && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Category</InputLabel>
                  <Select
                    value={(filters as DebateFilters).debate_category || ''}
                    onChange={(e) => handleFilterChange('debate_category', e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    {debatesMetadata.debate_categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Is Complete (Debates mode) */}
            {mode === 'debates' && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Status</InputLabel>
                  <Select
                    value={(filters as DebateFilters).is_complete === undefined ? '' : (filters as DebateFilters).is_complete ? 'true' : 'false'}
                    onChange={(e) => handleFilterChange('is_complete', e.target.value === '' ? undefined : e.target.value === 'true')}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">Complete</MenuItem>
                    <MenuItem value="false">Incomplete</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Has PDF (Questions only) */}
            {mode === 'questions' && (
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>PDF</InputLabel>
                  <Select
                    value={(filters as QuestionFilters).has_pdf === undefined ? '' : (filters as QuestionFilters).has_pdf ? 'true' : 'false'}
                    onChange={(e) => handleFilterChange('has_pdf', e.target.value === 'true')}
                    label="PDF"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">With PDF</MenuItem>
                    <MenuItem value="false">No PDF</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Sort By */}
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth size="small" sx={{ minWidth: 180 }}>
                <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Sort By</InputLabel>
                <Select
                  value={filters.sort_by || ''}
                  onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                  label="Sort By"
                >
                  {mode === 'questions' ? (
                    <>
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="question_number">Question #</MenuItem>
                      <MenuItem value="ministry">Ministry</MenuItem>
                      <MenuItem value="question_type">Type</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value="lok_sabha_number">LS Number</MenuItem>
                      <MenuItem value="session_number">Session</MenuItem>
                      <MenuItem value="total_debate_days">Debate Days</MenuItem>
                      <MenuItem value="debates_discovered">Discovered</MenuItem>
                      <MenuItem value="created_at">Created</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Sort Order */}
            <Grid item xs={12} sm={6} md={2.4}>
              <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ bgcolor: 'background.paper', px: 0.5 }}>Order</InputLabel>
                <Select
                  value={filters.order || 'desc'}
                  onChange={(e) => handleFilterChange('order', e.target.value)}
                  label="Order"
                >
                  <MenuItem value="desc">Newest First</MenuItem>
                  <MenuItem value="asc">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  };

  // Render Questions Table
  const renderQuestionsTable = () => {
    const questions = data as (LSQuestion | RSQuestion)[];

    return (
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(themeColors.primary, 0.1) }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Question #</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Ministry</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                PDF
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Answer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <CircularProgress sx={{ color: themeColors.primary }} />
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">No questions found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              questions.map((q) => (
                <TableRow
                  key={q.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: alpha(themeColors.bg, 0.5),
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {q.question_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 400 }} noWrap>
                      {q.subjects}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={q.question_type}
                      size="small"
                      sx={{
                        bgcolor: alpha(themeColors.primary, 0.15),
                        color: themeColors.dark,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
                      {q.ministry}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{q.date}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {q.has_pdf ? (
                      <PictureAsPdf sx={{ color: themeColors.primary, fontSize: 20 }} />
                    ) : (
                      <Cancel sx={{ color: 'text.disabled', fontSize: 20 }} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {q.has_answer ? (
                      <CheckCircle sx={{ color: themeColors.primary, fontSize: 20 }} />
                    ) : (
                      <Cancel sx={{ color: 'text.disabled', fontSize: 20 }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render Debates Table (Session Metadata)
  const renderDebatesTable = () => {
    const debateSessions = data as (LSDebateSession | RSDebateSession)[];

    return (
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(themeColors.primary, 0.1) }}>
            <TableRow>
              {institution === 'lok_sabha' && (
                <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>LS</TableCell>
              )}
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Session</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }}>Date Range</TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Debate Days
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Discovered
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Downloaded
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Progress
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: themeColors.dark }} align="center">
                Complete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={institution === 'lok_sabha' ? 9 : 8} align="center" sx={{ py: 8 }}>
                  <CircularProgress sx={{ color: themeColors.primary }} />
                </TableCell>
              </TableRow>
            ) : debateSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={institution === 'lok_sabha' ? 9 : 8} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">No debate sessions found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              debateSessions.map((d) => (
                <TableRow
                  key={d.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: alpha(themeColors.bg, 0.5),
                    },
                  }}
                >
                  {institution === 'lok_sabha' && (
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {d.lok_sabha}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {d.session}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={d.debate_category}
                      size="small"
                      sx={{
                        bgcolor: alpha(themeColors.primary, 0.15),
                        color: themeColors.dark,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {d.date_range_formatted || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={600}>
                      {d.total_debate_days}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{d.debates_discovered}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{d.debates_downloaded}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${d.completion_percentage.toFixed(1)}%`}
                      size="small"
                      color={
                        d.completion_percentage === 100
                          ? 'success'
                          : d.completion_percentage > 0
                          ? 'warning'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    {d.is_complete ? (
                      <CheckCircle sx={{ color: themeColors.primary, fontSize: 20 }} />
                    ) : (
                      <Cancel sx={{ color: 'text.disabled', fontSize: 20 }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const currentPage = pagination ? Math.floor((pagination.offset || 0) / (pagination.limit || 50)) : 0;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: themeColors.dark,
                mb: 0.5,
              }}
            >
              {institution === 'lok_sabha' ? 'Lok Sabha' : 'Rajya Sabha'} {' '}
              {mode === 'questions' ? 'Questions' : 'Debates'}
            </Typography>
            {pagination && (
              <Typography variant="body2" color="text.secondary">
                Showing {pagination.offset + 1} - {pagination.offset + pagination.returned} of{' '}
                {pagination.total.toLocaleString()} records
              </Typography>
            )}
          </Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={loadData} sx={{ color: themeColors.primary }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Filters */}
      {renderFilters()}

      {/* Table */}
      {mode === 'questions' ? renderQuestionsTable() : renderDebatesTable()}

      {/* Pagination */}
      {pagination && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <TablePagination
            component="div"
            count={pagination.total}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={pagination.limit}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[25, 50, 100, 250, 500]}
            sx={{
              '& .MuiTablePagination-actions button': {
                color: themeColors.primary,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
