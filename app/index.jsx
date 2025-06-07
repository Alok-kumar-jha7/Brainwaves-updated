import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constant/Colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { UserDetailContext } from "./../context/UserDetailsContext";
import { useContext } from "react";
import Toast from "react-native-toast-message";

export default function Index() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User is signed in:", user);
      const result = await getDoc(doc(db, "users", user?.email));
      Toast.show({
        type: "info",
        text1: "You have already signed in👋",
        text2: "Welcome back! 🎉",
        visibilityTime: 3000,
        position: "top",
      });
      setUserDetail(result.data());
      router.replace("/(tabs)/home");
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/landingimg.png")}
        style={styles.landingImage}
      />

      <View style={styles.description}>
        <Text style={styles.header}>Welcome to Brainwave</Text>
        <Text style={styles.paragraph}>
          Transform your ideas into engaging educational content, efficiently
          with AI!📚🤖
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text
            style={[styles.buttonText, { color: "orange" }]}
            onPress={() => router.push("/auth/SignUp")}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={[styles.buttonText, { color: "grey" }]}
            onPress={() => router.push("/auth/signIn")}
          >
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  landingImage: {
    width: "100%",
    height: 300,
    marginTop: 70,
    resizeMode: "contain",
  },
  description: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: "100%",
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  paragraph: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "outfit",
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 17,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "outfit",
  },
});
