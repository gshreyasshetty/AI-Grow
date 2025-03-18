// filepath: c:\Users\gshre\SHREYAS\WORKS\PROJECTS\AI-GROW\AI - GROW\Client\configs\aimodel.js
import Constants from 'expo-constants';
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = Constants.expoConfig.extra.googleApiKey;
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

export const chatSession = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        { text: "            const FINAL_PROMPT = `Recommend the best plants that will thrive based on the following preferences, environmental, and climate conditions in JSON format: a garden of ${plantData.gardenPreferences.gardenSize} with ${plantData.gardenPreferences.soilType} soil, receiving ${plantData.gardenPreferences.sunlightExposure} sunlight. The garden is watered ${plantData.gardenPreferences.wateringFrequency} and exposed to ${plantData.gardenPreferences.windExposure} wind conditions. The user prefers plants that are ${plantData.gardenPreferences.plantPreferences?.join(', ')} so recommend for each of these. This garden is located in ${plantData.placeName}, ${plantData.placeAddress} at coordinates ${plantData.coordinates.latitude}, ${plantData.coordinates.longitude}. Additionally, take into account the current climate conditions of this location and suggest plants that can thrive in both the user's preferences and the specific weather patterns and climate of ${plantData.placeName}.`;\nin the formate {\n  \"type\": \"location\",\n { \n    \"city\": \"New York\"\n  }\n}\n{\n  \"type\": \"climate\",\n  { \n    \"temperature\": {\n      \"average_high\": \"30°C\",\n      \"average_low\": \"15°C\"\n    },\n    \"rainfall\": {\n      \"average_annual\": \"1000mm\",\n      \"rainy_season\": \"June-August\"\n    }\n  }\n}\n\n{\n  \"type\": \"plant\",\n  \"recommended_plants\n\": { \n    \"name\": \"Cactus\",\n    \"category\": \"Succulent\",\n    \"climate\": \"Hot & Dry\",\n    \"sunlight\": \"Full Sun\",\n    \"water\": \"Low\",\n    \"maintenance\": \"Low\",\n    \"description\": \"A cactus is a water-storing plant that thrives in dry environments.\"\n  }\n}\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"type\": \"recommendations\",\n  \"garden_data\": {\n    \"gardenSize\": \"${plantData.gardenPreferences.gardenSize}\",\n    \"soilType\": \"${plantData.gardenPreferences.soilType}\",\n    \"sunlightExposure\": \"${plantData.gardenPreferences.sunlightExposure}\",\n    \"wateringFrequency\": \"${plantData.gardenPreferences.wateringFrequency}\",\n    \"windExposure\": \"${plantData.gardenPreferences.windExposure}\",\n    \"plantPreferences\": \"${plantData.gardenPreferences.plantPreferences?.join(', ')}\",\n    \"location\": {\n      \"placeName\": \"${plantData.placeName}\",\n      \"placeAddress\": \"${plantData.placeAddress}\",\n      \"coordinates\": {\n        \"latitude\": \"${plantData.coordinates.latitude}\",\n        \"longitude\": \"${plantData.coordinates.longitude}\"\n      }\n    }\n  },\n  \"recommended_plants\": [\n    {\n      \"name\": \"Plant Name 1\",\n      \"category\": \"Plant Category\",\n      \"climate\": \"Suitable Climate\",\n      \"sunlight\": \"Sunlight Requirement\",\n      \"water\": \"Watering Needs\",\n      \"maintenance\": \"Maintenance Level\",\n      \"description\": \"Plant Description\",\n      \"preferenceMatch\": [\"Preference 1\", \"Preference 2\"] //List of user preferences this plant matches.  Could be empty.\n    },\n    {\n      \"name\": \"Plant Name 2\",\n      \"category\": \"Plant Category\",\n      \"climate\": \"Suitable Climate\",\n      \"sunlight\": \"Sunlight Requirement\",\n      \"water\": \"Watering Needs\",\n      \"maintenance\": \"Maintenance Level\",\n      \"description\": \"Plant Description\",\n      \"preferenceMatch\": [\"Preference 3\"]\n    }\n    // ... more plants\n  ],\n  \"climate_data\": {\n      \"temperature\": {\n        \"average_high\": \"35-45c\",\n        \"average_low\": \"25-30 c\"\n      },\n      \"rainfall\": {\n        \"average_annual\": \"500-900mm\",\n        \"rainy_season\": \"june-sep\"\n      },\n      \"other_climate_factors\": [\n        \"PLACEHOLDER_OTHER_CLIMATE_FACTORS\",\n        \"PLACEHOLDER_OTHER_CLIMATE_FACTORS\"\n      ]\n  },\n  \"notes\": \"This is a sample JSON response.  The 'PLACEHOLDER' fields require data obtained from external API calls or databases based on the provided location and coordinates to provide accurate climate data and plant recommendations.\"\n}\n```\n\n**Explanation of Improvements:**\n\n* **Structure:** The JSON is structured logically with sections for garden data, recommended plants, and climate data.  This makes it easy to parse and use.\n* **Plant Data:** Each plant recommendation includes key details like name, category, climate suitability, sunlight, water needs, maintenance, and a description.  Crucially,  a `preferenceMatch` array is added to explicitly show which user preferences each plant satisfies.\n* **Climate Data:** A dedicated section for climate data is included.  The `PLACEHOLDER` values highlight that this data needs to be dynamically populated using external weather APIs or databases based on the location's coordinates.  Additional climate factors beyond temperature and rainfall are included to account for wind, humidity, etc.\n* **Notes:** A \"notes\" section clearly indicates that placeholder values need to be replaced with dynamically generated information.\n* **Dynamic Data:** The `${plantData...}` syntax is maintained to emphasize that the JSON structure should be populated from the `plantData` object you provided.\n\n**To make this JSON truly functional:**\n\n1. **Integrate with a Weather API:** Use a service like OpenWeatherMap or similar to fetch the temperature, rainfall, and other climate data for the given coordinates.\n2. **Integrate with a Plant Database:**  You'll need access to a database or API that contains information about plants, their requirements, and suitability for different climates.  This data will populate the `recommended_plants` array.\n3. **Implement a Matching Algorithm:**  A system must match the user's preferences and the climate data with the information in the plant database to determine the best recommendations.  The `preferenceMatch` array will be generated during this process.\n\n\nThis enhanced JSON provides a solid framework for a complete and useful plant recommendation system. Remember to replace the placeholder values with actual data obtained from your integrated APIs or databases.\n" },
      ],
    },
  ],
});