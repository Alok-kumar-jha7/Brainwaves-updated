import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { generateTopics } from "../../config/geminiAiConfig";
import Prompt from "../../constant/Prompt";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [generatedTopics, setGeneratedTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const onGenerateTopic = async () => {
    setLoading(true);
    const PROMPT = `Learn ${userInput}.
            ${Prompt.IDEA}`;
    const aiResponse = await generateTopics(PROMPT);
    const topicIdea = JSON.parse(aiResponse.text);
    setGeneratedTopics(topicIdea);
    setLoading(false);
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
        loading={loading}
      />

      <View style={styles.topicsContainer}>
        <Text style={styles.topicsHeader}>
          Select the topics that you want to add on this course
        </Text>
        <ScrollView maxHeight={250}>
        <View style={styles.pressview} >
          {generatedTopics.map((item, index) => (
            <Pressable key={index} onPress={() => onSelectTopic(item)}>
              <Text
                style={{
                  padding: 10,
                  borderWidth: 0.45,
                  borderRadius: 15,
                  backgroundColor: isTopicSelected(item) ? Colors.PRIMARY : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
          </View>
          </ScrollView>
      </View>
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
    marginBottom: 20,
    textAlignVertical: "top",
    fontSize: 16,
    fontFamily: "outfit",
    backgroundColor: Colors.BG_GRAY,
  },
  topicsContainer: {
    marginTop: 10,
    padding: 10,
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
