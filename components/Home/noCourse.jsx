import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Button from "../../components/Shared/Button";

export default function NoCourse() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/books.png")}
        style={styles.image}
      />
      <Text style={styles.imgHeader}>You Don't Have Any Courses</Text>
      <Button text={"Create New Course"} />
      <Button text={"Explore Existing Courses"}
      type='outline'/>
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
