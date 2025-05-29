import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'

export default function Button({text,type="fill",onPress    }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    buttonContainer: {
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        backgroundColor:type=="fill"?Colors.PRIMARY:Colors.WHITE,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        color: type=="fill"?Colors.WHITE:Colors.PRIMARY,
        fontFamily: "outfit",
    },

})