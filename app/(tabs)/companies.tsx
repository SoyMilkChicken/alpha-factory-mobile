/**
 * Alpha Factory Mobile - Companies List Screen
 * Search and add tickers
 */

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Link } from 'expo-router';
import { Search, Plus, X, Check, Trash2 } from 'lucide-react-native';
import { useSettings } from '../../contexts/SettingsContext';
import { mockCompanies } from '../../mocks/data';

export default function CompaniesScreen() {
  const { t, settings, tickers, addTicker, removeTicker } = useSettings();
  const isZh = settings.language === 'zh';
  
  const [search, setSearch] = useState('');
  const [newTicker, setNewTicker] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  // Filter companies based on search
  const filtered = mockCompanies.filter(
    (c) =>
      c.ticker.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Check if ticker is already tracked
  const isTracked = (ticker: string) => tickers.includes(ticker.toUpperCase());

  // Handle adding a new ticker
  const handleAddTicker = () => {
    const ticker = newTicker.toUpperCase().trim();
    if (!ticker) {
      Alert.alert(
        isZh ? '錯誤' : 'Error',
        isZh ? '請輸入股票代碼' : 'Please enter a ticker symbol'
      );
      return;
    }
    if (tickers.includes(ticker)) {
      Alert.alert(
        isZh ? '已存在' : 'Already Exists',
        isZh ? `${ticker} 已在您的投資組合中` : `${ticker} is already in your portfolio`
      );
      return;
    }
    addTicker(ticker);
    setNewTicker('');
    setShowAddInput(false);
    Alert.alert(
      isZh ? '已添加' : 'Added',
      isZh ? `${ticker} 已添加到您的投資組合` : `${ticker} has been added to your portfolio`
    );
  };

  // Handle removing a ticker
  const handleRemoveTicker = (ticker: string) => {
    Alert.alert(
      isZh ? '移除股票' : 'Remove Stock',
      isZh ? `確定要移除 ${ticker} 嗎？` : `Are you sure you want to remove ${ticker}?`,
      [
        { text: isZh ? '取消' : 'Cancel', style: 'cancel' },
        {
          text: isZh ? '移除' : 'Remove',
          style: 'destructive',
          onPress: () => removeTicker(ticker),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="p-4 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
          <Search size={20} color="#9ca3af" strokeWidth={1.5} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={isZh ? '搜尋股票代碼或公司名稱...' : 'Search ticker or company name...'}
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-3 text-gray-900"
            autoCapitalize="characters"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={20} color="#9ca3af" strokeWidth={1.5} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Add Custom Ticker */}
      <View className="px-4 py-3 border-b border-gray-100">
        {showAddInput ? (
          <View className="flex-row items-center gap-2">
            <TextInput
              value={newTicker}
              onChangeText={setNewTicker}
              placeholder={isZh ? '輸入股票代碼 (例如: AAPL)' : 'Enter ticker (e.g., AAPL)'}
              placeholderTextColor="#9ca3af"
              className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-gray-900"
              autoCapitalize="characters"
              autoFocus
              onSubmitEditing={handleAddTicker}
            />
            <TouchableOpacity
              onPress={handleAddTicker}
              className="bg-black p-3 rounded-xl"
            >
              <Check size={20} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowAddInput(false);
                setNewTicker('');
              }}
              className="bg-gray-100 p-3 rounded-xl"
            >
              <X size={20} color="#374151" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowAddInput(true)}
            className="flex-row items-center justify-center bg-black py-3 rounded-xl"
          >
            <Plus size={20} color="#ffffff" strokeWidth={2} />
            <Text className="text-white font-semibold ml-2">
              {isZh ? '添加自定義股票' : 'Add Custom Ticker'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tracked Tickers Section */}
      {tickers.length > 0 && (
        <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            {isZh ? '已追蹤的股票' : 'Tracked Stocks'} ({tickers.length})
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {tickers.map((ticker) => (
              <TouchableOpacity
                key={ticker}
                onPress={() => handleRemoveTicker(ticker)}
                className="flex-row items-center bg-black px-3 py-2 rounded-lg"
              >
                <Text className="text-white font-medium mr-2">{ticker}</Text>
                <X size={14} color="#ffffff" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Company List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Text className="text-sm font-semibold text-gray-700">
              {isZh ? '可用公司' : 'Available Companies'}
            </Text>
          </View>
        }
        renderItem={({ item: company }) => {
          const tracked = isTracked(company.ticker);
          
          return (
            <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
              <Link href={`/companies/${company.ticker}`} asChild>
                <TouchableOpacity className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-lg font-bold text-gray-700">
                      {company.ticker.slice(0, 2)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 text-lg">{company.ticker}</Text>
                    <Text className="text-sm text-gray-500" numberOfLines={1}>
                      {company.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
              
              {/* Add/Remove Button */}
              <TouchableOpacity
                onPress={() => tracked ? handleRemoveTicker(company.ticker) : addTicker(company.ticker)}
                className={`p-3 rounded-xl ml-2 ${tracked ? 'bg-red-100' : 'bg-green-100'}`}
              >
                {tracked ? (
                  <Trash2 size={20} color="#dc2626" strokeWidth={1.5} />
                ) : (
                  <Plus size={20} color="#16a34a" strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-gray-500">
              {isZh ? '找不到公司' : 'No companies found'}
            </Text>
          </View>
        }
      />
    </View>
  );
}