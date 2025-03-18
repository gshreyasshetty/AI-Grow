import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function UserPlantList({ userPlant }) {

  const fallbackData = {
    plantList: {
      garden_data: { location: { placeName: 'City not available' } },
      climate_data: { temperature: {}, rainfall: {} },
      recommended_plants: [],
    },
  };

  const userPlantData = userPlant?.[userPlant.length - 1]?.plantList || fallbackData.plantList;

  const city = userPlantData?.garden_data?.location?.placeName || 'City not available';
  const temperature = userPlantData?.climate_data?.temperature || {};
  const rainfall = userPlantData?.climate_data?.rainfall || {};
  const recommendedPlants = userPlantData?.recommended_plants || [];

  const data = [
    { type: 'location', data: { city } },
    { type: 'climate', data: { temperature, rainfall } },
    ...recommendedPlants.map((plant) => ({ type: 'plant', data: plant })),
  ];

  const [expandedItems, setExpandedItems] = useState([]);
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animatedValues.forEach((value) => {
      Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [animatedValues]);

  const handlePress = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedItems.includes(index);
    const cardStyle = {
      transform: [{ scale: animatedValues[index] || 1 }],
    };

    if (item.type === 'location') {
      return (
        <Animated.View style={[styles.card, styles.locationCard, cardStyle]}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="location" size={20} color="#00796B" /> Location
          </Text>
          <Text style={styles.infoText}>{item.data.city}</Text>
        </Animated.View>
      );
    }

    if (item.type === 'climate') {
      return (
        <Animated.View style={[styles.card, styles.climateCard, cardStyle]}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="thermometer" size={20} color="#FF5722" /> Climate Information
          </Text>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Temperature:</Text>
            <Text style={styles.infoText}>High: {item.data.temperature?.average_high || 'N/A'}</Text>
            <Text style={styles.infoText}>Low: {item.data.temperature?.average_low || 'N/A'}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Rainfall:</Text>
            <Text style={styles.infoText}>Annual: {item.data.rainfall?.average_annual || 'N/A'}</Text>
            <Text style={styles.infoText}>Rainy Season: {item.data.rainfall?.rainy_season || 'N/A'}</Text>
          </View>
        </Animated.View>
      );
    }

    if (item.type === 'plant') {
      return (
        <Animated.View style={[styles.card, styles.plantCard, cardStyle]}>
          <TouchableOpacity onPress={() => handlePress(index)}>
            <Text style={styles.cardTitle}>{item.data.name}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View>
              {item.data.image && (
                <Image source={{ uri: item.data.image }} style={styles.plantImage} />
              )}
              <Text style={styles.cardText}>Category: {item.data.category}</Text>
              <Text style={styles.cardText}>Climate: {item.data.climate}</Text>
              <Text style={styles.cardText}>Sunlight: {item.data.sunlight}</Text>
              <Text style={styles.cardText}>Water: {item.data.water}</Text>
              <Text style={styles.cardText}>Maintenance: {item.data.maintenance}</Text>
              <Text style={styles.cardText}>Description: {item.data.description}</Text>
            </View>
          )}
        </Animated.View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f1', 
  },
  container: {
    padding: 4, 
  },
  card: {
    backgroundColor: '#ffffff', 
    padding: 12, 
    borderRadius: 22, 
    shadowColor: '#999999',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 6, 
    elevation: 4, 
    marginBottom: 10, 
    width: '100%', 
    alignSelf: 'center', 
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold', 
    color: '#444444', 
    marginBottom: 8,
    fontFamily: 'outfit-bold',
  },
  infoBlock: {
    marginBottom: 12, 
  },
  label: {
    fontSize: 18,
    fontFamily: 'outfit-bold', 
    fontWeight: '600', 
    color: '#555555', 
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
    fontFamily: 'outfit-medium', 
  },
  plantImage: {
    width: '100%',
    height: 140, 
    borderRadius: 12, 
    marginBottom: 8, 
  },
  cardTitle: {
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#4CAF50',
    marginBottom: 6, 
    fontFamily: 'outfit-medium',
  },
  cardText: {
    fontSize: 16, 
    color: '#444444', 
    marginTop: 4,
    fontFamily: 'outfit-medium', 
  },
});

