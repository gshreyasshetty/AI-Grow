import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import StartNewPlantCard from '../../components/NewPlant/StartNewPlantCard';
import UserPlantList from '../../components/NewPlant/UserPlantList';
import { auth, db } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';

export default function Plant() {
  const [userPlant, setUserPlant] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) GetPlants();
  }, [user]);

  const GetPlants = async () => {
    setLoading(true);
    setUserPlant([]);
    const q = query(collection(db, 'UserPlants'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserPlant((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Plant Suggestions</Text>
        <TouchableOpacity onPress={() => router.push('/create-plant/select-type')}>
          <Ionicons name="add-circle-outline" size={50} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {userPlant?.length === 0 ? <StartNewPlantCard /> : <UserPlantList userPlant={userPlant} />}
    </View>
  );
}

const styles = {
  container: {
    padding: 5,
    paddingTop: '2%',
    paddingBottom: 0,
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: '#333',
  },
};
