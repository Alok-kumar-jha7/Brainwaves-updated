import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";



export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <NoCourse />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    padding: 35,
    paddingTop: Platform.OS == 'ios' && 45,
  },
});
