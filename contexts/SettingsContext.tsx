/**
 * Alpha Factory Mobile - App Settings Context
 * 3 expertise levels + empty default tickers
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate } from '../lib/i18n';

// ============================================
// Types
// ============================================

export type ViewMode = 'beginner' | 'intermediate' | 'advanced';
export type Language = 'en' | 'zh';

export interface AppSettings {
  viewMode: ViewMode;
  language: Language;
  notificationsEnabled: boolean;
}

// FAANG tickers for quick start
export const FAANG_TICKERS = ['AAPL', 'AMZN', 'GOOGL', 'META', 'MSFT'];
export const STAN_PORTFOLIO = ['NVDA', 'TSM', 'META', 'GOOG', 'FTNT', 'SOFI', 'KO'];

// ============================================
// Default Settings
// ============================================

const DEFAULT_SETTINGS: AppSettings = {
  viewMode: 'beginner',
  language: 'en',
  notificationsEnabled: true,
};

// ============================================
// Context Type
// ============================================

interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
  // Settings
  setViewMode: (mode: ViewMode) => void;
  setLanguage: (lang: Language) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  // Tickers - DEFAULT IS EMPTY
  tickers: string[];
  addTicker: (ticker: string) => void;
  removeTicker: (ticker: string) => void;
  loadFAANGPortfolio: () => void;
  loadStanPortfolio: () => void;
  clearAllTickers: () => void;
  // Helpers
  isBeginnerMode: boolean;
  isIntermediateMode: boolean;
  isAdvancedMode: boolean;
  t: (key: Parameters<typeof translate>[0], params?: Record<string, string | number>) => string;
}

// ============================================
// Context
// ============================================

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// ============================================
// Storage Keys
// ============================================

const SETTINGS_KEY = '@alpha_factory_settings';
const TICKERS_KEY = '@alpha_factory_tickers';

// ============================================
// Provider Component
// ============================================

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [tickers, setTickers] = useState<string[]>([]); // DEFAULT EMPTY
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Persist when changed
  useEffect(() => {
    if (!isLoading) {
      saveSettings(settings);
    }
  }, [settings, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveTickers(tickers);
    }
  }, [tickers, isLoading]);

  const loadData = async () => {
    try {
      const [storedSettings, storedTickers] = await Promise.all([
        AsyncStorage.getItem(SETTINGS_KEY),
        AsyncStorage.getItem(TICKERS_KEY),
      ]);
      
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as Partial<AppSettings>;
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
      
      if (storedTickers) {
        setTickers(JSON.parse(storedTickers));
      }
      // If no stored tickers, stays as empty [] (maximum flexibility)
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const saveTickers = async (newTickers: string[]) => {
    try {
      await AsyncStorage.setItem(TICKERS_KEY, JSON.stringify(newTickers));
    } catch (error) {
      console.error('Failed to save tickers:', error);
    }
  };

  // Settings setters
  const setViewMode = useCallback((mode: ViewMode) => {
    setSettings((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setSettings((prev) => ({ ...prev, language: lang }));
  }, []);

  const setNotificationsEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, notificationsEnabled: enabled }));
  }, []);

  // Ticker management
  const addTicker = useCallback((ticker: string) => {
    const normalized = ticker.toUpperCase().trim();
    if (!normalized) return;
    setTickers((prev) => {
      if (prev.includes(normalized)) return prev;
      return [...prev, normalized];
    });
  }, []);

  const removeTicker = useCallback((ticker: string) => {
    const normalized = ticker.toUpperCase().trim();
    setTickers((prev) => prev.filter((t) => t !== normalized));
  }, []);

  const loadFAANGPortfolio = useCallback(() => {
    setTickers([...FAANG_TICKERS]);
  }, []);

  const loadStanPortfolio = useCallback(() => {
    setTickers([...STAN_PORTFOLIO]);
  }, []);

  const clearAllTickers = useCallback(() => {
    setTickers([]);
  }, []);

  // Helpers
  const isBeginnerMode = settings.viewMode === 'beginner';
  const isIntermediateMode = settings.viewMode === 'intermediate';
  const isAdvancedMode = settings.viewMode === 'advanced';

  const t = useCallback(
    (key: Parameters<typeof translate>[0], params?: Record<string, string | number>) =>
      translate(key, settings.language, params),
    [settings.language]
  );

  const value: SettingsContextType = {
    settings,
    isLoading,
    setViewMode,
    setLanguage,
    setNotificationsEnabled,
    tickers,
    addTicker,
    removeTicker,
    loadFAANGPortfolio,
    loadStanPortfolio,
    clearAllTickers,
    isBeginnerMode,
    isIntermediateMode,
    isAdvancedMode,
    t,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

// Default values when context is not available
const defaultContextValue: SettingsContextType = {
  settings: {
    viewMode: 'beginner',
    language: 'en',
    notificationsEnabled: true,
  },
  isLoading: true,
  setViewMode: () => {},
  setLanguage: () => {},
  setNotificationsEnabled: () => {},
  tickers: [],
  addTicker: () => {},
  removeTicker: () => {},
  loadFAANGPortfolio: () => {},
  loadStanPortfolio: () => {},
  clearAllTickers: () => {},
  isBeginnerMode: true,
  isIntermediateMode: false,
  isAdvancedMode: false,
  t: (key: string) => key,
};

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export default SettingsContext;