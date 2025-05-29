import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,

} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import Toast from "react-native-toast-message";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "./../../context/UserDetailsContext";
export default function SignUp() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
   const [loading, setLoading] = useState(false);
  const CreateNewAccount = () => {
    Keyboard.dismiss();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log("User created successfully:", user);
        await SaveUser(user);
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Account created on BrainWaves",
          text2: "You’re all set! 🚀",
          visibilityTime: 6000,
          position: "top",
        });
      })
      .catch((e) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: e.message,
        });
      });
  };
  const SaveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);
    setUserDetail(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/signup.png")}
        style={styles.image}
      />

      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.para}>Sign Up to get started! </Text>

      <TextInput
        placeholder="Enter your Name"
        onChangeText={(value) => setFullName(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="blue"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={CreateNewAccount} style={styles.button}>
        {!loading ? <Text style={styles.buttonText}>Sign Up</Text> :
         <ActivityIndicator size={25} color='black' />}
      </TouchableOpacity>

      <View style={styles.textConatiner}>
        <Text style={styles.txt}>Already have an account?</Text>
        <Pressable onPress={() => router.push("/auth/signIn")}>
          <Text style={styles.sigintxt}>Sign In Here!</Text>
        </Pressable>
      </View>
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 25,

    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  image: {
    width: 320,
    height: 250,
    resizeMode: "center",
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
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfit",
  },
  textConatiner: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 15,
  },
  sigintxt: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
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
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15,
  },
});
