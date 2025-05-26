import Colors from "./../constant/Colors"
import {Image, View,Text , StyleSheet} from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image source={require('../assets/images/landingimg.png')} style={styles.landingImage} />
      

      <View style={styles.description }>
        <Text style={styles.header}>
          Welcome to Brainwaves
        </Text>
        <Text style={styles.paragraph}>Transform your ideas into engaging educational content,efficiently with AI!📚🤖</Text>

        <View style={styles.button}>
          <Text style={[styles.buttonText,{color:"orange"}]}>Get Started</Text>
        </View>
        <View style={styles.button}>
          <Text style={[styles.buttonText, { color: "grey" }]}>Already have an Account?</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.WHITE,
  },
  landingImage: {
    width: '100%',
    height: 300,
    marginTop: 70,
    resizeMode: 'contain',
    
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
    textAlign: 'center',
    fontFamily: 'outfit-bold',
  },
  paragraph: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'outfit',
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 17,
    borderRadius: 10,
    marginTop: 20,

  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'outfit',
  },
});