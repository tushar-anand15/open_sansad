import axios from '../utils/axios';
import {
  LokSabhaQuestion,
  RajyaSabhaQuestion,
  Debate,
  Session,
  DebateSession,
  QuestionStatistics,
  DebateStatistics,
  ScrapingStatus,
} from '../types/parliament.types';
import { PaginatedResponse } from '../types/api.types';
import {
  LSQuestion,
  RSQuestion,
  LSDebateSession,
  RSDebateSession,
  QuestionFilters,
  DebateFilters,
  ExplorerResponse,
  MetadataResponse,
  Institution,
} from '../types/explorer.types';

export const parliamentService = {
  // Lok Sabha Questions
  getQuestions: async (params?: {
    lok_sabha?: string;
    session_number?: string;
    question_type?: 'STARRED' | 'UNSTARRED';
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<{ questions: LokSabhaQuestion[] }>> => {
    const response = await axios.get('/questions/ls/questions/', { params });
    return response.data;
  },

  getQuestion: async (id: number) => {
    const response = await axios.get(`/questions/ls/questions/${id}/`);
    return response.data;
  },

  getQuestionStats: async (): Promise<{ statistics: QuestionStatistics }> => {
    const response = await axios.get('/questions/ls/stats/');
    return response.data;
  },

  getAvailableSessions: async (): Promise<{ sessions: Session[] }> => {
    const response = await axios.get('/questions/ls/sessions/');
    return response.data;
  },

  // Rajya Sabha Questions
  getRSQuestions: async (params?: {
    session_number?: string;
    question_type?: 'STARRED' | 'UNSTARRED';
    ministry?: string;
    has_pdf?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<{ questions: RajyaSabhaQuestion[] }>> => {
    const response = await axios.get('/questions/rs/master-data/list/', { params });
    return response.data;
  },

  getRSStatistics: async () => {
    const response = await axios.get('/questions/rs/statistics/');
    return response.data;
  },

  // Debates
  getDebates: async (params?: {
    loksabha?: string;
    session?: string;
    status?: 'pending' | 'completed' | 'failed';
    start_date?: string;
    end_date?: string;
  }): Promise<{ debates: Debate[]; total_count: number }> => {
    const response = await axios.get('/debates/', { params });
    return response.data;
  },

  getDebate: async (id: number): Promise<Debate> => {
    const response = await axios.get(`/debates/${id}/`);
    return response.data;
  },

  getDebateStatistics: async (params?: {
    loksabha?: string;
  }): Promise<DebateStatistics> => {
    const response = await axios.get('/debates/statistics/', { params });
    return response.data;
  },

  searchDebates: async (params?: {
    year?: number;
    month?: number;
    status?: string;
  }) => {
    const response = await axios.get('/debates/search/', { params });
    return response.data;
  },

  discoverSessions: async (): Promise<{
    total_sessions: number;
    sessions: DebateSession[];
    lok_sabha_range: { min: number; max: number };
  }> => {
    const response = await axios.get('/debates/discover-sessions/');
    return response.data;
  },

  // Scraping Status
  getScrapingStatus: async (): Promise<ScrapingStatus> => {
    const response = await axios.get('/scraper/status/');
    return response.data;
  },

  getDatabaseStats: async () => {
    const response = await axios.get('/scraper/database-stats/');
    return response.data;
  },

  // File Downloads
  getFileDownloadURL: async (fileId: number) => {
    const response = await axios.get(`/files/download/${fileId}/`);
    return response.data;
  },

  // Health Check
  healthCheck: async () => {
    const response = await axios.get('/debates/health/');
    return response.data;
  },

  // ============ DATA EXPLORER ENDPOINTS ============

  // Lok Sabha Questions Explorer
  exploreLSQuestions: async (filters?: QuestionFilters): Promise<ExplorerResponse<LSQuestion>> => {
    const response = await axios.get('/explorer/ls/questions/', { params: filters });
    return response.data;
  },

  // Rajya Sabha Questions Explorer
  exploreRSQuestions: async (filters?: QuestionFilters): Promise<ExplorerResponse<RSQuestion>> => {
    const response = await axios.get('/explorer/rs/questions/', { params: filters });
    return response.data;
  },

  // Lok Sabha Debates Explorer (Session Metadata)
  exploreLSDebates: async (filters?: DebateFilters): Promise<ExplorerResponse<LSDebateSession>> => {
    const response = await axios.get('/explorer/ls/debates/', { params: filters });
    return response.data;
  },

  // Rajya Sabha Debates Explorer (Session Metadata)
  exploreRSDebates: async (filters?: DebateFilters): Promise<ExplorerResponse<RSDebateSession>> => {
    const response = await axios.get('/explorer/rs/debates/', { params: filters });
    return response.data;
  },

  // Get Questions Metadata
  getQuestionsMetadata: async (institution: Institution): Promise<MetadataResponse> => {
    const response = await axios.get('/explorer/metadata/questions/', {
      params: { institution },
    });
    return response.data;
  },

  // Get Debates Metadata
  getDebatesMetadata: async (institution: Institution): Promise<MetadataResponse> => {
    const response = await axios.get('/explorer/metadata/debates/', {
      params: { institution },
    });
    return response.data;
  },

  // Get Question Detail
  getLSQuestionDetail: async (id: number) => {
    const response = await axios.get(`/explorer/ls/questions/${id}/`);
    return response.data;
  },

  getRSQuestionDetail: async (id: number) => {
    const response = await axios.get(`/explorer/rs/questions/${id}/`);
    return response.data;
  },

  // Get Debate Detail
  getLSDebateDetail: async (id: number) => {
    const response = await axios.get(`/explorer/ls/debates/${id}/`);
    return response.data;
  },

  getRSDebateDetail: async (id: number) => {
    const response = await axios.get(`/explorer/rs/debates/${id}/`);
    return response.data;
  },
};
