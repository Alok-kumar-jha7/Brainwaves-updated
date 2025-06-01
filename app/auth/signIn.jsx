import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useState, useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Colors from "../../constant/Colors";
import { auth, db } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message';
import { getDoc, doc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailsContext";

export default function SignIn() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserDetail = async () => {
      const result = await getDoc(doc(db, 'users', email));
      setUserDetail(result.data());
      console.error("Error fetching user detail:", result.data());
    
  };

  const onSignInClick = async () => {
    Keyboard.dismiss();
    if ( !email || !password) {
    Toast.show({
      type: 'warning',
      text1: 'Missing Fields🙁',
      text2: 'Please fill out all fields before Signing In.',
      visibilityTime: 4000,
      position: 'top',
    });
    return;
  }
    setLoading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user
        console.log("User signed in successfully:", user);
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home');
      })
      Toast.show({
        type: 'success',
        text1: 'Signed in to BrainWaves',
        text2: 'Welcome back! 🎉',
        visibilityTime: 5000,
        position: 'top',
      })
     .catch (e=>{
      console.error("Error signing in:", e);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: e.message,
        visibilityTime: 7000,
        position: 'top',
      });
    } )
      
    
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/log.png")}
          style={styles.image}
        />

        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.para}>Sign In to start learning. </Text>

        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onSignInClick}
          disabled={loading}
          style={[styles.button, loading && { opacity: 0.7 }]}
        >
          {!loading ? (
            <Text style={styles.buttonText}>Sign In</Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.txt}>New Here?</Text>
          <Pressable onPress={() => router.push('/auth/SignUp')}>
            <Text style={styles.sigintxt}>Create an Account!</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    padding: 25,
    paddingTop: 50,
  },
  image: {
    width: 320,
    height: 250,
    resizeMode: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 35,
    color: Colors.PRIMARY,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  para: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    fontFamily: "outfit",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    fontSize: 20,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: "outfit",
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  sigintxt: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    marginLeft: 5,
  },
  txt: {
    fontFamily: "outfit-bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15,
  },
});
