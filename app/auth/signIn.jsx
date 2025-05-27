import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Colors from "../../constant/Colors";

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);      
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/log.png")}
        style={styles.image}
      />

      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.para}>Sign In to start learning. </Text>

     
      <TextInput placeholder="Email" style={styles.input} />

      
      
        <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Password'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color='blue'
          />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.textConatiner}>
        <Text style={styles.txt}>New Here?</Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text style={styles.sigintxt}>Create an Account!</Text>
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
  },

 passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    width: '100%'
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15
  },

});
