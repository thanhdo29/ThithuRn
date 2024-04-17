import { View, Text, StyleSheet, Image, PermissionsAndroid, Alert, Animated } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { addXeMayApi } from '../redux/xeMayAction'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native';



const AddScreen = () => {
  const navigation = useNavigation();
  const [ten, setTen] = useState('');
  const [mau, setMau] = useState('');
  const [gia, setGia] = useState(0);
  const [mota, setMota] = useState('');
  const [anh, setAnh] = useState('');

  const dispatch = useDispatch();
  const [slideAnim] = useState(new Animated.Value(0));



  const handleTextInput = (text, field) => {
    if (field === "ten") {
      setTen(text)
    } else if (field === "mau") {
      setMau(text)
    } else if (field === "gia") {
      setGia(text)
    } else if (field === "mota") {
      setMota(text)
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        // const result = await launchCamera({mediaType:'photo',cameraType:'back'})
        // setImg1(result.assets[0].uri);

        const result = await launchImageLibrary({ mediaType: "photo" });
        setAnh(result.assets[0].uri);
        console.log(anh);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleAdd = () => {
    if (ten.length === 0 || mau.length === 0 || gia.length === 0 || mota.length === 0) {
      Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin");
      return;
    }

    dispatch(addXeMayApi({ ten_xe: ten, mau_sac: mau, gia_ban: Number(gia), mo_ta: mota, hinh_anh: anh }))
      .then(() => {
        Animated.timing(slideAnim, {
          toValue: 500, 
          duration: 500, 
          useNativeDriver: true, 
        }).start(() => {
          navigation.navigate('home'); 
        });
      })
      .catch((e) => {
        console.log(e);
      })

  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <View style={{ alignItems: 'center' }}><Text style={styles.title}>Thêm sản phẩm</Text></View>
      <CustomTextInput label={'Tên sản phẩm'} onChangeText={(txt) => handleTextInput(txt, "ten")} />
      <CustomTextInput label={'Màu sắc'} onChangeText={(txt) => handleTextInput(txt, "mau")} />
      <CustomTextInput label={'Giá bán'} onChangeText={(txt) => handleTextInput(txt, "gia")} />
      <CustomTextInput label={'Mô tả'} onChangeText={(txt) => handleTextInput(txt, "mota")} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity style={styles.btnChooseImg} onPress={() => requestCameraPermission()}>
          <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
        </TouchableOpacity>
        {anh !== "" ? <Image source={{ uri: anh }} style={{ width: 55, height: 55 }} /> : ""}
      </View>
      <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
        <CustomButton label={'Xác nhận'} onPress={() => handleAdd()} />
      </View>
    </Animated.View>
  )
}

export default AddScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black'
  },
  btnChooseImg: {
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    width: 80,
    paddingVertical: 3,
    marginRight: 6

  }
})