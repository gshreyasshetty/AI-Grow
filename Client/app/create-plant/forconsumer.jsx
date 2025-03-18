import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Animated, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { CreatePlantContext } from '../context/CreatePlantContext';

export default function ForConsumer() {
  const navigation = useNavigation();
  const router = useRouter();
  const { setPlantData } = useContext(CreatePlantContext); // Access the context

  const [gardenSize, setGardenSize] = useState('');
  const [plantPreferences, setPlantPreferences] = useState([]);
  const [sunlightExposure, setSunlightExposure] = useState('');
  const [soilType, setSoilType] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('');
  const [windExposure, setWindExposure] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalType, setModalType] = useState('');
  const [modalPosition] = useState(new Animated.Value(0));

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'CONSUMER',
    });
  }, []);

  const handleSelect = (value) => {
    switch (modalType) {
      case 'Garden Size':
        setGardenSize(value);
        break;
      case 'Sunlight Exposure':
        setSunlightExposure(value);
        break;
      case 'Soil Type':
        setSoilType(value);
        break;
      case 'Watering Frequency':
        setWateringFrequency(value);
        break;
      case 'Wind Exposure':
        setWindExposure(value);
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

  const handlePlantPreferences = (value) => {
    if (plantPreferences.includes(value)) {
      setPlantPreferences(plantPreferences.filter((item) => item !== value));
    } else {
      setPlantPreferences([...plantPreferences, value]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Garden Preferences</Text>

      {/* Custom Dropdowns */}
      <Text style={styles.label}>Select Garden Size</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Garden Size', [' 100 sq ft', ' 300 sq ft', ' 500 sq ft'])}
      >
        <Text style={styles.dropdownText}>{gardenSize || 'Select Garden Size'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Choose Plant Preferences</Text>
      {['Medicinal', 'Edible', 'Flowers', 'Low-Maintenance'].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxContainer}
          onPress={() => handlePlantPreferences(item)}
        >
          <Text style={styles.checkbox}>
            {plantPreferences.includes(item) ? '✔️' : '⬜️'} {item}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Select Sunlight Exposure</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Sunlight Exposure', ['Full Sun', 'Partial Shade', 'Full Shade'])}
      >
        <Text style={styles.dropdownText}>{sunlightExposure || 'Select Sunlight Exposure'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Soil Type</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Soil Type', ['Sandy', 'Loamy', 'Clayey', 'Unknown'])}
      >
        <Text style={styles.dropdownText}>{soilType || 'Select Soil Type'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Watering Frequency</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Watering Frequency', ['Daily', 'Weekly', 'Rarely'])}
      >
        <Text style={styles.dropdownText}>{wateringFrequency || 'Select Watering Frequency'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Wind Exposure</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleModal('Wind Exposure', ['Sheltered', 'Moderately Exposed', 'Exposed'])}
      >
        <Text style={styles.dropdownText}>{windExposure || 'Select Wind Exposure'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {

    setPlantData((prevData) => ({
      ...prevData,
      gardenPreferences: {
        gardenSize,
        plantPreferences,
        sunlightExposure,
        soilType,
        wateringFrequency,
        windExposure,
      },
    }));

    console.log('Data saved to context:', {
      gardenSize,
      plantPreferences,
      sunlightExposure,
      soilType,
      wateringFrequency,
      windExposure,
    });

 
    router.push('/create-plant/loading-page');
  }}
>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>

     
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
                      outputRange: [screenHeight, screenHeight / 2 - 100], // Center the modal
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
  dropdown: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: '#777',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  checkbox: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  checkbox: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
});
