/**
 * Alpha Factory Mobile - Backtest Screen
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useSettings } from '../../contexts/SettingsContext';
import InfoTooltip from '../../components/InfoTooltip';

export default function BacktestScreen() {
  const { t } = useSettings();
  const [tickers, setTickers] = useState('NVDA, TSM, META, GOOG');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runBacktest = async () => {
    setIsRunning(true);
    // Simulate backtest
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setResults({
      cagr: 0.234,
      sharpe: 1.85,
      maxDrawdown: -0.156,
      hitRate: 0.62,
    });
    setIsRunning(false);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header with Backtest explanation */}
        <View className="mb-6">
          <View className="flex-row items-center mb-3">
            <Text className="text-lg font-semibold text-gray-900">Configuration</Text>
            <InfoTooltip termKey="backtest" />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Tickers</Text>
            <TextInput
              value={tickers}
              onChangeText={setTickers}
              placeholder="AAPL, MSFT, GOOGL..."
              placeholderTextColor="#9ca3af"
              className="bg-gray-100 px-4 py-3 rounded-xl text-gray-900"
              multiline
            />
          </View>

          <TouchableOpacity
            onPress={runBacktest}
            disabled={isRunning}
            className={`py-4 rounded-xl items-center ${isRunning ? 'bg-gray-300' : 'bg-black'}`}
          >
            {isRunning ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="#fff" size="small" />
                <Text className="text-white font-semibold ml-2">{t('backtest.running')}</Text>
              </View>
            ) : (
              <Text className="text-white font-semibold">{t('backtest.run')}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Results Section */}
        {results && (
          <View>
            <Text className="text-lg font-semibold text-gray-900 mb-3">Results</Text>

            <View className="flex-row flex-wrap gap-3">
              {/* CAGR */}
              <View className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-500">{t('backtest.cagr')}</Text>
                  <InfoTooltip termKey="cagr" />
                </View>
                <Text className={`text-2xl font-bold ${results.cagr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(results.cagr * 100).toFixed(1)}%
                </Text>
              </View>

              {/* Sharpe Ratio */}
              <View className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-500">{t('backtest.sharpe')}</Text>
                  <InfoTooltip termKey="sharpe" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{results.sharpe.toFixed(2)}</Text>
              </View>

              {/* Max Drawdown */}
              <View className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-500">{t('backtest.max_dd')}</Text>
                  <InfoTooltip termKey="maxDrawdown" />
                </View>
                <Text className="text-2xl font-bold text-red-600">
                  {(results.maxDrawdown * 100).toFixed(1)}%
                </Text>
              </View>

              {/* Hit Rate */}
              <View className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-500">{t('backtest.hit_rate')}</Text>
                  <InfoTooltip termKey="hitRate" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">
                  {(results.hitRate * 100).toFixed(0)}%
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}