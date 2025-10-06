// Lok Sabha Question Types
export interface LokSabhaQuestion {
  id: number;
  question_id: string;
  question_number: string;
  title: string;
  question_type: 'STARRED' | 'UNSTARRED';
  lok_sabha: string;
  session: string;
  members: string[];
  ministries: string[];
  date: string;
  status: 'answered' | 'pending' | 'withdrawn';
  has_answer: boolean;
  pdf_files?: string[];
}

// Rajya Sabha Question Types
export interface RajyaSabhaQuestion {
  id: number;
  question_number: string;
  subjects: string;
  question_type: 'STARRED' | 'UNSTARRED';
  ministry: string;
  session_number: string;
  date: string;
  has_pdf: boolean;
  pdf_url?: string;
  members: string[];
}

// Debate Types
export interface Debate {
  id: number;
  debate_id: string;
  lok_sabha: string;
  session: string;
  debate_date: string;
  debate_type: 'text_of_debate' | 'synopsis' | 'other';
  language: 'en' | 'hi';
  status: 'pending' | 'completed' | 'failed';
  pdf_url?: string;
  is_downloaded: boolean;
  file_size_mb?: number;
  page_count?: number;
}

// Session Types
export interface Session {
  lok_sabha_number: string;
  session_number: string;
  total_questions: number;
  starred_questions: number;
  unstarred_questions: number;
  session_dates: string[];
}

export interface DebateSession {
  loksabha_no: string;
  session_no: string;
  api_source: string;
  date_count: number;
  dates: string[];
}

// Statistics Types
export interface QuestionStatistics {
  total_questions: number;
  total_lok_sabhas: number;
  total_sessions: number;
  total_members: number;
  total_ministries: number;
}

export interface DebateStatistics {
  total_debates: number;
  status_breakdown: {
    completed: number;
    pending: number;
    failed: number;
  };
  loksabha_breakdown: Array<{
    loksabha: string;
    count: number;
  }>;
  session_breakdown: Array<{
    session: string;
    count: number;
  }>;
  date_range: {
    earliest_date: string;
    latest_date: string;
  };
  file_statistics: {
    total_size_mb: number;
    average_size_mb: number;
  };
}

// Scraping Status Types
export interface ScrapingJob {
  id: number;
  name: string;
  job_type: 'questions' | 'debates' | 'members';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress_percent: number;
  questions_processed?: number;
  questions_created?: number;
  started_at: string;
  completed_at?: string;
}

export interface ScrapingStatus {
  active_jobs: ScrapingJob[];
  latest_job?: ScrapingJob;
  system_status: 'operational' | 'maintenance' | 'error';
}
