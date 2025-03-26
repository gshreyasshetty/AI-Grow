import Constants from 'expo-constants';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Add error handling for missing API key
const apiKey = Constants.expoConfig?.extra?.googleApiKey || '';
if (!apiKey) {
  console.warn("Missing Google API Key. AI features won't work properly.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Wrap chat session in try-catch
let chatSession;
try {
  chatSession = model.startChat({
    generationConfig,
  });
} catch (error) {
  console.error("Error starting AI chat session:", error);
  // Provide a fallback
  chatSession = {
    sendMessage: async () => ({ response: { text: () => JSON.stringify({ error: "AI service unavailable" }) } })
  };
}

export { chatSession };