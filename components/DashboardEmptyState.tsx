/**
 * Dashboard Empty State
 * Shows when no tickers are tracked
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {
  Sparkles,
  Search,
  TrendingUp,
  Briefcase,
  ChevronRight,
} from 'lucide-react-native';
import { useSettings } from '../contexts/SettingsContext';

function DashboardEmptyState() {
  const { loadFAANGPortfolio, loadStanPortfolio, settings } = useSettings();
  const isZh = settings.language === 'zh';

  return (
    <View className="flex-1 px-4 py-8">
      {/* Welcome Card */}
      <View className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-black rounded-xl items-center justify-center mr-4">
            <Sparkles size={24} color="#ffffff" strokeWidth={1.5} />
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              {isZh ? '歡迎使用 Alpha Factory' : 'Welcome to Alpha Factory'}
            </Text>
          </View>
        </View>

        <Text className="text-base text-gray-600 leading-6 mb-6">
          {isZh
            ? '開始追蹤公司以分析其SEC文件並獲得投資見解。'
            : 'Start tracking companies to analyze their SEC filings and get investment insights.'}
        </Text>

        {/* Primary: Search */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/companies')}
          className="bg-black flex-row items-center justify-center py-4 rounded-xl mb-3"
        >
          <Search size={20} color="#ffffff" strokeWidth={1.5} />
          <Text className="text-white font-semibold text-base ml-2">
            {isZh ? '搜尋股票' : 'Search Ticker'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Start */}
      <Text className="text-lg font-semibold text-gray-900 mb-3">
        {isZh ? '快速開始' : 'Quick Start'}
      </Text>

      {/* FAANG */}
      <TouchableOpacity
        onPress={loadFAANGPortfolio}
        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center"
      >
        <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-4">
          <TrendingUp size={20} color="#2563eb" strokeWidth={1.5} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900">
            {isZh ? 'FAANG 投資組合' : 'FAANG Portfolio'}
          </Text>
          <Text className="text-sm text-gray-500">AAPL, AMZN, GOOGL, META, MSFT</Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" strokeWidth={1.5} />
      </TouchableOpacity>

      {/* Stan's Portfolio */}
      <TouchableOpacity
        onPress={loadStanPortfolio}
        className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center"
      >
        <View className="w-10 h-10 bg-green-100 rounded-lg items-center justify-center mr-4">
          <Briefcase size={20} color="#16a34a" strokeWidth={1.5} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900">
            {isZh ? '科技成長組合' : 'Tech Growth Portfolio'}
          </Text>
          <Text className="text-sm text-gray-500">NVDA, TSM, META, GOOG, FTNT, SOFI, KO</Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardEmptyState;