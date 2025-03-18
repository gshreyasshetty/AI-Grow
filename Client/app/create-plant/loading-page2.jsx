// filepath: c:\Users\gshre\SHREYAS\WORKS\PROJECTS\AI-GROW\AI - GROW\Client\app\create-plant\loading-page2.jsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { router } from "expo-router";
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig.extra.googleApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

const CropRecommendations = () => {
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const extractJSON = (responseText) => {
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/); 
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No valid JSON found.");
    } catch (err) {
      console.error("Error extracting JSON:", err);
      throw err;
    }
  };

  const fetchAIRecommendations = async () => {
    try {
      setIsLoading(true);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are an agricultural advisor. Based on the following conditions, provide crop recommendations. Your response must be strictly in JSON format without any additional text or explanation. Adhere to this exact structure:
                {
                  "recommendations": [
                    {"crop": "CropName", "reasoning": "Brief reason"}
                  ]
                }
                Conditions:
                - Soil type: Clayey
                - Water availability: Sufficient
                - Market focus: Export
                - Harvest method: Mechanized
                - Location: Hoskote, India`,
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage("Provide recommendations.");
      const responseText = result.response.text();

      console.log("Raw AI Response:", responseText);

 
      const parsedResponse = extractJSON(responseText);
      setAiRecommendations(parsedResponse.recommendations || []);
    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
      setError("Failed to fetch valid recommendations. Please try again.");
      setAiRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌾 Crop Recommendations</Text>

      {isLoading && (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />
      )}

      {error && !isLoading && <Text style={styles.errorText}>{error}</Text>}

      {!isLoading && aiRecommendations.length > 0 && (
        <ScrollView style={styles.resultContainer}>
          {aiRecommendations.map((recommendation, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cropName}>{recommendation.crop}</Text>
              <Text style={styles.reasoning}>{recommendation.reasoning}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {!isLoading && aiRecommendations.length === 0 && !error && (
        <Text style={styles.noDataText}>No recommendations available.</Text>
      )}

      {/* Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("(tabs)/plant")}
      >
        <Text style={styles.homeButtonText}>🏠 Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cropName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 8,
  },
  reasoning: {
    fontSize: 14,
    color: "#4F4F4F",
    lineHeight: 20,
  },
  noDataText: {
    color: "#757575",
    textAlign: "center",
    fontSize: 16,
  },
  homeButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CropRecommendations;