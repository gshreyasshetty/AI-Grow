import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { CreatePlantContext } from '../context/CreatePlantContext';
import { chatSession } from '../../configs/aimodel';
import { useRouter } from 'expo-router';
import { auth, db } from "./../../configs/FirebaseConfig";
import { setDoc, doc, documentId } from "firebase/firestore";  // Firestore imports
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth state change listener

export default function LoadingPage() {
    const { plantData, setPlantData } = useContext(CreatePlantContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const bounceValue = useRef(new Animated.Value(0)).current;
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser); 
            } else {
                console.error("No authenticated user found.");
            }
        });
        
        return () => unsubscribe(); 
    }, []);

    const GenerativeAiModel = async () => {
        try {
            setLoading(true);

            // Ensure the user is authenticated before proceeding
            if (!user) {
                console.error("No authenticated user found.");
                return;
            }

            const FINAL_PROMPT = `Recommend the best plants that will thrive based on the following preferences, environmental, and climate conditions in JSON format: a garden of ${plantData.gardenPreferences.gardenSize} with ${plantData.gardenPreferences.soilType} soil, receiving ${plantData.gardenPreferences.sunlightExposure} sunlight. The garden is watered ${plantData.gardenPreferences.wateringFrequency} and exposed to ${plantData.gardenPreferences.windExposure} wind conditions. The user prefers plants that are ${plantData.gardenPreferences.plantPreferences?.join(', ')} so recommend for each of these. This garden is located in ${plantData.placeName}, ${plantData.placeAddress} at coordinates ${plantData.coordinates.latitude}, ${plantData.coordinates.longitude}. Additionally, take into account the current climate conditions of this location and suggest plants that can thrive in both the user's preferences and the specific weather patterns and climate of ${plantData.placeName}.`;

            console.log(FINAL_PROMPT);
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const responseText = await result.response.text();
            console.log(responseText);
            const plantResp = JSON.parse(responseText);

            const docId = Date.now().toString();
            const result_ = await setDoc(doc(db, "UserPlants", docId), {
                userEmail: user.email,  
                plantList: plantResp,
                plantData: plantData,
                docId:docId, 
            });

            router.push('(tabs)/plant');
        } catch (error) {
            console.error("Error in GenerativeAiModel: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (plantData && plantData.gardenPreferences && plantData.coordinates && user) {
            GenerativeAiModel();
        }
    }, [plantData, user]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [bounceValue]);

    const translateY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50], // bounce height
    });

    return (
        <View style={styles.container}>
            
            {loading && (
                <Animated.View
                    style={[styles.circle, { transform: [{ translateY }] }]}
                />
            )}
            {/* Loading Text */}
            <Text style={styles.loadingText}>Loading... Please wait</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a', 
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4CAF50',
    },
    loadingText: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 20,
        fontWeight: '600',
    },
});
