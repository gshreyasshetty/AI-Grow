import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { Colors } from '../../constants/Colors'; 
import { CreatePlantContext } from '../context/CreatePlantContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

export default function SearchPlant() {
  const navigation = useNavigation();
  const router = useRouter();
  const { setPlantData } = useContext(CreatePlantContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const accessToken = Constants.expoConfig.extra.locationIqAccessToken;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const fetchSuggestions = async (input) => {
    if (input.length < 3) return; 
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
        params: {
          key: accessToken,
          q: input,
          format: 'json',
        },
      });
      setSuggestions(response.data); 
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Search for a Place 🌍</Text>

      <View style={styles.searchBarWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place..."
          placeholderTextColor={Colors.GRAY}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchSuggestions(text); 
          }}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => item.place_id ? `${item.place_id}-${index}` : `${index}`} // Combines place_id with index for uniqueness
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.suggestionItem, styles.lightThemeCard]}
            onPress={() => {
              setPlantData({
                placeName: item.display_name,
                placeAddress: item.display_name,
                coordinates: { latitude: item.lat, longitude: item.lon },
              });
              router.push('/create-plant/forconsumer'); 
              setQuery(item.display_name);
              setSuggestions([]); 
            }}
          >
            <View style={styles.suggestionContent}>
              <MaterialIcons name="place" size={40} color={Colors.SECONDARY} style={styles.suggestionIcon} />
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: Colors.LIGHT_BG, 
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.DARK_GRAY,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBarWrapper: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: Colors.WHITE, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lightThemeCard: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT, 
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionIcon: {
    marginRight: 15,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 18,
    color: Colors.DARK_TEXT,
    fontWeight: '500',
    flex: 1,
  },
});