import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { CreatePlantProvider } from './context/CreatePlantContext';
import { CreateProProvider } from './context/CreateProContext';

export default function RootLayout() {
 
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
