import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';

// Add error handling for missing environment variables
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || '',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || '',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || '',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || '',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || '',
  appId: Constants.expoConfig?.extra?.firebaseAppId || '',
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || '',
};

// Add error handling for Firebase initialization
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export const db = getFirestore(app);

// Add error handling for auth initialization
export let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  console.error("Error initializing Firebase Auth:", error);
}