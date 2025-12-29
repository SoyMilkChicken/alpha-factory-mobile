/**
 * Alpha Factory Mobile - Diff Viewer Component
 * Renders unified diffs with red/green highlighting
 */

import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FilingDiff } from '../types';
import { useSettings } from '../contexts/SettingsContext';

// ============================================
// Types
// ============================================

interface DiffViewerProps {
  diff: FilingDiff;
  maxHeight?: number;
}

interface DiffLine {
  type: 'added' | 'removed' | 'context' | 'header';
  content: string;
  lineNumber?: number;
}

// ============================================
// Diff Parser
// ============================================

function parseDiffText(diffText: string): DiffLine[] {
  if (!diffText) return [];

  const lines = diffText.split('\n');
  const parsed: DiffLine[] = [];

  lines.forEach((line) => {
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      parsed.push({ type: 'header', content: line });
    } else if (line.startsWith('+')) {
      parsed.push({ type: 'added', content: line.substring(1) });
    } else if (line.startsWith('-')) {
      parsed.push({ type: 'removed', content: line.substring(1) });
    } else {
      parsed.push({ type: 'context', content: line.startsWith(' ') ? line.substring(1) : line });
    }
  });

  return parsed;
}

// ============================================
// Novelty Score Badge
// ============================================

function NoveltyBadge({ score }: { score: number }) {
  const { t } = useSettings();
  const percentage = (score * 100).toFixed(1);

  const getColor = () => {
    if (score > 0.25) return { bg: 'bg-red-100', text: 'text-red-700', label: t('diff.high_change') };
    if (score > 0.15) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: t('diff.medium_change') };
    return { bg: 'bg-green-100', text: 'text-green-700', label: t('diff.low_change') };
  };

  const colors = getColor();

  return (
    <View className={`px-3 py-1 rounded-full ${colors.bg}`}>
      <Text className={`text-sm font-semibold ${colors.text}`}>
        {percentage}% {t('diff.novelty')}
      </Text>
    </View>
  );
}

// ============================================
// Stats Bar
// ============================================

function DiffStats({ diff }: { diff: FilingDiff }) {
  const { t } = useSettings();

  const addedPercent = diff.added_ratio ? (diff.added_ratio * 100).toFixed(1) : 'N/A';
  const removedPercent = diff.removed_ratio ? (diff.removed_ratio * 100).toFixed(1) : 'N/A';

  return (
    <View className="flex-row items-center justify-between py-3 px-4 bg-gray-50 border-b border-gray-200">
      <View className="flex-row items-center space-x-4">
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-green-500 rounded-sm mr-1" />
          <Text className="text-sm text-gray-600">
            +{addedPercent}% {t('diff.added')}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-red-500 rounded-sm mr-1" />
          <Text className="text-sm text-gray-600">
            -{removedPercent}% {t('diff.removed')}
          </Text>
        </View>
      </View>
      <NoveltyBadge score={diff.novelty_score} />
    </View>
  );
}

// ============================================
// Line Component
// ============================================

function DiffLineView({ line }: { line: DiffLine }) {
  const getBgColor = () => {
    switch (line.type) {
      case 'added':
        return 'bg-[#dcfce7]'; // Green background
      case 'removed':
        return 'bg-[#fee2e2]'; // Red background
      case 'header':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };

  const getTextColor = () => {
    switch (line.type) {
      case 'added':
        return 'text-green-800';
      case 'removed':
        return 'text-red-800';
      case 'header':
        return 'text-blue-600';
      default:
        return 'text-gray-800';
    }
  };

  const getPrefix = () => {
    switch (line.type) {
      case 'added':
        return '+';
      case 'removed':
        return '-';
      default:
        return ' ';
    }
  };

  return (
    <View className={`flex-row ${getBgColor()} border-b border-gray-100`}>
      <View className="w-6 items-center justify-center bg-gray-50 border-r border-gray-200">
        <Text className={`text-xs font-mono ${getTextColor()}`}>
          {line.type !== 'header' && line.type !== 'context' ? getPrefix() : ''}
        </Text>
      </View>
      <View className="flex-1 px-2 py-1">
        <Text
          className={`text-xs font-mono ${getTextColor()}`}
          numberOfLines={undefined}
        >
          {line.content || ' '}
        </Text>
      </View>
    </View>
  );
}

// ============================================
// Beginner Mode Summary
// ============================================

function BeginnerSummary({ diff }: { diff: FilingDiff }) {
  const { t } = useSettings();
  const noveltyPercent = (diff.novelty_score * 100).toFixed(0);

  const getSummary = () => {
    if (diff.novelty_score > 0.25) {
      return {
        emoji: '⚠️',
        title: t('diff.high_change'),
        description:
          t('settings.language') === 'zh'
            ? `此部分有 ${noveltyPercent}% 的內容已變更，建議仔細閱讀。`
            : `${noveltyPercent}% of this section has changed significantly. Worth a careful review.`,
      };
    }
    if (diff.novelty_score > 0.15) {
      return {
        emoji: '📝',
        title: t('diff.medium_change'),
        description:
          t('settings.language') === 'zh'
            ? `此部分有 ${noveltyPercent}% 的變更，屬於正常更新範圍。`
            : `${noveltyPercent}% change detected. Normal quarterly/annual updates.`,
      };
    }
    return {
      emoji: '✅',
      title: t('diff.low_change'),
      description:
        t('settings.language') === 'zh'
          ? `僅 ${noveltyPercent}% 變更，內容基本保持不變。`
          : `Only ${noveltyPercent}% change. Content largely unchanged.`,
    };
  };

  const summary = getSummary();

  return (
    <View className="p-4 bg-white rounded-lg border border-gray-200 m-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-2xl mr-2">{summary.emoji}</Text>
        <Text className="text-lg font-semibold text-gray-900">{summary.title}</Text>
      </View>
      <Text className="text-base text-gray-600 leading-6">{summary.description}</Text>
      <View className="mt-4 pt-4 border-t border-gray-100">
        <Text className="text-sm text-gray-500">
          Section: <Text className="font-mono">{diff.section_key}</Text>
        </Text>
      </View>
    </View>
  );
}

// ============================================
// Main Component
// ============================================

export function DiffViewer({ diff, maxHeight = 400 }: DiffViewerProps) {
  const { isBeginnerMode, t } = useSettings();

  const parsedLines = useMemo(() => parseDiffText(diff.diff_text), [diff.diff_text]);

  // Beginner mode shows simplified summary
  if (isBeginnerMode) {
    return (
      <View className="flex-1">
        <DiffStats diff={diff} />
        <BeginnerSummary diff={diff} />
      </View>
    );
  }

  // Analyst mode shows full diff
  return (
    <View className="flex-1 bg-white">
      <DiffStats diff={diff} />
      <ScrollView
        style={{ maxHeight }}
        showsVerticalScrollIndicator={true}
        className="flex-1"
      >
        {parsedLines.length > 0 ? (
          parsedLines.map((line, index) => <DiffLineView key={index} line={line} />)
        ) : (
          <View className="p-4 items-center">
            <Text className="text-gray-500">{t('diff.select_diff')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ============================================
// Export
// ============================================

export default DiffViewer;
