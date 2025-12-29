/**
 * Info Tooltip - Tap to learn more about a term
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../contexts/SettingsContext';

interface InfoTooltipProps {
  termKey: string;
  size?: number;
}

// Educational content for beginners
const explanations: Record<string, { en: string; zh: string; example?: { en: string; zh: string } }> = {
  backtest: {
    en: "A backtest simulates how a trading strategy would have performed using historical data. It's like a 'practice run' to see if your investment idea would have made money in the past.",
    zh: "回測是使用歷史數據模擬交易策略的表現。就像「練習」一樣，看看你的投資想法在過去是否會賺錢。",
    example: {
      en: "Example: If you tested buying stocks when their SEC filings showed positive changes, the backtest shows how much you would have gained or lost over the past 5 years.",
      zh: "例如：如果你測試在SEC文件顯示正面變化時買入股票，回測會顯示過去5年你會賺多少或虧多少。"
    }
  },
  cagr: {
    en: "CAGR (Compound Annual Growth Rate) is your average yearly return, accounting for compounding. It tells you how much your investment grew per year on average.",
    zh: "CAGR（複合年增長率）是考慮複利後的平均年回報。它告訴你投資平均每年增長多少。",
    example: {
      en: "Example: 15% CAGR means your investment grew by 15% per year on average. $10,000 would become ~$20,000 in 5 years.",
      zh: "例如：15% CAGR 表示你的投資平均每年增長15%。$10,000 在5年後會變成約 $20,000。"
    }
  },
  sharpe: {
    en: "The Sharpe Ratio measures risk-adjusted returns. It shows how much extra return you get for the risk you're taking. Higher is better!",
    zh: "夏普比率衡量風險調整後的回報。它顯示你承擔的風險能獲得多少額外回報。越高越好！",
    example: {
      en: "Example: Sharpe > 1.0 is good, > 2.0 is excellent. It means you're getting decent returns without taking crazy risks.",
      zh: "例如：夏普 > 1.0 是好的，> 2.0 是優秀。這表示你在不承擔過大風險的情況下獲得不錯的回報。"
    }
  },
  maxDrawdown: {
    en: "Max Drawdown is the biggest drop from a peak to a low point. It shows the worst-case scenario - how much you could have lost at the worst time.",
    zh: "最大回撤是從最高點到最低點的最大跌幅。它顯示最壞情況——你在最糟糕時刻可能損失多少。",
    example: {
      en: "Example: -20% max drawdown means at the worst point, your portfolio dropped 20% from its highest value before recovering.",
      zh: "例如：-20% 最大回撤表示在最糟糕的時刻，你的投資組合從最高值下跌了20%，之後才恢復。"
    }
  },
  hitRate: {
    en: "Hit Rate is the percentage of trades that made money. It shows how often your strategy picks winners.",
    zh: "勝率是獲利交易的百分比。它顯示你的策略多常選中贏家。",
    example: {
      en: "Example: 60% hit rate means 6 out of 10 trades made money. Even 55% can be profitable if winners are bigger than losers!",
      zh: "例如：60% 勝率表示10筆交易中有6筆賺錢。即使55%也能獲利，只要贏的比輸的多！"
    }
  },
  novelty: {
    en: "Novelty Score measures how much the text changed between SEC filings. Higher scores mean more new content was added.",
    zh: "新穎度分數衡量SEC文件之間文字變化了多少。分數越高表示添加了更多新內容。",
    example: {
      en: "Example: 25% novelty in Risk Factors might indicate new risks the company is disclosing - worth reading carefully!",
      zh: "例如：風險因素中25%的新穎度可能表示公司正在披露新風險——值得仔細閱讀！"
    }
  },
  secFiling: {
    en: "SEC Filings are official documents that public companies must submit to the U.S. Securities and Exchange Commission. 10-K is the annual report, 10-Q is quarterly.",
    zh: "SEC文件是上市公司必須向美國證券交易委員會提交的官方文件。10-K是年度報告，10-Q是季度報告。",
    example: {
      en: "Example: When NVIDIA files a 10-K, they disclose their full year financials, risks, and business strategy.",
      zh: "例如：當NVIDIA提交10-K時，他們會披露全年財務、風險和商業策略。"
    }
  },
  compositeSignal: {
    en: "The Composite Signal combines multiple factors (text changes, financial metrics, growth) into one score. Positive = bullish, Negative = bearish.",
    zh: "綜合信號將多個因素（文字變化、財務指標、增長）組合成一個分數。正數 = 看漲，負數 = 看跌。",
    example: {
      en: "Example: A signal of +1.5 suggests the company looks favorable based on our analysis. -1.5 would be concerning.",
      zh: "例如：+1.5 的信號表示根據我們的分析，該公司看起來有利。-1.5 則令人擔憂。"
    }
  },
};

export function InfoTooltip({ termKey, size = 18 }: InfoTooltipProps) {
  const [visible, setVisible] = useState(false);
  const { settings, isBeginnerMode } = useSettings();
  const isZh = settings.language === 'zh';

  // Only show in beginner mode
  if (!isBeginnerMode) return null;

  const content = explanations[termKey];
  if (!content) return null;

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} className="ml-1">
        <Ionicons name="help-circle-outline" size={size} color="#6b7280" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-center items-center p-6"
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Ionicons name="school-outline" size={24} color="#3b82f6" />
                <Text className="text-lg font-bold text-gray-900 ml-2">
                  {isZh ? '學習' : 'Learn'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-80">
              <Text className="text-base text-gray-700 leading-6 mb-4">
                {isZh ? content.zh : content.en}
              </Text>

              {content.example && (
                <View className="bg-blue-50 rounded-lg p-4">
                  <Text className="text-sm text-blue-800 leading-5">
                    {isZh ? content.example.zh : content.example.en}
                  </Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              className="bg-black rounded-xl py-3 mt-4"
            >
              <Text className="text-white font-semibold text-center">
                {isZh ? '知道了' : 'Got it'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default InfoTooltip;