// Data Explorer Types

export type Institution = 'lok_sabha' | 'rajya_sabha';

export type QuestionType = 'STARRED' | 'UNSTARRED' | 'SHORT_NOTICE';

export type DebateStatus = 'pending' | 'completed' | 'failed' | 'not_available';

export type DebateCategory = 
  | 'corrected' 
  | 'uncorrected' 
  | 'synopsis' 
  | 'text_of_debate'
  | 'verbatim'
  | 'official_qa'
  | 'official_other'
  | 'official';

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

export interface LSDebate {
  id: number;
  debate_id: string;
  debate_date: string;
  debate_type: string;
  debate_category: DebateCategory;
  language: string;
  time_slot: string | null;
  lok_sabha: string;
  session: string;
  status: DebateStatus;
  is_downloaded: boolean;
  file_size_mb: number | null;
  page_count: number | null;
  download_attempts: number;
  created_at: string;
  updated_at: string;
}

export interface RSDebate {
  id: number;
  debate_id: string;
  debate_date: string;
  debate_type: string;
  debate_category: DebateCategory;
  language: string;
  session: string;
  status: DebateStatus;
  is_downloaded: boolean;
  file_size_mb: number | null;
  page_count: number | null;
  download_attempts: number;
  created_at: string;
  updated_at: string;
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
  status?: DebateStatus;
  language?: string;
  date_from?: string;
  date_to?: string;
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
  languages: string[];
  statuses: DebateStatus[];
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
  total_debates: number;
  completed: number;
  pending: number;
  failed: number;
}

export interface ExplorerResponse<T> {
  status: string;
  data: {
    questions?: T[];
    debates?: T[];
    pagination: Pagination;
  };
  applied_filters?: Record<string, any>;
}

export interface MetadataResponse {
  status: string;
  institution: string;
  metadata: QuestionsMetadata | DebatesMetadata;
  statistics: QuestionsStatistics | DebatesStatistics;
}

export type ExplorerMode = 'questions' | 'debates';
export type ExplorerView = 'selection' | 'explorer';
