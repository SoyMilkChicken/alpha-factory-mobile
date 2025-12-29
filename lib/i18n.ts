/**
 * Alpha Factory Mobile - Internationalization (i18n)
 * Supports: English (en) & Mandarin Chinese (zh)
 */

import { Language } from '../types';

// ============================================
// Translation Dictionary
// ============================================

const translations = {
  en: {
    // Navigation
    'nav.companies': 'Companies',
    'nav.backtest': 'Backtest',
    'nav.settings': 'Settings',
    'nav.dashboard': 'Dashboard',

    // Tabs
    'tab.filings': 'Filings',
    'tab.diffs': 'Diffs',
    'tab.fundamentals': 'Fundamentals',
    'tab.tips': 'Tips',

    // Company Screen
    'company.filings_count': '{count} filings',
    'company.diffs_count': '{count} diffs',
    'company.quarters_count': '{count} quarters',
    'company.no_filings': 'No filings found',
    'company.no_diffs': 'No diffs computed',
    'company.no_features': 'No features available',
    'company.view_on_sec': 'View on SEC',

    // Filing Types
    'filing.10k': 'Annual Report',
    'filing.10q': 'Quarterly Report',
    'filing.filed': 'Filed',
    'filing.report_date': 'Report',
    'filing.sections': 'sections',
    'filing.chars': 'chars',

    // Diff Viewer
    'diff.novelty': 'Novel',
    'diff.added': 'Added',
    'diff.removed': 'Removed',
    'diff.select_diff': 'Select a diff to view',
    'diff.high_change': 'High Change',
    'diff.medium_change': 'Medium Change',
    'diff.low_change': 'Low Change',

    // Fundamentals
    'fundamental.revenue': 'Revenue',
    'fundamental.net_income': 'Net Income',
    'fundamental.assets': 'Assets',
    'fundamental.liabilities': 'Liabilities',
    'fundamental.leverage': 'Leverage',
    'fundamental.profitability': 'Profitability',
    'fundamental.signal': 'Composite Signal',
    'fundamental.yoy_growth': 'YoY Growth',

    // Investment Tips
    'tips.title': 'Investment Insights',
    'tips.risk': 'Risk Alert',
    'tips.opportunity': 'Opportunity',
    'tips.neutral': 'Neutral',
    'tips.confidence': 'Confidence',
    'tips.complexity': 'Complexity',
    'tips.no_tips': 'No insights available for this company',
    'tips.beginner': 'Beginner',
    'tips.intermediate': 'Intermediate',
    'tips.advanced': 'Advanced',

    // Settings
    'settings.title': 'Settings',
    'settings.view_mode': 'View Mode',
    'settings.analyst_mode': 'Analyst Mode',
    'settings.beginner_mode': 'Beginner Mode',
    'settings.analyst_desc': 'Raw data, diffs, and detailed metrics',
    'settings.beginner_desc': 'Simplified explanations and tips',
    'settings.language': 'Language',
    'settings.english': 'English',
    'settings.chinese': '中文',
    'settings.notifications': 'Notifications',
    'settings.about': 'About',

    // Dashboard
    'dashboard.title': 'Alpha Factory',
    'dashboard.subtitle': 'SEC Filing Analysis',
    'dashboard.companies': 'Companies',
    'dashboard.filings': 'Total Filings',
    'dashboard.recent_backtests': 'Recent Backtests',
    'dashboard.quick_start': 'Quick Start',

    // Backtest
    'backtest.title': 'Backtest',
    'backtest.run': 'Run Backtest',
    'backtest.running': 'Running...',
    'backtest.cagr': 'CAGR',
    'backtest.sharpe': 'Sharpe Ratio',
    'backtest.max_dd': 'Max Drawdown',
    'backtest.hit_rate': 'Hit Rate',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.na': 'N/A',
    'common.billion': 'B',
    'common.million': 'M',
  },

  zh: {
    // Navigation
    'nav.companies': '公司',
    'nav.backtest': '回測',
    'nav.settings': '設定',
    'nav.dashboard': '儀表板',

    // Tabs
    'tab.filings': '文件',
    'tab.diffs': '差異',
    'tab.fundamentals': '基本面',
    'tab.tips': '提示',

    // Company Screen
    'company.filings_count': '{count} 份文件',
    'company.diffs_count': '{count} 個差異',
    'company.quarters_count': '{count} 季度',
    'company.no_filings': '無文件',
    'company.no_diffs': '無差異分析',
    'company.no_features': '無可用特徵',
    'company.view_on_sec': '在SEC查看',

    // Filing Types
    'filing.10k': '年度報告',
    'filing.10q': '季度報告',
    'filing.filed': '提交日期',
    'filing.report_date': '報告日期',
    'filing.sections': '區塊',
    'filing.chars': '字符',

    // Diff Viewer
    'diff.novelty': '新穎度',
    'diff.added': '新增',
    'diff.removed': '刪除',
    'diff.select_diff': '選擇差異以查看',
    'diff.high_change': '高變化',
    'diff.medium_change': '中等變化',
    'diff.low_change': '低變化',

    // Fundamentals
    'fundamental.revenue': '營收',
    'fundamental.net_income': '淨利潤',
    'fundamental.assets': '資產',
    'fundamental.liabilities': '負債',
    'fundamental.leverage': '槓桿率',
    'fundamental.profitability': '獲利能力',
    'fundamental.signal': '綜合信號',
    'fundamental.yoy_growth': '年增率',

    // Investment Tips
    'tips.title': '投資見解',
    'tips.risk': '風險警示',
    'tips.opportunity': '機會',
    'tips.neutral': '中性',
    'tips.confidence': '信心度',
    'tips.complexity': '複雜度',
    'tips.no_tips': '此公司暫無投資見解',
    'tips.beginner': '初學者',
    'tips.intermediate': '中級',
    'tips.advanced': '進階',

    // Settings
    'settings.title': '設定',
    'settings.view_mode': '顯示模式',
    'settings.analyst_mode': '分析師模式',
    'settings.beginner_mode': '新手模式',
    'settings.analyst_desc': '原始數據、差異和詳細指標',
    'settings.beginner_desc': '簡化說明和提示',
    'settings.language': '語言',
    'settings.english': 'English',
    'settings.chinese': '中文',
    'settings.notifications': '通知',
    'settings.about': '關於',

    // Dashboard
    'dashboard.title': 'Alpha Factory',
    'dashboard.subtitle': 'SEC文件分析',
    'dashboard.companies': '公司',
    'dashboard.filings': '總文件數',
    'dashboard.recent_backtests': '最近回測',
    'dashboard.quick_start': '快速開始',

    // Backtest
    'backtest.title': '回測',
    'backtest.run': '執行回測',
    'backtest.running': '執行中...',
    'backtest.cagr': '年化報酬率',
    'backtest.sharpe': '夏普比率',
    'backtest.max_dd': '最大回撤',
    'backtest.hit_rate': '勝率',

    // Common
    'common.loading': '載入中...',
    'common.error': '錯誤',
    'common.retry': '重試',
    'common.cancel': '取消',
    'common.save': '儲存',
    'common.na': '無',
    'common.billion': '十億',
    'common.million': '百萬',
  },
} as const;

// ============================================
// Types
// ============================================

type TranslationKey = keyof typeof translations.en;

// ============================================
// Translation Function
// ============================================

export function translate(
  key: TranslationKey,
  language: Language,
  params?: Record<string, string | number>
): string {
  const dict = translations[language];
  let text = dict[key] || translations.en[key] || key;

  // Replace parameters like {count}
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(`{${paramKey}}`, String(value));
    });
  }

  return text;
}

// ============================================
// Shorthand function creator
// ============================================

export function createTranslator(language: Language) {
  return (key: TranslationKey, params?: Record<string, string | number>) =>
    translate(key, language, params);
}

// ============================================
// Export translations for type safety
// ============================================

export type { TranslationKey };
export { translations };
