import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePickerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos to continue.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setResponseData(null);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(
        'http://192.168.1.7:5000/submit',  //SERVER api end point(update here)
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', 'Could not process your image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Plant Health Scanner</Text>
        <Text style={styles.subtitle}>
          Upload a plant leaf photo for disease detection
        </Text>
      </View>

      {/* Image Picker */}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={[styles.image, { width: width * 0.9 }]}
            resizeMode="cover"
          />
        ) : (
          <TouchableOpacity
            style={[styles.uploadArea, { width: width * 0.9 }]}
            onPress={pickImage}
          >
            <Text style={styles.uploadText}>Tap to select a photo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedImage && styles.disabledButton,
          ]}
          onPress={pickImage}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>📁 Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            (!selectedImage || isLoading) && styles.disabledButton,
          ]}
          onPress={uploadImage}
          disabled={!selectedImage || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>🔍 Analyze Now</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      {responseData && (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Analysis Results</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🌱 Condition</Text>
            <Text style={styles.cardContent}>{responseData.title}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📝 Description</Text>
            <Text style={styles.cardContent}>{responseData.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🛡️ Prevention</Text>
            <Text style={styles.cardContent}>{responseData.prevent}</Text>
          </View>

          {responseData.image_url && (
            <View style={styles.imageCard}>
              <Text style={styles.imageLabel}>Disease Reference</Text>
              <Image
                source={{ uri: responseData.image_url }}
                style={[styles.referenceImage, { width: width * 0.85 }]}
                resizeMode="contain"
              />
            </View>
          )}

          {responseData.supplement_name && (
            <View style={styles.supplementSection}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>💊 Recommended Treatment</Text>
                <Text style={styles.cardContent}>
                  {responseData.supplement_name}
                </Text>
              </View>

              {responseData.supplement_image_url && (
                <View style={styles.imageCard}>
                  <Text style={styles.imageLabel}>Supplement Visual</Text>
                  <Image
                    source={{ uri: responseData.supplement_image_url }}
                    style={[
                      styles.referenceImage,
                      { width: width * 0.6, height: 180 },
                    ]}
                    resizeMode="contain"
                  />
                </View>
              )}

              {responseData.supplement_buy_link && (
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() =>
                    Linking.openURL(responseData.supplement_buy_link)
                  }
                >
                  <Text style={styles.buyButtonText}>🛒 Purchase Now</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#F0F4F8',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    height: 250,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  uploadArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A0AEC0',
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#718096',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#66BB6A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C5282',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
  },
  imageCard: {
    marginVertical: 15,
    alignItems: 'center',
  },
  referenceImage: {
    height: 200,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
  },
  imageLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
    fontWeight: '500',
  },
  supplementSection: {
    marginTop: 20,
    paddingTop: 20,
  },
  buyButton: {
    backgroundColor: '#38A169',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 2,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
