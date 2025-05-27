import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/signup.png")}
        style={styles.image}
      />

      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.para}>Sign Up to get started! </Text>

      <TextInput placeholder="Enter your FullName" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.textConatiner}>
      <Text style={styles.txt}>
        Already have an account?
      </Text>
      <Pressable>
          <Text style={styles.sigintxt}>Sign IN Here!</Text>
        </Pressable>
        </View>
    </View>
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
  txt:{
    fontFamily: "outfit-bold",
  }
});
