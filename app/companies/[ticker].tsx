/**
 * Alpha Factory Mobile - Company Detail Screen
 * Route: app/companies/[ticker].tsx
 * Tabs: Filings | Diffs | Fundamentals | Tips
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useSettings } from '../../contexts/SettingsContext';
import DiffViewer from '../../components/DiffViewer';
import {
  Company,
  Filing,
  FilingDiff,
  Feature,
  InvestmentTip,
  CompanyTabKey,
} from '../../types';
import {
  mockCompanies,
  mockFilings,
  mockDiffs,
  mockFeatures,
  getTipsByTicker,
} from '../../mocks/data';

// ============================================
// Tab Button Component
// ============================================

function TabButton({ label, isActive, onPress, count }: {
  label: string;
  isActive: boolean;
  onPress: () => void;
  count?: number;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-3 border-b-2 ${isActive ? 'border-black' : 'border-transparent'}`}
    >
      <Text className={`text-sm font-medium ${isActive ? 'text-black' : 'text-gray-500'}`}>
        {label} {count !== undefined && `(${count})`}
      </Text>
    </TouchableOpacity>
  );
}

// ============================================
// Filings Tab
// ============================================

function FilingsTab({ filings }: { filings: Filing[] }) {
  const { t } = useSettings();

  if (filings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-gray-500">{t('company.no_filings')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: filing }) => (
        <View className="p-4 border-b border-gray-100 bg-white">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className={`px-2 py-1 rounded mr-3 ${filing.form_type === '10-K' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <Text className={`text-xs font-semibold ${filing.form_type === '10-K' ? 'text-blue-700' : 'text-green-700'}`}>
                  {filing.form_type}
                </Text>
              </View>
              <View>
                <Text className="font-mono text-sm text-gray-900">{filing.accession_no}</Text>
                <Text className="text-xs text-gray-500 mt-1">
                  {t('filing.filed')}: {filing.filing_date} • {t('filing.report_date')}: {filing.report_date}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL(filing.primary_doc_url)} className="px-3 py-2">
              <Text className="text-sm text-blue-600">{t('company.view_on_sec')} →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

// ============================================
// Diffs Tab
// ============================================

function DiffsTab({ diffs }: { diffs: FilingDiff[] }) {
  const { t } = useSettings();
  const [selectedDiff, setSelectedDiff] = useState<FilingDiff | null>(null);

  if (diffs.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-gray-500">{t('company.no_diffs')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-gray-50 border-b border-gray-200">
        <View className="flex-row p-2 gap-2">
          {diffs.map((diff) => (
            <TouchableOpacity
              key={diff.id}
              onPress={() => setSelectedDiff(diff)}
              className={`px-4 py-2 rounded-lg ${selectedDiff?.id === diff.id ? 'bg-black' : 'bg-white border border-gray-200'}`}
            >
              <Text className={`text-sm font-medium ${selectedDiff?.id === diff.id ? 'text-white' : 'text-gray-700'}`}>
                {diff.section_key}
              </Text>
              <Text className={`text-xs ${selectedDiff?.id === diff.id ? 'text-gray-300' : 'text-gray-500'}`}>
                {(diff.novelty_score * 100).toFixed(1)}% {t('diff.novelty')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {selectedDiff ? (
        <DiffViewer diff={selectedDiff} maxHeight={500} />
      ) : (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-gray-500">{t('diff.select_diff')}</Text>
        </View>
      )}
    </View>
  );
}

// ============================================
// Fundamentals Tab
// ============================================

function FundamentalsTab({ features }: { features: Feature[] }) {
  const { t, isBeginnerMode } = useSettings();

  const formatValue = (value: number | null, type: 'currency' | 'percent' | 'ratio') => {
    if (value === null) return t('common.na');
    switch (type) {
      case 'currency':
        if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
        if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
        return `$${value.toLocaleString()}`;
      case 'percent':
        return `${(value * 100).toFixed(1)}%`;
      case 'ratio':
        return value.toFixed(2);
    }
  };

  if (features.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-gray-500">{t('company.no_features')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={features}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: feature }) => (
        <View className="p-4 bg-white border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-semibold text-lg text-gray-900">{feature.fiscal_period}</Text>
            <Text className="text-sm text-gray-500">{feature.asof_date}</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            <View className="bg-gray-50 rounded-lg p-3 flex-1 min-w-[45%]">
              <Text className="text-xs text-gray-500">{t('fundamental.revenue')}</Text>
              <Text className="text-lg font-semibold text-gray-900">
                {formatValue(feature.feature_json.revenues, 'currency')}
              </Text>
            </View>
            <View className="bg-gray-50 rounded-lg p-3 flex-1 min-w-[45%]">
              <Text className="text-xs text-gray-500">{t('fundamental.net_income')}</Text>
              <Text className="text-lg font-semibold text-gray-900">
                {formatValue(feature.feature_json.net_income_loss, 'currency')}
              </Text>
            </View>
            <View className="bg-gray-50 rounded-lg p-3 flex-1 min-w-[45%]">
              <Text className="text-xs text-gray-500">{t('fundamental.yoy_growth')}</Text>
              <Text className={`text-lg font-semibold ${(feature.feature_json.yoy_growth_revenues ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatValue(feature.feature_json.yoy_growth_revenues, 'percent')}
              </Text>
            </View>
            <View className="bg-gray-50 rounded-lg p-3 flex-1 min-w-[45%]">
              <Text className="text-xs text-gray-500">{t('fundamental.profitability')}</Text>
              <Text className="text-lg font-semibold text-gray-900">
                {formatValue(feature.feature_json.profitability, 'percent')}
              </Text>
            </View>
          </View>
          {!isBeginnerMode && (
            <View className="mt-4 pt-4 border-t border-gray-100">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">{t('fundamental.signal')}</Text>
                <View className={`px-3 py-1 rounded-full ${(feature.feature_json.composite_signal ?? 0) > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Text className={`font-semibold ${(feature.feature_json.composite_signal ?? 0) > 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {(feature.feature_json.composite_signal ?? 0) > 0 ? '+' : ''}
                    {feature.feature_json.composite_signal?.toFixed(2) ?? t('common.na')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    />
  );
}

// ============================================
// Tips Tab (New Feature)
// ============================================

function TipsTab({ tips }: { tips: InvestmentTip[] }) {
  const { t, settings } = useSettings();
  const isZh = settings.language === 'zh';

  const getCategoryStyle = (category: InvestmentTip['category']) => {
    switch (category) {
      case 'risk':
        return { bg: 'bg-red-100', text: 'text-red-700', emoji: '⚠️' };
      case 'opportunity':
        return { bg: 'bg-green-100', text: 'text-green-700', emoji: '💡' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', emoji: '📊' };
    }
  };

  if (tips.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Text className="text-gray-500">{t('tips.no_tips')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item: tip }) => {
        const style = getCategoryStyle(tip.category);
        return (
          <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <View className={`flex-row items-center justify-between p-4 ${style.bg}`}>
              <View className="flex-row items-center">
                <Text className="text-xl mr-2">{style.emoji}</Text>
                <Text className={`font-semibold ${style.text}`}>{t(`tips.${tip.category}`)}</Text>
              </View>
              <View className="bg-white/50 px-2 py-1 rounded">
                <Text className="text-xs text-gray-600">{t(`tips.${tip.complexity_level.toLowerCase()}`)}</Text>
              </View>
            </View>
            <View className="p-4">
              <Text className="text-base text-gray-800 leading-6">
                {isZh ? tip.explanation_zh : tip.explanation_en}
              </Text>
              <View className="flex-row items-center mt-4 pt-4 border-t border-gray-100">
                <Text className="text-xs text-gray-500">{t('tips.confidence')}: </Text>
                <View className="flex-1 h-2 bg-gray-200 rounded-full ml-2">
                  <View
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${tip.confidence_score * 100}%` }}
                  />
                </View>
                <Text className="text-xs text-gray-600 ml-2">
                  {(tip.confidence_score * 100).toFixed(0)}%
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

// ============================================
// Main Screen Component
// ============================================

export default function CompanyDetailScreen() {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const { t } = useSettings();
  const [activeTab, setActiveTab] = useState<CompanyTabKey>('filings');
  const [isLoading, setIsLoading] = useState(true);

  // Data state
  const [company, setCompany] = useState<Company | null>(null);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [diffs, setDiffs] = useState<FilingDiff[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [tips, setTips] = useState<InvestmentTip[]>([]);

  useEffect(() => {
    loadData();
  }, [ticker]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // In production, replace with API calls
      const foundCompany = mockCompanies.find((c) => c.ticker === ticker?.toUpperCase());
      setCompany(foundCompany ?? null);
      setFilings(mockFilings[ticker?.toUpperCase() ?? ''] ?? []);
      setDiffs(mockDiffs[ticker?.toUpperCase() ?? ''] ?? []);
      setFeatures(mockFeatures[ticker?.toUpperCase() ?? ''] ?? []);
      setTips(getTipsByTicker(ticker ?? ''));
    } catch (error) {
      console.error('Failed to load company data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-500">{t('common.loading')}</Text>
      </View>
    );
  }

  if (!company) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Company not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: company.ticker, headerBackTitle: 'Back' }} />

      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-100">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center mr-4">
            <Text className="text-2xl font-bold text-gray-900">{company.ticker.slice(0, 2)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">{company.ticker}</Text>
            <Text className="text-sm text-gray-500 mt-1">{company.name}</Text>
            <Text className="text-xs text-gray-400 mt-1">
              {t('company.filings_count', { count: filings.length })} •{' '}
              {t('company.diffs_count', { count: diffs.length })} •{' '}
              {t('company.quarters_count', { count: features.length })}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-gray-200">
        <TabButton
          label={t('tab.filings')}
          isActive={activeTab === 'filings'}
          onPress={() => setActiveTab('filings')}
          count={filings.length}
        />
        <TabButton
          label={t('tab.diffs')}
          isActive={activeTab === 'diffs'}
          onPress={() => setActiveTab('diffs')}
          count={diffs.length}
        />
        <TabButton
          label={t('tab.fundamentals')}
          isActive={activeTab === 'fundamentals'}
          onPress={() => setActiveTab('fundamentals')}
          count={features.length}
        />
        <TabButton
          label={t('tab.tips')}
          isActive={activeTab === 'tips'}
          onPress={() => setActiveTab('tips')}
          count={tips.length}
        />
      </View>

      {/* Tab Content */}
      <View className="flex-1">
        {activeTab === 'filings' && <FilingsTab filings={filings} />}
        {activeTab === 'diffs' && <DiffsTab diffs={diffs} />}
        {activeTab === 'fundamentals' && <FundamentalsTab features={features} />}
        {activeTab === 'tips' && <TipsTab tips={tips} />}
      </View>
    </View>
  );
}
