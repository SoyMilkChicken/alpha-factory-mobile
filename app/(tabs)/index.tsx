/**
 * Alpha Factory Mobile - Dashboard Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useSettings } from '../../contexts/SettingsContext';
import DashboardEmptyState from '../../components/DashboardEmptyState';
import { mockCompanies } from '../../mocks/data';

function StatCard({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) {
  return (
    <View className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
      <Text className="text-sm text-gray-500">{title}</Text>
      <Text className="text-2xl font-bold text-gray-900 mt-1">{value}</Text>
      {subtitle && <Text className="text-xs text-gray-400 mt-1">{subtitle}</Text>}
    </View>
  );
}

export default function DashboardScreen() {
  const { t, settings, tickers, isBeginnerMode, isIntermediateMode, isAdvancedMode } = useSettings();
  const isZh = settings.language === 'zh';

  // Show empty state if no tickers
  if (!tickers || tickers.length === 0) {
    return (
      <ScrollView className="flex-1 bg-white">
        <DashboardEmptyState />
      </ScrollView>
    );
  }

  // Get tracked companies
  const trackedCompanies = mockCompanies.filter((c) => tickers.includes(c.ticker));
  const totalFilings = trackedCompanies.reduce((acc, c) => acc + c.filing_count, 0);

  // Get mode label
  const getModeLabel = () => {
    if (isBeginnerMode) return isZh ? '🎓 新手模式' : '🎓 Beginner Mode';
    if (isIntermediateMode) return isZh ? '📈 中級模式' : '📈 Intermediate Mode';
    if (isAdvancedMode) return isZh ? '⚛️ 進階模式' : '⚛️ Advanced Mode';
    return '';
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Mode Badge */}
        <View className="bg-blue-50 rounded-lg p-3 mb-4">
          <Text className="text-blue-700 font-medium">{getModeLabel()}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          <StatCard 
            title={isZh ? '公司' : 'Companies'} 
            value={tickers.length} 
            subtitle="In universe"
          />
          <StatCard 
            title={isZh ? '總文件數' : 'Total Filings'} 
            value={totalFilings} 
            subtitle="10-K & 10-Q"
          />
        </View>

        {/* Quick Actions */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          {isZh ? '快速開始' : 'Quick Start'}
        </Text>

        <View className="flex-row gap-3 mb-6">
          <Link href="/(tabs)/companies" asChild>
            <TouchableOpacity className="flex-1 bg-black rounded-xl p-4">
              <Text className="text-white font-semibold">Browse Companies</Text>
              <Text className="text-gray-400 text-sm mt-1">View SEC filings →</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/backtest" asChild>
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl p-4">
              <Text className="text-gray-900 font-semibold">Run Backtest</Text>
              <Text className="text-gray-500 text-sm mt-1">Test strategies →</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Company List */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">Your Portfolio</Text>

        {trackedCompanies.map((company) => (
          <Link key={company.id} href={`/companies/${company.ticker}`} asChild>
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-3">
                  <Text className="font-bold text-gray-700">{company.ticker.slice(0, 2)}</Text>
                </View>
                <View>
                  <Text className="font-semibold text-gray-900">{company.ticker}</Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>{company.name}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-sm font-medium text-gray-900">{company.filing_count}</Text>
                <Text className="text-xs text-gray-500">{isZh ? '文件' : 'filings'}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}

        {/* Tickers not in mock data */}
        {tickers.filter((t) => !trackedCompanies.find((c) => c.ticker === t)).map((ticker) => (
          <View key={ticker} className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-3">
                <Text className="font-bold text-gray-700">{ticker.slice(0, 2)}</Text>
              </View>
              <Text className="font-semibold text-gray-900">{ticker}</Text>
            </View>
            <Text className="text-xs text-gray-400">{isZh ? '載入中...' : 'Loading...'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}