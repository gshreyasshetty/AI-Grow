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
import { auth } from '../../../configs/FirebaseConfig';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                
                router.replace('/plant');
            }
        });

        
        navigation.setOptions({
            headerShown: false,
        });

        return () => unsubscribe();
    }, []);

    const onSignIn = () => {
        if (!email || !password) {
            ToastAndroid.show(
                'Please Enter Email and Password',
                ToastAndroid.LONG
            );
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/plant'); 
            })
            .catch((error) => {
                const errorCode = error.code;
                if (
                    errorCode === 'auth/invalid-credential' ||
                    errorCode === 'auth/invalid-email'
                ) {
                    ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
                }
            });
    };

    return (
        <View style={styles.screen}>
          
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>

            
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

           
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color={Colors.GREY} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={Colors.GREY} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </View>
            </View>

       
            <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => router.replace('auth/sign-up')}
            >
                <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
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
        marginTop: 40,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'outfit',
        fontSize: 18,
        color: Colors.GREY,
        marginTop: 10,
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 40,
    },
    label: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.GREY,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontFamily: 'outfit',
        fontSize: 16,
        marginLeft: 10,
    },
    signInButton: {
        marginTop: 50,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    signInButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: 'outfit-bold',
    },
    createAccountButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.GREY,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    createAccountButtonText: {
        color: Colors.PRIMARY,
        fontSize: 16,
        fontFamily: 'outfit-bold',
    },
});
