import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({props, onPress, label}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text {...props} style={styles.ladel}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    btn:{
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: '#66CCFF',
        padding:5,
        paddingHorizontal:12
      },
      ladel:{
        fontSize:13,
        color: 'white',
        alignSelf: 'center'
      }
})