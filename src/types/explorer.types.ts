// Data Explorer Types

export type Institution = 'lok_sabha' | 'rajya_sabha';

export type QuestionType = 'STARRED' | 'UNSTARRED' | 'SHORT_NOTICE';

export type DebateStatus = 'pending' | 'completed' | 'failed' | 'not_available';

export type LSDebateCategory = 'corrected' | 'uncorrected';

export type RSDebateCategory = 
  | 'corrected' 
  | 'verbatim'
  | 'official_qa'
  | 'official_other'
  | 'official';

export type DebateCategory = LSDebateCategory | RSDebateCategory;

export interface LSQuestion {
  id: number;
  question_number: string;
  subjects: string;
  question_type: QuestionType;
  ministry: string;
  date: string;
  lok_sabha: string;
  session: string;
  member_names: string[];
  has_pdf: boolean;
  has_answer: boolean;
  is_processed: boolean;
  pdf_downloaded: boolean;
  created_at: string;
  updated_at: string;
}

export interface RSQuestion {
  id: number;
  question_number: string;
  subjects: string;
  question_type: QuestionType;
  ministry: string;
  date: string;
  session: string;
  member_names: string[];
  has_pdf: boolean;
  has_answer: boolean;
  is_processed: boolean;
  pdf_downloaded: boolean;
  created_at: string;
  updated_at: string;
}

// Debate Session Metadata (not individual debates)
export interface LSDebateSession {
  id: number;
  institution: 'lok_sabha';
  lok_sabha: string;
  rajya_sabha: string;
  session: string;
  debate_category: DebateCategory;
  date_count: number;
  total_debate_days: number;
  debates_discovered: number;
  debates_downloaded: number;
  completion_percentage: number;
  api_source: string;
  date_range_start: string | null;
  date_range_end: string | null;
  date_range_formatted: string | null;
  is_complete: boolean;
  discovery_success: boolean;
  created_at: string;
  updated_at: string;
  last_fetched: string | null;
}

export interface RSDebateSession {
  id: number;
  institution: 'rajya_sabha';
  lok_sabha: string;
  rajya_sabha: string;
  session: string;
  debate_category: DebateCategory;
  date_count: number;
  total_debate_days: number;
  debates_discovered: number;
  debates_downloaded: number;
  completion_percentage: number;
  api_source: string;
  date_range_start: string | null;
  date_range_end: string | null;
  date_range_formatted: string | null;
  is_complete: boolean;
  discovery_success: boolean;
  created_at: string;
  updated_at: string;
  last_fetched: string | null;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  returned: number;
  has_next: boolean;
  has_previous: boolean;
  next_offset: number | null;
  previous_offset: number | null;
}

export interface QuestionFilters {
  lok_sabha?: string;
  session?: string;
  question_type?: QuestionType;
  ministry?: string;
  has_pdf?: boolean;
  has_answer?: boolean;
  is_processed?: boolean;
  pdf_downloaded?: boolean;
  date_from?: string;
  date_to?: string;
  search?: string;
  sort_by?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface DebateFilters {
  lok_sabha?: string;
  session?: string;
  debate_category?: DebateCategory;
  is_complete?: boolean;
  sort_by?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface QuestionsMetadata {
  lok_sabhas?: string[];
  sessions: string[];
  ministries: string[];
  question_types: QuestionType[];
  date_range: {
    min: string;
    max: string;
  };
}

export interface DebatesMetadata {
  lok_sabhas?: string[];
  sessions: string[];
  debate_categories: DebateCategory[];
  date_range: {
    min: string;
    max: string;
  };
}

export interface QuestionsStatistics {
  total_questions: number;
  with_pdf: number;
  with_answer: number;
  processed: number;
  pdf_downloaded: number;
}

export interface DebatesStatistics {
  total_sessions: number;
  total_debate_days: number;
  total_debates_discovered: number;
  total_debates_downloaded: number;
  complete_sessions: number;
}

export interface ExplorerResponse<T> {
  status: string;
  data: {
    questions?: T[];
    debate_sessions?: T[];
    pagination: Pagination;
  };
  applied_filters?: Record<string, any>;
  note?: string;
}

export interface MetadataResponse {
  status: string;
  institution: string;
  metadata: QuestionsMetadata | DebatesMetadata;
  statistics: QuestionsStatistics | DebatesStatistics;
}

export type ExplorerMode = 'questions' | 'debates';
export type ExplorerView = 'selection' | 'explorer';
