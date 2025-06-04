import { View, StyleSheet, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { collection, query, where,getDocs, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {UserDetailContext } from "./../../context/UserDetailsContext";



export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

 
  useEffect(() => { userDetail&&GetCourseList }, [userDetail]);
  const GetCourseList = async() => { 
    const q = query(collection(db, "Courses"), where("createdBy", "==", userDetail?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
    //  console.log("Document ID:", doc.id);
      console.log("Document Data:", doc.data());
      setCourseList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      
    })
  }
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
