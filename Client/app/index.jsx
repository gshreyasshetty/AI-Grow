import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import Login from '../components/Login';
import { auth } from '../configs/FirebaseConfig';
import { useRouter } from "expo-router";

export default function Index() {
  const user = auth.currentUser;
  const router = useRouter(); 

  if (user) {
    router.push('/plant'); 
    return null; 
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Login />
    </View>
  );
}
