import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { CreatePlantProvider } from './context/CreatePlantContext';
import { CreateProProvider } from './context/CreateProContext';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
 
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen
      SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [fontsLoaded, fontError]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading application...</Text>
      </View>
    );
  }

  if (fontError) {
    console.warn('Font loading error:', fontError);
  }

  // Wrap providers in error boundaries if possible
  return (
    <CreateProProvider>
      <CreatePlantProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GestureHandlerRootView>
      </CreatePlantProvider>
    </CreateProProvider>
  );
}
