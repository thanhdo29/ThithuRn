import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Banner from '../components/Banner'
import ListXe from '../components/ListXe'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  const navigation = useNavigation();
  

  const dispatch = useDispatch();
  const [scaleValue] = useState(new Animated.Value(1));


  const doAdd = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('add');
    })
  }

  return (
    <View>
      <ScrollView>
        <View>
          <Banner linkImg={'https://i.pinimg.com/736x/de/19/3b/de193b5b36bf05290ee8866d4fae0adc.jpg'} />
          <ListXe label={'Danh sách xe'} />
        </View>
      </ScrollView>
      <Animated.View style={[styles.btnContainer, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity style={styles.btn} onPress={() => doAdd()}>
          <Text style={styles.textBtn}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  btn: {
    width: 55,
    height: 55,
    backgroundColor: '#66CCFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',

  },
  btnChooseImg: {
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    width: 80,
    paddingVertical: 3,
    marginRight: 6

  },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: '500',
    color: 'black'
  },
})