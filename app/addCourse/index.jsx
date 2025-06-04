import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { generateTopics, generateCourses } from "../../config/geminiAiConfig";
import Prompt from "../../constant/Prompt";
import Toast from "react-native-toast-message";
import { setDoc, doc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailsContext";
import { db } from "../../config/firebaseConfig";
import { useRouter } from "expo-router";
export default function AddCourse() {
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [generatedTopics, setGeneratedTopics] = useState([]);
  const { userDetail } = useContext(UserDetailContext);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const router = useRouter();

  const onGenerateTopic = async () => {
    setLoadingTopics(true);
    Toast.show({
      type: "Waiting",
      text1: "Please wait...⏳",
      text2: "We’re processing your request...",
      visibilityTime: 3000,
      position: "top",
    });
    const PROMPT = `Learn ${userInput}:
            ${Prompt.IDEA}`;
    const aiResponse = await generateTopics(PROMPT);
    const topicIdea = JSON.parse(aiResponse.text);
    console.log("Parsed Topic Idea:", topicIdea);
    setGeneratedTopics(topicIdea);
    setLoadingTopics(false);
  };
  const onSelectTopic = (topic) => {
    const isAlreadySelected = selectedTopics.find((item) => item == topic);
    if (!isAlreadySelected) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };
  const isTopicSelected = (topic) => {
    const selction = selectedTopics.find((item) => item == topic);
    return selction ? true : false;
  };
  const onGenerateCourse = async () => {
    try {
      setLoadingCourses(true);
      Toast.show({
        type: "Waiting",
        text1: "Please wait...⏳",
        text2: "We’re processing your request...",
        visibilityTime: 3000,
        position: "top",
      });

      const PROMPT = `${selectedTopics} + ${Prompt.COURSE}`;
      const aiResponse = await generateCourses(PROMPT);
      const courses = JSON.parse(aiResponse.text);

      Toast.show({
        type: "success",
        text1: "Course Generated Successfully! 🎉",
        text2: `Course Name: ${courses[0]?.name}\nDescription: ${courses[0]?.description}`,
        visibilityTime: 5000,
        position: "top",
      });

      console.log("Generated Course:", courses);

      await setDoc(doc(db, "Courses", Date.now().toString()), {
        ...courses,
        createdAt: new Date().toISOString(),
        createdBy: userDetail?.name,
        createdByEmail: userDetail?.email,
      });

      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error generating course:", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong! ❌",
        text2: error.message || "Please try again later.",
        visibilityTime: 5000,
        position: "top",
      });
    } finally {
      setLoadingCourses(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Course</Text>
      <Text style={styles.descrp}>What you want to learn today?</Text>
      <Text style={styles.para}>
        Write the name of course you want to create.(ex.Learn Python,Digital
        marketting,10th Science Chapters,etc.....)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter course topic"
        multiline={true}
        value={userInput}
        onChangeText={(value) => setUserInput(value)}
      />

      <Button
        text="Generate Topics"
        onPress={() => onGenerateTopic()}
        loading={loadingTopics}
        type="outline"
      />

      <View style={styles.topicsContainer}>
        <Text style={styles.topicsHeader}>
          Select the topics that you want to add on this course
        </Text>
        <ScrollView maxHeight={190}>
          <View style={styles.pressview}>
            {generatedTopics.map((item, index) => (
              <Pressable key={index} onPress={() => onSelectTopic(item)}>
                <Text
                  style={{
                    padding: 10,
                    borderWidth: 0.45,
                    borderRadius: 15,
                    backgroundColor: isTopicSelected(item)
                      ? Colors.PRIMARY
                      : null,
                    color: isTopicSelected(item)
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      {selectedTopics?.length > 0 && (
        <Button
          text="Genrate Course"
          onPress={() => onGenerateCourse()}
          loading={loadingCourses}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginTop: 20,
    color: "#36454F",
  },

  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  descrp: {
    fontSize: 26,
    fontFamily: "outfit",
    marginTop: 5,
  },
  para: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    height: 100,
    marginTop: 15,

    textAlignVertical: "top",
    fontSize: 16,
    fontFamily: "outfit",
    backgroundColor: Colors.BG_GRAY,
  },
  topicsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 10,
  },
  topicsHeader: {
    fontSize: 20,
    fontFamily: "outfit",
  },
  pressview: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
});
