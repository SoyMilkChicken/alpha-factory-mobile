/**
 * Onboarding Screen - First-time user setup
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check } from 'lucide-react-native';
import { useSettings, ViewMode } from '../contexts/SettingsContext';

type Step = 'welcome' | 'language' | 'experience' | 'tutorial' | 'complete';

interface ExperienceLevel {
  key: ViewMode;
  title_en: string;
  title_zh: string;
  desc_en: string;
  desc_zh: string;
  icon: string;
}

// [FIX] REMOVED: const { ... } = useSettings(); <-- This was causing the crash

const experienceLevels: ExperienceLevel[] = [
  {
    key: 'beginner',
    title_en: 'New to Investing',
    title_zh: '投資新手',
    desc_en: "I'm just getting started and want to learn the basics",
    desc_zh: '我剛開始學習，想了解基礎知識',
    icon: '🌱',
  },
  {
    key: 'intermediate',
    title_en: 'Some Experience',
    title_zh: '有一些經驗',
    desc_en: "I understand stocks and want to learn about SEC filings",
    desc_zh: '我了解股票，想學習SEC文件分析',
    icon: '📈',
  },
  {
    key: 'advanced',
    title_en: 'Experienced Investor',
    title_zh: '經驗豐富的投資者',
    desc_en: "I'm familiar with fundamental analysis and want raw data",
    desc_zh: '我熟悉基本面分析，想要原始數據',
    icon: '🎯',
  },
];

const tutorialSlides = [
  {
    icon: '📄',
    title_en: 'SEC Filings',
    title_zh: 'SEC文件',
    content_en: 'Every public company must file reports with the SEC. We analyze these documents to find investment signals.',
    content_zh: '每家上市公司都必須向SEC提交報告。我們分析這些文件以找出投資信號。',
  },
  {
    icon: '🔍',
    title_en: 'Text Analysis',
    title_zh: '文字分析',
    content_en: 'We compare filings quarter-over-quarter to detect changes in risk factors, business strategy, and financial outlook.',
    content_zh: '我們逐季比較文件，檢測風險因素、商業策略和財務前景的變化。',
  },
  {
    icon: '⚡',
    title_en: 'Backtesting',
    title_zh: '回測',
    content_en: 'Test your investment ideas using historical data before risking real money.',
    content_zh: '在投入真金白銀之前，使用歷史數據測試你的投資想法。',
  },
  {
    icon: '💡',
    title_en: 'Investment Tips',
    title_zh: '投資提示',
    content_en: 'Get AI-generated insights in plain language, perfect for beginners learning the ropes.',
    content_zh: '獲得以簡單語言表達的AI生成見解，非常適合初學者。',
  },
];

export default function OnboardingScreen() {
  const { setLanguage, setViewMode, loadFAANGPortfolio, loadStanPortfolio } = useSettings();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'zh'>('en');
  const [selectedExperience, setSelectedExperience] = useState<ViewMode>('beginner');
  const [tutorialIndex, setTutorialIndex] = useState(0);

  const isZh = selectedLanguage === 'zh';

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('@alpha_factory_onboarded', 'true');
      
      setLanguage(selectedLanguage);
      setViewMode(selectedExperience);
  
      if (selectedExperience === 'beginner') {
        loadFAANGPortfolio();
      } else if (selectedExperience === 'intermediate') {
        loadStanPortfolio();
      }
  
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      router.replace('/(tabs)');
    }
  };

  const CheckMark = () => (
    <View className="w-7 h-7 bg-black rounded-full items-center justify-center">
      <Check size={16} color="#ffffff" strokeWidth={3} />
    </View>
  );

  if (step === 'welcome') {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <View className="flex-1 justify-center items-center p-8">
          <Text className="text-6xl mb-6">📊</Text>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
            Alpha Factory
          </Text>
          <Text className="text-lg text-gray-500 text-center mb-12">
            SEC Filing Analysis & Investment Insights
          </Text>
          <TouchableOpacity
            onPress={() => setStep('language')}
            className="bg-black w-full py-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-center text-lg">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'language') {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              Choose Your Language
            </Text>
            <Text className="text-base text-gray-500 text-center mb-8">
              選擇您的語言
            </Text>

            <TouchableOpacity
              onPress={() => setSelectedLanguage('en')}
              className={`p-6 rounded-xl border-2 mb-4 ${
                selectedLanguage === 'en' ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-3xl mr-4">🇺🇸</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">English</Text>
                  <Text className="text-sm text-gray-500">Default language</Text>
                </View>
                {selectedLanguage === 'en' && <CheckMark />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedLanguage('zh')}
              className={`p-6 rounded-xl border-2 ${
                selectedLanguage === 'zh' ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-3xl mr-4">🇹🇼</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">繁體中文</Text>
                  <Text className="text-sm text-gray-500">Traditional Chinese</Text>
                </View>
                {selectedLanguage === 'zh' && <CheckMark />}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <View className="px-8 pb-8">
            <TouchableOpacity
              onPress={() => setStep('experience')}
              className="bg-black py-4 rounded-xl"
            >
              <Text className="text-white font-semibold text-center text-lg">
                {isZh ? '繼續' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (step === 'experience') {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, padding: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            {isZh ? '您的投資經驗' : 'Your Investment Experience'}
          </Text>
          <Text className="text-base text-gray-500 text-center mb-8">
            {isZh ? '這幫助我們個性化您的體驗' : 'This helps us personalize your experience'}
          </Text>

          {experienceLevels.map((level) => (
            <TouchableOpacity
              key={level.key}
              onPress={() => setSelectedExperience(level.key)}
              className={`p-5 rounded-xl border-2 mb-4 ${
                selectedExperience === level.key ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-3xl mr-4">{level.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {isZh ? level.title_zh : level.title_en}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1">
                    {isZh ? level.desc_zh : level.desc_en}
                  </Text>
                </View>
                {selectedExperience === level.key && <CheckMark />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row gap-4 px-8 pb-8">
          <TouchableOpacity
            onPress={() => setStep('language')}
            className="flex-1 bg-gray-100 py-4 rounded-xl"
          >
            <Text className="text-gray-700 font-semibold text-center">
              {isZh ? '返回' : 'Back'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStep(selectedExperience === 'advanced' ? 'complete' : 'tutorial')}
            className="flex-1 bg-black py-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-center">
              {isZh ? '繼續' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'tutorial') {
    const slide = tutorialSlides[tutorialIndex];
    const isLast = tutorialIndex === tutorialSlides.length - 1;

    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <View className="flex-1 justify-center items-center p-8">
          <Text className="text-6xl mb-8">{slide.icon}</Text>
          <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
            {isZh ? slide.title_zh : slide.title_en}
          </Text>
          <Text className="text-lg text-gray-600 text-center leading-7 px-4">
            {isZh ? slide.content_zh : slide.content_en}
          </Text>
        </View>

        <View className="flex-row justify-center mb-8">
          {tutorialSlides.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === tutorialIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>

        <View className="flex-row gap-4 px-8 pb-8">
          <TouchableOpacity
            onPress={() => tutorialIndex > 0 ? setTutorialIndex(tutorialIndex - 1) : setStep('experience')}
            className="flex-1 bg-gray-100 py-4 rounded-xl"
          >
            <Text className="text-gray-700 font-semibold text-center">
              {isZh ? '返回' : 'Back'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => isLast ? setStep('complete') : setTutorialIndex(tutorialIndex + 1)}
            className="flex-1 bg-black py-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-center">
              {isLast ? (isZh ? '完成' : 'Finish') : (isZh ? '下一步' : 'Next')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-6xl mb-6">🎉</Text>
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          {isZh ? '準備就緒！' : "You're All Set!"}
        </Text>
        <Text className="text-base text-gray-500 text-center mb-12">
          {isZh
            ? '開始探索SEC文件分析和投資見解'
            : 'Start exploring SEC filing analysis and investment insights'}
        </Text>
        <TouchableOpacity
          onPress={handleComplete}
          className="bg-black w-full py-4 rounded-xl"
        >
          <Text className="text-white font-semibold text-center text-lg">
            {isZh ? '開始使用' : 'Start Exploring'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}