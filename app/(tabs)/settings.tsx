/**
 * Alpha Factory Mobile - Settings Screen
 * 3 expertise levels + reset button
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Sprout, TrendingUp, Atom, Check, RefreshCw, Trash2 } from 'lucide-react-native';
import { useSettings, ViewMode } from '../../contexts/SettingsContext';
import { Alert } from 'react-native';

const EXPERTISE_OPTIONS: { key: ViewMode; icon: any; title_en: string; title_zh: string; desc_en: string; desc_zh: string }[] = [
  {
    key: 'beginner',
    icon: Sprout,
    title_en: 'Beginner',
    title_zh: '初學者',
    desc_en: 'Simplified tips & Buy/Sell signals',
    desc_zh: '簡化提示和買賣信號',
  },
  {
    key: 'intermediate',
    icon: TrendingUp,
    title_en: 'Intermediate',
    title_zh: '中級',
    desc_en: 'Charts & key metrics (P/E, Market Cap)',
    desc_zh: '圖表和關鍵指標',
  },
  {
    key: 'advanced',
    icon: Atom,
    title_en: 'Advanced',
    title_zh: '進階',
    desc_en: 'Raw SEC diffs, Z-scores & XBRL tags',
    desc_zh: '原始SEC差異和XBRL標籤',
  },
];

export default function SettingsScreen() {
  const {
    t,
    settings,
    setViewMode,
    setLanguage,
    setNotificationsEnabled,
    clearAllTickers,
  } = useSettings();

  const isZh = settings.language === 'zh';

  // Reset onboarding and go back to tutorial
  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem('@alpha_factory_onboarded');
    router.replace('/onboarding');
  };

  // Clear all data and reset
  // Clear all data and reset
const handleClearAllData = async () => {
  Alert.alert(
    isZh ? '重置所有數據' : 'Reset All Data',
    isZh ? '這將清除所有設定和股票。確定嗎？' : 'This will clear all settings and stocks. Are you sure?',
    [
      { text: isZh ? '取消' : 'Cancel', style: 'cancel' },
      {
        text: isZh ? '重置' : 'Reset',
        style: 'destructive',
        onPress: async () => {
          // Clear all AsyncStorage
          await AsyncStorage.removeItem('@alpha_factory_onboarded');
          await AsyncStorage.removeItem('@alpha_factory_settings');
          await AsyncStorage.removeItem('@alpha_factory_tickers');
          // Clear state
          clearAllTickers();
          // Go to onboarding
          router.replace('/onboarding');
        },
      },
    ]
  );
};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Expertise Level - 3 OPTIONS */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {isZh ? '經驗等級' : 'Experience Level'}
        </Text>

        {EXPERTISE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = settings.viewMode === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              onPress={() => setViewMode(option.key)}
              className={`p-4 rounded-xl border-2 mb-3 ${
                isSelected ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-lg items-center justify-center mr-3 ${
                  isSelected ? 'bg-black' : 'bg-gray-100'
                }`}>
                  <Icon size={20} color={isSelected ? '#ffffff' : '#374151'} strokeWidth={1.5} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">
                    {isZh ? option.title_zh : option.title_en}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {isZh ? option.desc_zh : option.desc_en}
                  </Text>
                </View>
                {isSelected && (
                  <View className="w-6 h-6 bg-black rounded-full items-center justify-center">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Language */}
        <Text className="text-lg font-semibold text-gray-900 mb-4 mt-6">
          {isZh ? '語言' : 'Language'}
        </Text>

        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            onPress={() => setLanguage('en')}
            className={`flex-1 p-4 rounded-xl border-2 flex-row items-center justify-center ${
              settings.language === 'en' ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            <Text className="text-xl mr-2">🇺🇸</Text>
            <Text className="font-semibold">English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLanguage('zh')}
            className={`flex-1 p-4 rounded-xl border-2 flex-row items-center justify-center ${
              settings.language === 'zh' ? 'border-black bg-gray-50' : 'border-gray-200'
            }`}
          >
            <Text className="text-xl mr-2">🇹🇼</Text>
            <Text className="font-semibold">中文</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {isZh ? '通知' : 'Notifications'}
        </Text>

        <View className="flex-row items-center justify-between py-4 border-b border-gray-100 mb-6">
          <Text className="text-base text-gray-900">{isZh ? '推送通知' : 'Push Notifications'}</Text>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#d1d5db', true: '#000000' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* About */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {isZh ? '關於' : 'About'}
        </Text>

        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="font-semibold text-gray-900">Alpha Factory</Text>
          <Text className="text-sm text-gray-500 mt-1">Version 1.0.0</Text>
          <Text className="text-sm text-gray-400 mt-2">Built by Stan Feng</Text>
        </View>

        {/* Reset Section */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {isZh ? '重設' : 'Reset'}
        </Text>

        {/* Restart Tutorial */}
        <TouchableOpacity
          onPress={handleResetOnboarding}
          className="bg-gray-100 rounded-xl p-4 mb-3 flex-row items-center"
        >
          <View className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center mr-3">
            <RefreshCw size={20} color="#374151" strokeWidth={1.5} />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-gray-900">
              {isZh ? '重新開始教學' : 'Restart Tutorial'}
            </Text>
            <Text className="text-sm text-gray-500">
              {isZh ? '再次查看入門指南' : 'View the onboarding guide again'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Clear All Tickers */}
        <TouchableOpacity
          onPress={clearAllTickers}
          className="bg-orange-50 rounded-xl p-4 mb-3 flex-row items-center border border-orange-100"
        >
          <View className="w-10 h-10 bg-orange-100 rounded-lg items-center justify-center mr-3">
            <Trash2 size={20} color="#ea580c" strokeWidth={1.5} />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-orange-700">
              {isZh ? '清除所有股票' : 'Clear All Tickers'}
            </Text>
            <Text className="text-sm text-orange-600">
              {isZh ? '移除所有追蹤的股票' : 'Remove all tracked stocks'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Reset Everything */}
        <TouchableOpacity
          onPress={handleClearAllData}
          className="bg-red-50 rounded-xl p-4 mb-8 flex-row items-center border border-red-100"
        >
          <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-3">
            <Trash2 size={20} color="#dc2626" strokeWidth={1.5} />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-red-700">
              {isZh ? '重置所有數據' : 'Reset All Data'}
            </Text>
            <Text className="text-sm text-red-600">
              {isZh ? '清除所有設定並重新開始' : 'Clear all settings and start fresh'}
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}