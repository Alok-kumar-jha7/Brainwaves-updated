import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailsContext";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Hello ,{userDetail?.name}</Text>
        <Text style={styles.headertxt}>Let's Get Started</Text>
          </View>
          <TouchableOpacity>
          <Ionicons name="settings-outline" size={30} color='black' marginTop='5' />
            </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  headertxt: {
    fontFamily: "outfit",
    fontSize: 17,
    alignItems: "center",
  },
});
