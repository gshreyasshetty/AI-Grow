import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = () => {
    if (!email || !password || !fullname) {
      ToastAndroid.show('Please Enter all Details', ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/plant');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
          ToastAndroid.show('Email already in use', ToastAndroid.LONG);
        } else if (errorCode === 'auth/weak-password') {
          ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.LONG);
        } else if (errorCode === 'auth/invalid-email') {
          ToastAndroid.show('Invalid email format', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
        }
        console.error(error.message, errorCode);
      });
  };

  return (
    <View style={styles.container}>
    
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
      </TouchableOpacity>

    
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and start your journey!</Text>

      {/* Full Name */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color={Colors.GREY} />
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={setFullName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color={Colors.GREY} />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

    
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color={Colors.GREY} />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={setPassword}
        />
      </View>

     
      <TouchableOpacity onPress={onCreateAccount} style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
        onPress={() => router.replace('auth/sign-in')}
        style={styles.signInButton}
      >
        <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  backButton: {
    marginTop: 10,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: Colors.PRIMARY,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GREY,
    marginTop: 10,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.GREY,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'outfit',
    fontSize: 16,
    marginLeft: 10,
  },
  createButton: {
    paddingVertical: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    marginTop: 50,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  createButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  signInButton: {
    paddingVertical: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.GREY,
  },
  signInButtonText: {
    color: Colors.PRIMARY,
    fontSize: 14,
    fontFamily: 'outfit',
    textAlign: 'center',
  },
});
