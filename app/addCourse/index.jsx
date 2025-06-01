import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import Button from '../../components/Shared/Button'
import { generateTopics } from '../../config/geminiAiConfig';
import Prompt from '../../constant/Prompt';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [generatedTopics, setGeneratedTopics] = useState([]);

    const onGenerateTopic = async () => {
        setLoading(true);
            const PROMPT = `Learn ${userInput}:
            ${Prompt.IDEA}`;
            const aiResponse = await generateTopics(PROMPT);
            const topicIdea = JSON.parse(aiResponse.text);
            if (Array.isArray(topicIdea)) {
                setGeneratedTopics(topicIdea);
            } else {
                throw new Error('Invalid response format');
            }
            setLoading(false);
        }
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create New Course</Text>
            <Text style={styles.descrp}>What you want to learn today?</Text>
            <Text style={styles.para}>Write the name of course you want to create.(ex.Learn Python,Digital marketting,10th Science Chapters,etc.....)</Text>
            
            <TextInput 
                placeholder='(Ex. Learn Java,Javascript,Python.....)'
                style={styles.input}
                numberOfLines={3}
                multiline={true}
                value={userInput}
                onChangeText={(value) => setUserInput(value)}
            />  
            
            <Button 
                text={'Generate Topic'}
                type='outline' 
                onPress={() => onGenerateTopic()} 
                loading={loading}
            />

            <View style={styles.topicsContainer}>
                <Text style={styles.header}>Select the tpoics that you want to add on this course</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginTop: 20,
        color:'#36454F'
    }, 
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    descrp: {
        fontSize: 26,
        fontFamily: 'outfit',
        marginTop: 5,
    },
    para:{
        fontFamily: 'outfit',
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
        textAlignVertical: 'top',
        fontSize: 16,
        fontFamily: 'outfit',
        backgroundColor: Colors.BG_GRAY,
    },
    topicsContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 10,
    },
    topicsHeader: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
        marginBottom: 10,
        color: '#36454F',
    },
    topicItem: {
        fontSize: 16,
        fontFamily: 'outfit',
        marginBottom: 8,
        color: '#333',
        paddingLeft: 5,
    },
})