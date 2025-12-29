/**
 * Alpha Factory Mobile - Mock Data
 * Investment Tips (Backend not ready yet)
 */

import { InvestmentTip, Company, Filing, FilingDiff, Feature } from '../types';

// ============================================
// Investment Tips Mock Data
// ============================================

export const mockInvestmentTips: InvestmentTip[] = [
  {
    id: 'tip-nvda-1',
    ticker: 'NVDA',
    category: 'opportunity',
    explanation_en:
      'Risk factors section shows minimal changes (8% novelty), indicating stable business operations. Revenue growth language strengthened with AI demand mentions.',
    explanation_zh:
      '風險因素部分變化極小（8% 新穎度），顯示業務運營穩定。營收增長語言因 AI 需求提及而加強。',
    complexity_level: 'Beginner',
    generated_at: '2025-01-15T10:00:00Z',
    confidence_score: 0.85,
  },
  {
    id: 'tip-nvda-2',
    ticker: 'NVDA',
    category: 'risk',
    explanation_en:
      'New risk factor added regarding export restrictions to China. This could impact ~20% of revenue based on geographic segment data.',
    explanation_zh:
      '新增對中國出口限制的風險因素。根據地理分部數據，這可能影響約 20% 的營收。',
    complexity_level: 'Intermediate',
    generated_at: '2025-01-15T10:00:00Z',
    confidence_score: 0.78,
  },
  {
    id: 'tip-tsm-1',
    ticker: 'TSM',
    category: 'neutral',
    explanation_en:
      'MD&A section shows standard seasonal patterns. Capital expenditure guidance maintained at previous levels.',
    explanation_zh:
      'MD&A 部分顯示標準季節性模式。資本支出指引維持在先前水平。',
    complexity_level: 'Beginner',
    generated_at: '2025-01-14T08:00:00Z',
    confidence_score: 0.72,
  },
  {
    id: 'tip-meta-1',
    ticker: 'META',
    category: 'opportunity',
    explanation_en:
      'Significant reduction in risk language around metaverse investments. Operating efficiency improvements highlighted in MD&A.',
    explanation_zh:
      '元宇宙投資相關風險語言大幅減少。MD&A 中強調運營效率改善。',
    complexity_level: 'Intermediate',
    generated_at: '2025-01-13T14:00:00Z',
    confidence_score: 0.81,
  },
  {
    id: 'tip-goog-1',
    ticker: 'GOOG',
    category: 'risk',
    explanation_en:
      'New antitrust risk factors added (25% section increase). Legal expense provisions increased in footnotes.',
    explanation_zh:
      '新增反壟斷風險因素（部分增加 25%）。註腳中法律費用準備金增加。',
    complexity_level: 'Advanced',
    generated_at: '2025-01-12T16:00:00Z',
    confidence_score: 0.88,
  },
  {
    id: 'tip-ko-1',
    ticker: 'KO',
    category: 'neutral',
    explanation_en:
      'Standard filing with minimal changes. Dividend language remains consistent. Supply chain risks unchanged from prior quarter.',
    explanation_zh:
      '標準文件，變化極小。股息語言保持一致。供應鏈風險與上季度相比未變。',
    complexity_level: 'Beginner',
    generated_at: '2025-01-11T09:00:00Z',
    confidence_score: 0.65,
  },
  {
    id: 'tip-sofi-1',
    ticker: 'SOFI',
    category: 'opportunity',
    explanation_en:
      'Bank charter benefits now reflected in improved NIM language. Member growth metrics show acceleration.',
    explanation_zh:
      '銀行牌照優勢現已反映在改善的淨息差語言中。會員增長指標顯示加速。',
    complexity_level: 'Intermediate',
    generated_at: '2025-01-10T11:00:00Z',
    confidence_score: 0.76,
  },
  {
    id: 'tip-ftnt-1',
    ticker: 'FTNT',
    category: 'risk',
    explanation_en:
      'Increased competition language in risk factors. Pricing pressure mentioned in MD&A for the first time.',
    explanation_zh:
      '風險因素中競爭語言增加。MD&A 首次提及定價壓力。',
    complexity_level: 'Advanced',
    generated_at: '2025-01-09T15:00:00Z',
    confidence_score: 0.73,
  },
];

// ============================================
// Helper to get tips by ticker
// ============================================

export function getTipsByTicker(ticker: string): InvestmentTip[] {
  return mockInvestmentTips.filter(
    (tip) => tip.ticker.toUpperCase() === ticker.toUpperCase()
  );
}

// ============================================
// Mock Companies
// ============================================

