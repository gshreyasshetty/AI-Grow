import { View, Text , Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
  const router= useRouter();
  return (
    <View>
        <Image source={require('../assets/images/logo.jpg')} 
        style={{ 
            width: '100%',
             height: 500,
             marginTop:0
             }} />
        <View style={styles.container}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize:35,
                textAlign:'center',
                marginTop:10,
                
            }}>AI-GROW
            </Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize:18,
                textAlign:'center',
                color:Colors.GREY,
                marginTop:10,
                
            }}>
              Empowering agriculture with AI:{'\n'}
              Unveiling New Plant Suggestion and Precise Plant disease Detection to ensure healthier crops and sustainable farming.
            </Text>
            <TouchableOpacity style={styles.button}
             onPress={()=>router.push('/auth/sign-in')}
            >
              <Text style={{
                fontFamily: 'outfit',
                fontSize:18,
                textAlign:'center',
                color:Colors.WHITE,
                // marginBottom: 20,
            }}>
                Get  STARTED
              </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.WHITE,
    marginTop:-25,
    height:1000,
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    padding:25,
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:99,
    marginTop:'12%',
    // marginBottom: 20,
  }
})
