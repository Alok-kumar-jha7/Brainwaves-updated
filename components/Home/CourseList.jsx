import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";

export default function CourseList({ courseList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.courseLists}>Courses</Text>
      <FlatList
        data={courseList}
        renderItem={({ item, index }) => {
          console.log("item", item.courses.courseTitle);
          return (
            <View key={index} >
              <Image
                style={styles.bannerImage}
                source={imageAssets[item.course.banner_image]}
              />
              <Text style={styles.courseTitle}>{item.course.courseTitle}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  courseLists: {
    fontFamily: "outfit-bold",
    fontSize: 24,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
//   courseTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 8,
//     paddingHorizontal: 10,
//     color: "#333", // Add color to ensure visibility
//   },
});