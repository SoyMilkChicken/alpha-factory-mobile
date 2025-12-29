/**
 * Alpha Factory Mobile - Root Layout
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SettingsProvider } from '../contexts/SettingsContext';
import "../global.css";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="companies/[ticker]" 
          options={{ 
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
      </Stack>
    </SettingsProvider>
  );
}
