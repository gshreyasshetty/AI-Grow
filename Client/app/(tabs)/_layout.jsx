import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from './../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY,
      tabBarStyle: { backgroundColor: '#f1f1f1' },
    }}>
      <Tabs.Screen name="plant"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="questioncircleo" size={24} color="black" />,
          tabBarLabel: "Suggestion",
        }} />
      <Tabs.Screen name="profile"
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="smoke-detector-alert-outline" size={28} color="black" />,
          tabBarLabel: "Detection",
        }} />
    </Tabs>
  )
}
