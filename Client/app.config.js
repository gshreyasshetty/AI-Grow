export default {
  expo: {
    name: "AI-GROW",
    slug: "ai-grow",
    version: "1.0.1", 
    android: {
      package: "com.shreyas.aigrow",
      versionCode: 2 
    },
    extra: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      locationIqAccessToken: process.env.LOCATION_IQ_ACCESS_TOKEN,
      eas: {
        projectId: "104b3e26-684d-4f3f-b22f-e4bd0dc4582f"
      }
    },
  },
};
