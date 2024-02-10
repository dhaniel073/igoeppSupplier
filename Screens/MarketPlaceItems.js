import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GoBack from '../Components/Ui/GoBack'
import { Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import { AuthContext } from '../Utils/AuthContext'
import { CartItem, DeleteProduct, SupplierProductUpdate, UploadProductPicture } from '../Utils/AuthRoute'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { Image, ImageBackground } from 'expo-image'
import {AntDesign} from '@expo/vector-icons'
import Input from '../Components/Ui/Input'
import {Ionicons, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import Modal from 'react-native-modal'
import * as ImagePicker from 'expo-image-picker'
import SubmitButton from '../Components/Ui/SubmitButton'


const data = [
  {
    id:"Y",
    name: "Available"
  },
  {
    id:"N",
    name: 'Unavailable'
  }
]


const MarketPlaceItems = ({navigation, route}) => {
    const authCtx = useContext(AuthContext)
    const categoryId = route.params.categoryId
    const [isFetching, setIsFetching] = useState(false)
    const [fetchedcategory, setFetchedCategory] = useState([])

    const [image, setImage] = useState(null);
    const [imagebase, setImageBase] = useState(null);
    const [imagemodalvisible, setimagemodalvisible] = useState(false)
    const [avail, setavail] = useState('')
    const [availvalid, setavailvalid] = useState(false)
  
    const [id, setId] = useState(route?.params?.id)
    const [product_categoryid, setproduct_categoryid] = useState(route?.params?.id)
    const [supplier_productid, setsupplier_productid] = useState(route?.params?.sup_id)
    const [name, setName] = useState(route?.params?.name)
    const [description, setDescription] = useState(route?.params?.desc)
    const [pics, setPics] = useState(route?.params?.pics)
    const [price, setPrice] = useState(route?.params?.price)
    const [status, setstatus] = useState(route?.params?.status)
    const [shippingcost, setshippingcost] = useState(route?.params?.shipping.toString())


  
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async() => {
        try {
          if(route?.params?.avail === 'N'){
            setavail(route?.params?.avail)
          }else if(route?.params?.avail === 'Y'){
            setavail(route?.params?.avail)
          }else{
            return;
          }
        } catch (error) {
          return 
        }
      })
      return unsubscribe;
    }, [])


    // console.log(route.params)


  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'name':
        setName(enteredValue)
        break;
      case 'description':
        setDescription(enteredValue)
        break;
      case 'pics':
        setPics(enteredValue)
        break;
      case 'price':
        setPrice(enteredValue)
        break;
      case 'status':
        setstatus(enteredValue)
        break;
      case 'shipping_price':
        setshippingcost(enteredValue)
        break; 
    }
  }

  const toggleImageModal = () => {
    setimagemodalvisible(!imagemodalvisible)
  }

  const captureimage = async () => {
    ImagePicker.getCameraPermissionsAsync()
    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[6,8],
      quality: 0.75,
      base64: true
    })

    if(result.canceled){
      toggleImageModal()
      return;
    }
    
    if(!result.canceled){
      setImage(result.assets[0].uri)
      setImageBase(result.assets[0].base64)
      toggleImageModal()
    }
}
const pickImage = async () => {
    ImagePicker.getMediaLibraryPermissionsAsync()

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[6,8],
        quality: 0.75,
        base64: true
    })

    if(result.canceled){
      toggleImageModal()
      return;
    }
    
    if(!result.canceled){
      setImage(result.assets[0].uri)
      setImageBase(result.assets[0].base64)
      toggleImageModal()
    }
  }

  const deleteImage = () => {
    setisloading(true)
    Alert.alert("Remove Image", "Do you want to delete selected Image", [
      {
        text: "No",
        onPress: () => {}
      },
      {
        text: "Yes",
        onPress: () => [
          setisloading(true),
          setImage(null), 
          setImageBase(null),
          setisloading(false)
        ]
      },
    ])
    setisloading(false)
  }

  

  const NoItemNote = () => {
    return (
      <View style={{justifyContent:'center', alignItems:'center',marginTop: DIMENSION.HEIGHT * 0.33}}>
        <Text style={{fontSize: 14, color: 'grey', fontFamily: 'poppinsSemiBold'}}>No Items Available</Text>
      </View>
    )
  }

  const pictureReturn = () => {
    if(route?.params?.pics === null){
      return  require("../assets/noproduct_image.jpg")
    }else{
      return {uri:`https://phixotech.com/igoepp/public/products/${route?.params?.pics}`}
    }
  }

  const updateproduct = async () => {
    try {
      setIsFetching(true)
      const response = await SupplierProductUpdate(product_categoryid, authCtx.Id, name, description, price, shippingcost, avail, authCtx.token)
      // console.log(product_categoryid, supplier_productid, name, description, price, shippingcost, avail, authCtx.token)
      console.log(response)
      Alert.alert('Successful', 'Product updated successfully', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack()
        }
      ])
      setIsFetching(false)
    } catch (error) {
      setIsFetching(true)
      Alert.alert('Error', 'An error occured while updating product', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack()
        }
      ])
      console.log(error.response)
      setIsFetching(false)
    }
  }

  const uploadImage = async () => {
    const uploadUrl = `data:image/jpeg;base64,${imagebase}`
    try {
      setIsFetching(true)
      const response = await UploadProductPicture(uploadUrl, id, authCtx.token)
      console.log(response)
      Alert.alert('Successful', "Producct image updated successfully", [
        {
          text: "Ok",
          onPress: () => {}
        }
      ])
      setIsFetching(false)
    } catch (error) {
      setIsFetching(true)
      console.log(error.response)
      Alert.alert('Error', 'An error occured while updating product', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack()
        }
      ])
      setIsFetching(false)
    }
  }

  const deletehandler = async () => {
    try {
      setIsFetching(true)
      const response = await DeleteProduct(product_categoryid, authCtx.token)
      console.log(response)
      Alert.alert('Successful', "Product deleted successfully", [
        {
          text: "Ok",
          onPress: () => navigation.goBack()
        }
      ])
      setIsFetching(false)
    } catch (error) {
      setIsFetching(true)
      console.log(error.response.data)   
      setIsFetching(false)
    }
  }

  if(isFetching){
    return <LoadingOverlay message={"..."}/>
  }

  return (
    <SafeAreaView style={{flex:1, marginTop:marginStyle.marginTp, marginHorizontal:10}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:5}}>
      <View>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
        <Text style={styles.marketplacetxt}>Product Update</Text>
      </View>

      <TouchableOpacity style={{marginRight:5, marginTop:2}} onPress={() => Alert.alert('Delete Product', 'Are you sure you want to delete this product', [
        {
          text: 'No',
          onPress: () => {}
        },
        {
          text: 'Yes',
          onPress: () => deletehandler()
        }
      ])}>
        {/* <AntDesign name="plus" size={24} color={Color.darkolivegreen_100} /> */}
        <MaterialIcons name="delete-forever" size={27} color={Color.darkolivegreen_100} />
      </TouchableOpacity>
    </View>
      {/* <Text>{route.params.id}</Text> */}
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
         {/* {defaultimage()} */}
        <View style={{ alignItems: 'center',}}>
          <TouchableOpacity  onPress={ () => toggleImageModal()}>
            <View style={{ 
                // height: 100,
                // width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
             }}>
                <ImageBackground
                source={!image ? pictureReturn() : image}
                style={{ height: 100, width:100, borderWidth: 1, borderRadius: 15}}
                imageStyle={{ borderRadius: 15, }}
                >
                  <View style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                   }}>
                    <Ionicons name="camera" size={35} style={{ 
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent:'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                      }} color={Color.darkolivegreen_100}/>
                  </View>   
                
                </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
       
    <View style={{justifyContent:'center', marginTop:10}}>

        {!image ? 
        <TouchableOpacity>
            <Text style={{textAlign:'center', fontSize:16,fontFamily:'poppinsRegular'}}>Product Image</Text>
        </TouchableOpacity>
        :
        <View style={{margin:1 ,alignItems:'center', flexDirection:'row', gap:15, justifyContent:'center', }}>
            <TouchableOpacity onPress={() => uploadImage()} style={{backgroundColor: Color.darkolivegreen_100, padding:10, borderRadius:10}}>
                <Ionicons name='cloud-upload' color='#fff' size={24} style={{alignSelf:'center'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteImage()} style={{backgroundColor: Color.darkolivegreen_100, padding:10, borderRadius:10}}>
                <Ionicons name='trash' color='#fff' size={24}/>
            </TouchableOpacity>
        </View>
        }
    </View>
      <Image/> 

      <View style={styles.action}> 
      <Text style={styles.availtext}>Product Name: </Text>
        <TextInput
          placeholder="Product Name"
          placeholderTextColor="#666666"
          onChangeText={updateInputValueHandler.bind(this, 'name')}
          autoCorrect={false}
          autoCapitalize='sentences'
          // value={route.params.firstName}
          value={name}
          // autoCapitalize={true}
          style={[styles.textInput, 
          ]}
        />   
      </View>

      <View style={styles.action}> 
        <Text style={styles.availtext}>Product Description: </Text>
        <TextInput
          placeholder="Product Description"
          placeholderTextColor="#666666"
          onChangeText={updateInputValueHandler.bind(this, 'description')}
          autoCorrect={false}
          autoCapitalize='sentences'
          // value={route.params.firstName}
          value={description}
          // autoCapitalize={true}
          style={[styles.textInput, 
          ]}
        />  
      </View> 
      <Text style={[styles.availtext, {marginHorizontal:10}]}>Product Availability</Text>
        <View style={{flexDirection:'row'}}>
        {data.map((item, key) => 
              <View key={key} style={{flexDirection:'row', padding:10, alignContent:'center', flex:1, marginLeft:20}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setavail(item.id)}>
                <Text style={styles.availtext}>{item.name}</Text>
                <TouchableOpacity style={styles.outer} onPress={() => [setavail(item.id), setavailvalid(false)]}>
                  {avail === item.id && <View style={styles.inner}/>}
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
        )}
        </View>
        {availvalid && <Text style={{textAlign:'center', color: Color.red}}>Select product availability</Text>}
        <View style={{marginBottom:10}}/>

      <View style={styles.action}> 
        <Text style={styles.availtext}>Product Price: </Text>
        <TextInput
          placeholder="Price"
          placeholderTextColor="#666666"
          onChangeText={updateInputValueHandler.bind(this, 'price')}
          autoCorrect={false}
          // value={route.params.firstName}
          value={price}
          // autoCapitalize={true}
          keyboardType='numeric'
          style={[styles.textInput, 
          ]}
        />  
      </View> 

      <View style={styles.action}> 
        <Text style={styles.availtext}>Shipping Price: </Text>
        <TextInput
          placeholder="Shipping Price"
          placeholderTextColor="#666666"
          onChangeText={updateInputValueHandler.bind(this, 'shipping_price')}
          autoCorrect={false}
          keyboardType='numeric'
          // value={route.params.firstName}
          value={shippingcost}
          // autoCapitalize={true}
          style={[styles.textInput, 
          ]}
        />  
      </View> 

      

      <SubmitButton message={"Submit"} style={{marginHorizontal:30, marginTop:10}} onPress={() => updateproduct()}/>
    
    </ScrollView>
         
    <Modal isVisible={imagemodalvisible}>
      <SafeAreaView style={styles.centeredView}>

      <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => toggleImageModal()}>
        <MaterialIcons name="cancel" size={30} color="white" />
      </TouchableOpacity>
      <View style={[styles.modalView,  {width: DIMENSION.WIDTH * 0.7}]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.modalText, {fontSize:15}]}>
          Upload Images
        </Text>

        <View style={{ marginBottom:10}}/>  

        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={[styles.shadow,{borderWidth:1, padding:15, borderRadius:10, marginRight:10, borderColor:Color.darkolivegreen_100}]} onPress={() => captureimage()}>
              <FontAwesome name="camera" size={24} color={Color.darkolivegreen_100} />
            </TouchableOpacity>
            <Text style={[styles.panelBottomTitle, {marginRight:15}]}> Camera</Text>
          </View>

          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={[styles.shadow,{borderWidth:1, padding:15, borderRadius:10, marginLeft:10, borderColor:Color.darkolivegreen_100}]} onPress={() => pickImage()}>
              <Ionicons name="ios-library-sharp" size={24} color={Color.darkolivegreen_100} />
            </TouchableOpacity>
            <Text style={[styles.panelBottomTitle, {marginLeft:15, marginRight:10}]}> Libraries</Text>
          </View>
        </View>

          <View style={{marginBottom:5}}/>
        </View>

      </SafeAreaView>
    </Modal>
  </SafeAreaView>
  )
}

