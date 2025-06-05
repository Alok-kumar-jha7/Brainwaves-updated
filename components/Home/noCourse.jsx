import { View, Text, StyleSheet, Image} from "react-native";
import React from "react";
import Button from "../Shared/Button";
// import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export default function NoCourse() {
  const router = useRouter();
   const handleCreateCourse = () => {
      
    router.push("/addCourse");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/books.png")}
        style={styles.image}
      />
      <Text style={styles.imgHeader}>You Don't Have Any Courses</Text>
      <Button text={"Create New Course"} onPress={handleCreateCourse}/>
      <Button text={"Explore Existing Courses"}
      type='outline' onClick/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  imgHeader: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    textAlign: "center",
  },
});
