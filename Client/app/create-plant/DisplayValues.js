// DisplayValues.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DisplayValues() {
  const route = useRoute();
  const {
    gardenSize,
    plantPreferences,
    sunlightExposure,
    soilType,
    wateringFrequency,
    windExposure,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Submitted Garden Preferences</Text>

      <Text style={styles.label}>Garden Size: {gardenSize}</Text>
      <Text style={styles.label}>
        Plant Preferences: {plantPreferences.join(', ')}
      </Text>
      <Text style={styles.label}>
        Sunlight Exposure: {sunlightExposure}
      </Text>
      <Text style={styles.label}>Soil Type: {soilType}</Text>
      <Text style={styles.label}>
        Watering Frequency: {wateringFrequency}
      </Text>
      <Text style={styles.label}>Wind Exposure: {windExposure}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
});
