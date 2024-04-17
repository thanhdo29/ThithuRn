import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = ({linkImg}) => {
  return (
     <View style={styles.containerBanner}>
        <Image style={styles.img} source={{uri:linkImg}}/>
    </View>
  )
  
}

export default Banner

const styles = StyleSheet.create({
    containerBanner:{
        marginTop:18
    },
    img:{
        width:'100%',
        height:350,
        borderRadius:10,
    }
})