export const mockCompanies: Company[] = [
  { id: 1, ticker: 'NVDA', cik: '0001045810', name: 'NVIDIA Corporation', latest_filing_date: '2025-01-15', filing_count: 5 },
  { id: 2, ticker: 'TSM', cik: '0001046179', name: 'Taiwan Semiconductor Manufacturing', latest_filing_date: '2025-01-14', filing_count: 5 },
  { id: 3, ticker: 'META', cik: '0001326801', name: 'Meta Platforms, Inc.', latest_filing_date: '2025-01-13', filing_count: 5 },
  { id: 4, ticker: 'GOOG', cik: '0001652044', name: 'Alphabet Inc.', latest_filing_date: '2025-01-12', filing_count: 5 },
  { id: 5, ticker: 'FTNT', cik: '0001262039', name: 'Fortinet, Inc.', latest_filing_date: '2025-01-11', filing_count: 5 },
  { id: 6, ticker: 'SOFI', cik: '0001818874', name: 'SoFi Technologies, Inc.', latest_filing_date: '2025-01-10', filing_count: 5 },
  { id: 7, ticker: 'KO', cik: '0000021344', name: 'The Coca-Cola Company', latest_filing_date: '2025-01-09', filing_count: 5 },
];

// ============================================
// Mock Filings
// ============================================

export const mockFilings: Record<string, Filing[]> = {
  NVDA: [
    {
      id: 1,
      company_id: 1,
      accession_no: '0001045810-25-000230',
      form_type: '10-Q',
      filing_date: '2025-01-15',
      report_date: '2024-10-27',
      primary_doc_url: 'https://www.sec.gov/Archives/edgar/data/1045810/...',
      sections: [
        { id: 1, section_key: 'item_1a', char_count: 45000 },
        { id: 2, section_key: 'item_2', char_count: 32000 },
      ],
    },
    {
      id: 2,
      company_id: 1,
      accession_no: '0001045810-24-000180',
      form_type: '10-K',
      filing_date: '2024-02-21',
      report_date: '2024-01-28',
      primary_doc_url: 'https://www.sec.gov/Archives/edgar/data/1045810/...',
      sections: [
        { id: 3, section_key: 'item_1a', char_count: 52000 },
        { id: 4, section_key: 'item_7', char_count: 48000 },
      ],
    },
  ],
};

// ============================================
// Mock Diffs
// ============================================

export const mockDiffs: Record<string, FilingDiff[]> = {
  NVDA: [
    {
      id: 1,
      section_key: 'item_1a',
      prev_filing_id: 2,
      curr_filing_id: 1,
      diff_text: `--- Previous Filing
+++ Current Filing
@@ -1,5 +1,6 @@
 RISK FACTORS
 
 Investing in our securities involves risk.
-Our business faces competition.
+Our business faces intense competition, particularly in AI chips.
+New export restrictions may impact our China revenue.
 Market conditions affect demand.`,
      novelty_score: 0.194,
      added_ratio: 0.08,
      removed_ratio: 0.02,
      prev_filing_date: '2024-02-21',
      curr_filing_date: '2025-01-15',
    },
    {
      id: 2,
      section_key: 'item_7',
      prev_filing_id: 2,
      curr_filing_id: 1,
      diff_text: `--- Previous Filing
+++ Current Filing
@@ -10,4 +10,5 @@
 Management's Discussion
 
 Revenue increased driven by data center demand.
+AI-related revenue grew 150% year-over-year.
 Operating expenses remained controlled.`,
      novelty_score: 0.156,
      added_ratio: 0.05,
      removed_ratio: 0.01,
      prev_filing_date: '2024-02-21',
      curr_filing_date: '2025-01-15',
    },
  ],
};

// ============================================
// Mock Features
// ============================================

export const mockFeatures: Record<string, Feature[]> = {
  NVDA: [
    {
      id: 1,
      company_id: 1,
      asof_date: '2025-01-15',
      fiscal_period: 'Q3 FY2025',
      feature_json: {
        revenues: 35100000000,
        net_income_loss: 19300000000,
        assets: 85200000000,
        liabilities: 27800000000,
        leverage: 0.326,
        profitability: 0.55,
        yoy_growth_revenues: 0.94,
        novelty_score_item_1a: 0.194,
        novelty_score_mda: 0.156,
        composite_signal: 1.85,
      },
    },
    {
      id: 2,
      company_id: 1,
      asof_date: '2024-10-15',
      fiscal_period: 'Q2 FY2025',
      feature_json: {
        revenues: 30000000000,
        net_income_loss: 16500000000,
        assets: 78000000000,
        liabilities: 25000000000,
        leverage: 0.32,
        profitability: 0.55,
        yoy_growth_revenues: 1.22,
        novelty_score_item_1a: 0.12,
        novelty_score_mda: 0.10,
        composite_signal: 2.1,
      },
    },
  ],
};

export default {
  mockInvestmentTips,
  mockCompanies,
  mockFilings,
  mockDiffs,
  mockFeatures,
  getTipsByTicker,
};
