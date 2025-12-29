/**
 * Alpha Factory Mobile - TypeScript Interfaces
 * Converted from Python Pydantic schemas
 */

// ============================================
// Core Data Models
// ============================================

export interface Company {
  id: number;
  ticker: string;
  cik: string;
  name: string;
  latest_filing_date: string | null;
  filing_count: number;
}

export interface FilingSection {
  id: number;
  section_key: string;
  char_count: number;
  text_clean?: string;
}

export interface Filing {
  id: number;
  company_id: number;
  accession_no: string;
  form_type: '10-K' | '10-Q';
  filing_date: string;
  report_date: string;
  primary_doc_url: string;
  sections: FilingSection[];
}

export interface FilingDiff {
  id: number;
  section_key: string;
  prev_filing_id: number;
  curr_filing_id: number;
  diff_text: string;
  novelty_score: number;
  added_ratio: number;
  removed_ratio: number;
  prev_filing_date?: string;
  curr_filing_date?: string;
}

export interface FeatureJson {
  revenues: number | null;
  net_income_loss: number | null;
  assets: number | null;
  liabilities: number | null;
  leverage: number | null;
  profitability: number | null;
  yoy_growth_revenues: number | null;
  novelty_score_item_1a: number | null;
  novelty_score_mda: number | null;
  composite_signal: number | null;
}

export interface Feature {
  id: number;
  company_id: number;
  asof_date: string;
  fiscal_period: string;
  feature_json: FeatureJson;
}

// ============================================
// Investment Tips (New Feature - Mocked)
// ============================================

export type ComplexityLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InvestmentTip {
  id: string;
  ticker: string;
  category: 'risk' | 'opportunity' | 'neutral';
  explanation_en: string;
  explanation_zh: string;
  complexity_level: ComplexityLevel;
  generated_at: string;
  confidence_score: number;
}

// ============================================
// App Settings & State
// ============================================

export type ViewMode = 'analyst' | 'beginner';
export type Language = 'en' | 'zh';

export interface AppSettings {
  viewMode: ViewMode;
  language: Language;
  notificationsEnabled: boolean;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// ============================================
// Navigation Types
// ============================================

export type CompanyTabKey = 'filings' | 'diffs' | 'fundamentals' | 'tips';

export interface CompanyDetailParams {
  ticker: string;
  initialTab?: CompanyTabKey;
}

// ============================================
// Backtest Types
// ============================================

export interface BacktestConfig {
  tickers: string[];
  start_date: string;
  end_date: string;
  rebalance_freq: 'monthly' | 'quarterly' | 'annually';
  transaction_cost_bps: number;
}

export interface BacktestMetrics {
  cagr: number | null;
  sharpe: number | null;
  max_drawdown: number | null;
  volatility: number | null;
  turnover: number | null;
  hit_rate: number | null;
  total_return: number | null;
  num_trades: number | null;
}

export interface BacktestRun {
  id: number;
  run_id: string;
  config: BacktestConfig;
  metrics: BacktestMetrics;
  equity_curve: { date: string; equity: number }[];
  created_at: string;
}
