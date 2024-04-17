import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({label, props, onChangeText}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput  {...props} style={styles.input} onChangeText={onChangeText}/>
  </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container:{
        position: "relative",
        justifyContent: 'center',
        marginTop:20
    },
    input:{
        borderBottomWidth:1,
        borderRadius:10,
        paddingVertical:15,
        fontSize:18,
        color:'black',
        width:'100%'
    },
    label:{
        color:'black',
        fontSize:16
    }
})