export default MarketPlaceItems

const styles = StyleSheet.create({
  availtext:{
    fontSize:15,
    fontFamily:'poppinsSemiBold',
    color: Color.darkolivegreen_100
  },
  outer:{
    width:20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:8
  },
  inner:{
    width:10,
    height:10,
    backgroundColor: Color.darkolivegreen_100,
    borderRadius:10
  },
  marketplacetxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  pressables:{
    padding:20,
    width: DIMENSION.WIDTH *0.43,
    margin:10,
    height:DIMENSION.HEIGHT *0.17,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    backgroundColor: Color.mintcream,
    overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
  },
  image2:{
    width: 50,
    height: 50,
    marginBottom: 15
  },
  item: {
    fontSize: 10,
    fontFamily: 'poppinsSemiBold',
    textAlign: 'center',
    color: Color.darkolivegreen_100
  },
  textInput:{
    flex: 1,
    fontFamily: 'poppinsRegular',
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    padding:5,
    fontSize: 15,
    top: 8,
  },
  action:{
    // flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginHorizontal:8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: DIMENSION.WIDTH  * 0.9,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
      elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize:18, 
    fontFamily:'poppinsRegular'
  },
  shadow:{
    borderRadius: 20, 
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    backgroundColor: 'white',
    overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
  },
})