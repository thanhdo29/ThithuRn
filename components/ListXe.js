import { Alert, Animated, Image, Modal, StyleSheet, Text, View,TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteXeMayApi, fetchXeMay, updateXeMayApi } from '../redux/xeMayAction';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const ListXe = ({ label }) => {
  const navigation=useNavigation();
  const dispath = useDispatch();
  const listXeMay = useSelector(state => state.xemay.xemays);
  const [modalVisible, setModalVisible] = useState(false);
  const [ten, setTen] = useState('');
  const [mau, setMau] = useState('');
  const [gia, setGia] = useState('');
  const [mota, setMota] = useState('');
  const [anh, setAnh] = useState('');
  const [selectItem, setSelectItem] = useState();


  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);


  useEffect(() => {
    dispath(fetchXeMay());
  }, [dispath])

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

  const doUpdate = (item) => {
    setModalVisible(true);
    setTen(item.ten_xe);
    setMau(item.mau_sac);
    setGia(item.gia_ban);
    setMota(item.mo_ta);
    setSelectItem(item);
    setAnh(item.hinh_anh);
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

  

  const handleUpdateXe = () => {
    dispath(updateXeMayApi({id:selectItem.id, ten_xe:ten, mau_sac:mau, gia_ban:gia, mo_ta:mota, hinh_anh:anh}))
      .then(()=>{
        Alert.alert("Thông báo", "Sửa thành công");
        setModalVisible(false);
      })
      .catch((e)=>{
        console.log(e);
      })

  }
  const handleDeleteXe = (item) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn xóa không", [
      {
        text: "Hủy",
        style: "cancel"
      },
      {
        text: "Có",
        style: "destructive",
        onPress: () => {
          dispath(deleteXeMayApi(item.id))
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      {
        listXeMay.map(item => (
          <Animated.View style={[styles.containerItem, { opacity: fadeAnim }]} key={item.id}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Image style={styles.img} source={{ uri: item.hinh_anh }} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text>Tên xe: {item.ten_xe}</Text>
                <Text>Giá: {item.gia_ban} đ</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CustomButton label={'Sửa'} onPress={()=>doUpdate(item)}/>
              <View style={{ marginLeft: 10 }}></View>
              <CustomButton label={'Xóa'} onPress={() => handleDeleteXe(item)} />
            </View>
          </Animated.View>
        ))
      }

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Sửa sản phẩm</Text>
            </View>
            <CustomTextInput props={{ value: ten }} label={'Tên xe máy'} onChangeText={(txt) => handleTextInput(txt, "ten")} />
            <CustomTextInput props={{ value: mau }} label={'Màu xe'} onChangeText={(txt) => handleTextInput(txt, "mau")} />
            <CustomTextInput props={{ value: gia.toString() }} label={'Giá xe'} onChangeText={(txt) => handleTextInput(txt, "gia")} />
            <CustomTextInput props={{ value: mota }} label={'Mô tả'} onChangeText={(txt) => handleTextInput(txt, "mota")} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <TouchableOpacity style={styles.btnChooseImg} onPress={() => requestCameraPermission()}>
                <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
              </TouchableOpacity>
              {anh !== "" ? <Image source={{ uri: anh }} style={{ width: 55, height: 55 }} /> : ""}
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 50 }}>
              <CustomButton label={'Xác nhận'} onPress={() => handleUpdateXe()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}


export default ListXe

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    padding: 10
  },
  containerItem: {
    padding: 5,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
    margin: 10
  },
  img: {
    width: 55, height: 55,
    borderRadius: 3
  },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: '500',
    color: 'black'
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
    width: '90%'
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