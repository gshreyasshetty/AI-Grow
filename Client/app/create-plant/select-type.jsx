import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

export default function SelectType() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>🌱 Select Your Planting Focus</Text>

      <View style={[styles.card, styles.cardConsumption]}>
        <TouchableOpacity 
          onPress={() => router.push('/create-plant/select-location1')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>🍃 CONSUMPTION</Text>
          <Text style={styles.description}>
            Nurture a personal sanctuary filled with beauty and wellness. Perfect for your garden, herbal remedies, or fresh edibles.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.cardProduction]}>
        <TouchableOpacity 
          onPress={() => router.push('/create-plant/select-loaction3')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>🌾 PRODUCTION</Text>
          <Text style={styles.description}>
            Embark on a journey of large-scale cultivation for profit. Ideal for farmers and commercial growers.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F1F1F1', 
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E1E1E', 
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardConsumption: {
    backgroundColor: '#E8F5E9',
  },
  cardProduction: {
    backgroundColor: '#FFF3E0',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121', 
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#424242', 
    textAlign: 'center',
    lineHeight: 22,
  },
});