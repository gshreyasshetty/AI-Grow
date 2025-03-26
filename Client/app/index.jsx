import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from "react-native";
import Login from '../components/Login';
import { auth } from '../configs/FirebaseConfig';
import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

export default function Index() {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if auth is initialized
    if (!auth) {
      console.error("Auth is not initialized");
      setIsAuthChecking(false);
      return;
    }

    try {
      const user = auth.currentUser;
      
      if (user) {
        router.push('/plant');
      }
      
      // Finish checking auth state
      setIsAuthChecking(false);
      SplashScreen.hideAsync();
    } catch (error) {
      console.error("Error checking auth state:", error);
      setIsAuthChecking(false);
      SplashScreen.hideAsync();
    }
  }, [router]);

  if (isAuthChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Login />
    </View>
  );
}
