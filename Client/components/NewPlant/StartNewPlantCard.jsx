import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { CreatePlantContext } from '../../app/context/CreatePlantContext';

export default function StartNewPlantCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="bulb-outline" size={50} color="#4CAF50" />
      <Text style={styles.text}>Confused about a new plant?</Text>
      <TouchableOpacity onPress={() => router.push('/create-plant/select-type')} style={styles.button}>
        <Text style={styles.buttonText}>ASK AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    padding: 20,
    marginTop: 50,
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
};
