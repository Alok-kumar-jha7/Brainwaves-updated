import { View, StyleSheet, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {UserDetailContext } from "./../../context/UserDetailsContext";
import CourseList from "../../components/Home/CourseList";



export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  useEffect(() => { userDetail&&GetCourseList() }, [userDetail]);
  const GetCourseList = async () => { 
    setCourseList([])
    const q = query(collection(db, "Course"), where("createdBy", '==', userDetail?.name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Number of docs found:", querySnapshot.size);
      console.log('document data:-', doc.data());
      setCourseList((prev) => [...prev,doc.data]);
      
    })
  }
  return (
    <View style={styles.container}>
      <Header />
      {courseList?.length == 0 ? < NoCourse /> : <CourseList courseList={courseList} />}
      console.log("courseList", courseList),
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
