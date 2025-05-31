import { View, Text, StyleSheet, TextInput} from 'react-native'
import React,{ useState } from 'react'
import Colors from '../../constant/Colors'
import Button from '../../components/Shared/Button'


export default function AddCourse() {
    
    const onGenrateTopic = () => {
        console.log("Generate Topic button pressed");
        
    }
  return (
    <View style={styles.constainer}>
          <Text style={styles.header}>Create New Course</Text>
          <Text style={styles.descrp}>What you want to learn today?</Text>
          <Text style={styles.para}>Write the name of course you want to create.(ex.Learn Python,Digital marketting,10th Science Chapters,etc.....)</Text>
          <TextInput placeholder='(Ex. Learn Java,Javascript,Python.....)' style={styles.input}
              numberOfLines={3}
              multiline={true} />
          <Button text={'Generate Topic'}
              type='outline' onPress={() => onGenrateTopic()} />
          
    </View>
  )
}
const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginTop: 20,
        color:'#36454F'
    }, 
    constainer: {
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
        color:Colors.GRAY
    },
    input: {
       padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        marginTop: 15,
        alignItems: 'flex-start',
        fontSize: 16,
        fontFamily: 'outfit',
        backgroundColor: Colors.BG_GRAY,
    }
})