import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Animated, Dimensions, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { CreateProContext } from '../context/CreateProContext';

export default function ForProducer() {
  const navigation = useNavigation();
  const router = useRouter();
  const { setPlant1Data } = useContext(CreateProContext); // Access the context

  const [farmSize, setFarmSize] = useState('');
  const [unit, setUnit] = useState('Acres'); // Acres or Hectares
  const [soilType, setSoilType] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [marketFocus, setMarketFocus] = useState('');
  const [fertilizerUsage, setFertilizerUsage] = useState('');
  const [harvestMethod, setHarvestMethod] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalType, setModalType] = useState('');
  const [modalPosition] = useState(new Animated.Value(0));

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'PRODUCER',
    });
  }, []);

  const handleSelect = (value) => {
    switch (modalType) {
      case 'Soil Type':
        setSoilType(value);
        break;
      case 'Water Availability':
        setWaterAvailability(value);
        break;
      case 'Market Focus':
        setMarketFocus(value);
        break;
      case 'Fertilizer Usage':
        setFertilizerUsage(value);
        break;
      case 'Harvest Method':
        setHarvestMethod(value);
        break;
      case 'Unit':
        setUnit(value);
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  const toggleModal = (type, options) => {
    setModalType(type);
    setModalOptions(options);
    setModalVisible(true);
    Animated.timing(modalPosition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farm Preferences</Text>

      {/* Farm Size */}
      <Text style={styles.label}>Enter Farm Size</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Enter size"
          value={farmSize}
          onChangeText={setFarmSize}
        />
        <TouchableOpacity
          style={styles.unitDropdown}
          onPress={() => toggleModal('Unit', ['Acres', 'Hectares'])}
        >
          <Text style={styles.dropdownText}>{unit}</Text>
        </TouchableOpacity>
      </View>

      {/* Soil Type */}
      <Text style={styles.label}>Select Soil Type</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Soil Type', ['Sandy', 'Loamy', 'Clayey', 'Mixed', 'Unknown'])}
      >
        <Text style={styles.dropdownText}>{soilType || 'Select Soil Type'}</Text>
      </TouchableOpacity>

      {/* Water Availability */}
      <Text style={styles.label}>Select Water Availability</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Water Availability', ['Abundant', 'Moderate', 'Scarce'])}
      >
        <Text style={styles.dropdownText}>{waterAvailability || 'Select Water Availability'}</Text>
      </TouchableOpacity>

      {/* Market Focus */}
      <Text style={styles.label}>Select Market Focus</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Market Focus', ['Local Market Demand', 'Export Market Potential', 'High-Value Crops'])}
      >
        <Text style={styles.dropdownText}>{marketFocus || 'Select Market Focus'}</Text>
      </TouchableOpacity>

      {/* Fertilizer and Pesticide Usage */}
      <Text style={styles.label}>Select Fertilizer and Pesticide Usage</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Fertilizer Usage', ['Organic Only', 'Conventional', 'Integrated Pest Management'])}
      >
        <Text style={styles.dropdownText}>{fertilizerUsage || 'Select Fertilizer and Pesticide Usage'}</Text>
      </TouchableOpacity>

      {/* Harvest and Labor Preferences */}
      <Text style={styles.label}>Select Harvesting Method</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Harvest Method', ['Manual Harvesting', 'Mechanized Harvesting', 'Both'])}
      >
        <Text style={styles.dropdownText}>{harvestMethod || 'Select Harvesting Method'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Save the data into the context
          setPlant1Data((prevData) => ({
            ...prevData,
            farmPreferences: {
              farmSize,
              unit,
              soilType,
              waterAvailability,
              marketFocus,
              fertilizerUsage,
              harvestMethod,
            },
          }));

          console.log('Data saved to context:', {
            farmSize,
            unit,
            soilType,
            waterAvailability,
            marketFocus,
            fertilizerUsage,
            harvestMethod,
          });

          // Navigate to the loading page
          router.push('/create-plant/loading-page2');
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: modalPosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [screenHeight, screenHeight / 2 - 100],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  unitDropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
  },
  dropdown: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#777',
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 8,
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 18,
    color: '#333',
  },
});
