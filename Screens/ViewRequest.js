import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Border, Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
<<<<<<< HEAD
import { CustomerRequest, CustomerRequestById, ItemDelivered, ItemDispatched, ItemPackaged, ItemUndelivered, RequestSumTotal, ServiceHis, ServiceHisById } from '../Utils/AuthRoute'
=======
import { CustomerRequest, CustomerRequestById } from '../Utils/AuthRoute'
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
import { AuthContext } from '../Utils/AuthContext'
import {Ionicons} from '@expo/vector-icons'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { Image } from 'expo-image'
import {MaterialIcons} from '@expo/vector-icons'
import Modal from 'react-native-modal'
<<<<<<< HEAD
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'

=======
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e

const deliver_status = [
  { label: 'Undelivered', value: 'N' },
  { label: 'Packaged', value: 'P' },
  { label: 'Dispatched', value: 'R' },
  { label: 'Delivered', value: 'D' },
];


const ViewRequest = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [category, setcategory] = useState([])
  const [isloading, setisloading] = useState(false)
<<<<<<< HEAD
  const [isFetching, setisFetching] = useState(false)
  const [ismodalvisible, setismodalvisible] = useState(false)
  const [isdeliverymodalvisible, setisdeliverymodalvisible] = useState(false)
  const [request, setrequest] = useState([])
  const [isdeliveryfocus, setisdeliveryfocus] = useState(false)
  const [deliverystatus, setdeliverystatus] = useState([])
  const [isdelivery, setisdelivery] = useState(false)
  const [state, setstate] = useState([])
  const [isIdFocus, setIsIdFocus] = useState(false);
  const [IdData, setIdData] = useState([]);
  const [Id, setId] = useState([]);
  const [IsIdcheck, setIsIdcheck] = useState(false)
=======
  const [ismodalvisible, setismodalvisible] = useState(false)
  const [request, setrequest] = useState([])
  const [state, setstate] = useState([])
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e

  // console.log(authCtx.token)

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      try {
        setisloading(true)
<<<<<<< HEAD
        const response = await ServiceHis(authCtx.Id, authCtx.token)
        console.log(response)
        const descArr = response.sort().reverse();
        setcategory(descArr)
        setisloading(false)
      } catch (error) {
        setisloading(true)
        Alert.alert('Error', 'An error occured try again later', [
          {
            text: 'Okay',
            onPress: () => navigation.goBack()
          }
        ])
        // console.log(error.response)
=======
        const response = await CustomerRequest(authCtx.Id, authCtx.token)
        console.log(response)
        setcategory(response.data)
        setisloading(false)
      } catch (error) {
        setisloading(true)
        console.log(error.response)
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
        setisloading(false)
      }
    }) 
    return unsuscribe;
  }, [])

<<<<<<< HEAD
  useEffect(() => {
    const sumtot = navigation.addListener('focus', async () => {
      try {
        const response = await RequestSumTotal(authCtx.Id , authCtx.token)
        console.log(response)
          authCtx.suppliersumtot(response)
      } catch (error) {
        return;
      }
    })
    return sumtot
  }, [])

  const reloadhandle = async () => {
    try {
      setisloading(true)
      const response = await ServiceHis(authCtx.Id, authCtx.token)
      // console.log(response)
      const descArr = response.sort().reverse();
      setcategory(descArr)
      setisloading(false)
    } catch (error) {
      setisloading(true)
      // console.log(error.response)
      setisloading(false)
    }
  }

=======
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
  const toggleModal = () => {
    setismodalvisible(!ismodalvisible)
  }

<<<<<<< HEAD
  const toggledeliveryModal = (id) => {
    const idget = id
    setId(idget)
    setisdeliverymodalvisible(!isdeliverymodalvisible)
  }


  const showRequest = async (id) => {
    // console.log(id)
    try {
      setisFetching(true)
      const response = await ServiceHisById(id, authCtx.token)
      console.log(response)
      setrequest(response)
      setisFetching(false)
    } catch (error) {
      setisFetching(true)
      console.log(error.response)
      Alert.alert("Error", "An error occured, try again later")
      setisFetching(false)
    }
  }

  const deliveredhandle = async () => {
    try {
      setisloading(true)
      const response = await ItemDelivered(Id, authCtx.token)
      console.log(response)
      Alert.alert('Successful', 'Status updated successfully', [
        {
          text: 'Ok',
          onPress: () => reloadhandle()
        }
      ])
      setdeliverystatus([])
      setIdData([])
      setisloading(false)
    } catch (error) {
      setisloading(true)
      setdeliverystatus([])
      setIdData([])
      Alert.alert('Error', 'An error occured try again later', [
        {
          text: 'Okay',
          onPress: () => navigation.goBack()
        }
      ])
      console.log(error.repsonse)
      console.log(error)
      setisloading(false)
    }
  }

  const packagedhandle = async () => {
    try {
      setisloading(true)
      const response = await ItemPackaged(Id, authCtx.token)
      console.log(response)
      Alert.alert('Successful', 'Status updated successfully',  [
        {
          text: 'Ok',
          onPress: () => reloadhandle()
        }
      ])
      setdeliverystatus([])
      setIdData([])
      setisloading(false)
    } catch (error) {
      setisloading(true)
      setdeliverystatus([])
      setIdData([])
      Alert.alert('Error', 'An error occured try again later', [
        {
          text: 'Okay',
          onPress: () => navigation.goBack()
        }
      ])
      console.log(error.response)
      console.log(error)
      setisloading(false)
    }
  }

  const undeliveredhandle = async () => {
    try {
      setisloading(true)
      const response = await ItemUndelivered(Id, authCtx.token)
      console.log(response)
      Alert.alert('Successful', 'Status updated successfully',  [
        {
          text: 'Ok',
          onPress: () => reloadhandle()
        }
      ])
      setdeliverystatus([])
      setIdData([])
      setisloading(false)
    } catch (error) {
      setisloading(true)
      setdeliverystatus()
      setIdData()
      Alert.alert('Error', 'An error occured try again later', [
        {
          text: 'Okay',
          onPress: () => navigation.goBack()
        }
      ])
      console.log(error.repsonse)
      console.log(error)
      setisloading(false)
    }
  }

  const dispatchedhandle = async () => {
    try {
      setisloading(true)
      const response = await ItemDispatched(Id, authCtx.token)
      console.log(response)
      Alert.alert('Successful', 'Status updated successfully',  [
        {
          text: 'Ok',
          onPress: () => reloadhandle()
        }
      ])
      setdeliverystatus([])
      setIdData([])
      setisloading(false)
    } catch (error) {
      setisloading(true)
      setdeliverystatus([])
      setIdData([])
      Alert.alert('Error', 'An error occured try again later', [
        {
          text: 'Okay',
          onPress: () => navigation.goBack()
        }
      ])
      console.log(error.repsonse)
      console.log(error)
      setisloading(false)
    }
  }

  const Getrequesttoupdate = (id) => {
    var config = {
      method: 'get',
      url: `https://phixotech.com/igoepp/public/api/auth/purchasedet/${id}`,
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${authCtx.token}`
      } 
    }
    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data.data))
      console.log(response.data)
      var count = Object.keys(response.data).length
      console.log(count)
      let countryArray = []
      for (var i = 0; i < count; i++){
        countryArray.push({
          label: response.data[i].id.toString(),
          value: response.data[i].id,
        })
        // setCountryCode(response.data.data[i].id)
      }
      setIdData(countryArray)
    })
    .catch(function (error) {
      // console.log(error);
      return;
    })
  }

  const StatusUpdate = async () => {
    if(deliverystatus === 'N'){
      undeliveredhandle()
    }
    else if(deliverystatus === 'R'){
      dispatchedhandle()
    }
    else if(deliverystatus === 'D'){
      deliveredhandle()
    }
    else if(deliverystatus === 'P'){
      packagedhandle()
    }else{
      return;
=======
  const showRequest = async (id) => {
    console.log(id)
    try {
      const response = await CustomerRequestById(id, authCtx.token)
      console.log(response)
      setrequest(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "An error occured, try again later")
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
    }
  }

  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }
<<<<<<< HEAD

  const NoSubCategoryNote = () => {
    return (
      <View style={{ justifyContent:'center', alignItems:'center', marginTop: DIMENSION.HEIGHT * 0.33 }}>
        <Text style={{ fontSize: 14, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Request Made</Text>
      </View>
    )
  }

  // status to consider{
    // delivered = 'D',
    // not delivered = 'N',
    // item dispatched = 'R'
    // item packaged = 'P'
  // } 
=======
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
  
  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.viewrequesttxt}>ViewRequest</Text>

      {category.length === 0 || null || undefined ? <NoSubCategoryNote/> :

      <FlatList
        data={category}
        showsVerticalScrollIndicator={false}
        style={{marginBottom:'20%'}}
        renderItem={({item}) => (
          <View>
            {item.delivery_status !== "D" &&

            <View style={styles.pressable}>
          <View style={{flexDirection:'row'}}>
              <Text style={styles.itemText}>{item.cat_name}</Text>
              <Text style={{fontSize:12, top:3}}> (RID:{item.purchase_id})</Text>
            </View>
              <Text style={{position:'absolute', alignSelf:'flex-end', right:20, color:Color.tomato, top:10}}>{item.delivery_status === "R" ? "Dispatched" : item.delivery_status === "P" ? "Packaged" : item.delivery_status === "D" ? "Delivered" : "Undelivered"}</Text>
            <View style={{flexDirection:'row', marginTop:5, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', top:5}}>
              <Text style={{fontFamily:'poppinsMedium', color: Color.saddlebrown_200, fontSize:11}}>
              <Ionicons name="location" size={12} color="tomato" />
                {item.delivery_lga} {item.delivery_state} { item.delivery_country} </Text>
            </View>
            {/* <Text style={{marginRight:10, fontSize:12}}>Total Amount: {item.sub_total_amount}</Text> */}
            </View>
            {/* <Text style={{marginRight:10, fontSize:12}}>Status: {item.delivery_status === null || 'N' ? "Undelivered" : item.delivery_status === "R" ? "Dispatched" : item.deliver_status === "P" ? "Packaged" :  "Delivered"}</Text> */}

            
            {/* {item.payment_status === 'P' ? 
              <View style={{position:'absolute', justifyContent:'flex-end',  alignSelf:'flex-end', right:20, top:15 }}>
                <Text style={{color: Color.tomato, fontSize:12,}}>Paid</Text>            
              </View>
              : 
              <View style={{position:'absolute', justifyContent:'flex-end',  alignSelf:'flex-end', right:20, top:15 }}>
                <Text style={{color: Color.tomato}}>Not Paid</Text>            
              </View>
            } */}

 
<<<<<<< HEAD
              {/* <View style={{justifyContent:'space-evenly', borderWidth:1, flex:1, alignItems:'flex-end', alignSelf:'flex-start', flexDirection:'row',marginTop: 15, marginLeft:20, marginBottom:10}}> */}
              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop: 15, marginBottom:10}}>
                <TouchableOpacity style={styles.cancelbtn} onPress={() => [toggleModal(), showRequest(item.id)]}>
=======
              <View style={{justifyContent:'space-evenly', alignItems:'flex-end', alignSelf:'flex-start', flexDirection:'row',marginTop: 15, marginLeft:20, marginBottom:10}}>
                <TouchableOpacity style={styles.cancelbtn} onPress={() => [toggleModal(), showRequest(item.purchase_id)]}>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                  <Text style={styles.canceltext}>View Request</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.statusbtn} onPress={() => [toggledeliveryModal(item.id)]}>
                  <Text style={styles.statustext}>Update Status</Text>
              </TouchableOpacity>
              
              </View>
            </View>
            }
          </View>
        )}
      />
<<<<<<< HEAD
      }
     <View style={{marginBottom:50}}/>

        <Modal isVisible={ismodalvisible} style={{maxHeight: DIMENSION.HEIGHT * 0.80, marginTop:DIMENSION.HEIGHT * 0.07}}>
            <SafeAreaView style={styles.centeredView}>

            <View style={styles.modalView}>

            <TouchableOpacity style={{justifyContent:'flex-end',  position:'absolute', alignSelf:'flex-end', marginBottom:5, padding:10 }} onPress={() => toggleModal()}>
              <MaterialIcons name="cancel" size={24} color={Color.darkolivegreen_100} />
            </TouchableOpacity>
              <Text style={styles.modalText}>Details</Text>

                {isFetching ? <LoadingOverlay/> : 
                <FlatList
                  data={request}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
=======
        <View style={{marginBottom:50}}/>

        <Modal isVisible={ismodalvisible}>
            <SafeAreaView style={styles.centeredView}>
            <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => toggleModal()}>
              <MaterialIcons name="cancel" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Details</Text>

                {isloading ? <LoadingOverlay/> : 
                <FlatList
                  data={request}
                  keyExtractor={(item) => item.id}
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                  renderItem={({item}) => (
                    <View>
                      {
                        Platform.OS === 'android' ?
<<<<<<< HEAD
                          <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.07,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                        :
                        <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.05,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                      }
                      {/* {
                        Platform.OS === "android" ? 
                          <View style={{borderBottomWidth:0.5, marginTop:5, borderStyle:"dashed"}}/>
                        :
                        <View style={{borderBottomWidth:0.5, marginTop:5}}/>
                      } */}

                    <View style={{ marginBottom:10}}/>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Id : </Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.id}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular',  fontSize:11}}>Purchase Id :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.purchase_id}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Product Id : </Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.product_id}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Name : </Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.first_name} {item.last_name}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Price : </Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.price}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Delivery Email:</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_email}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Quantity:</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.quantity}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Payment Method:</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.payment_mode === "W" ? "Wallet" : "Cash"}</Text>
                      </View>

                      {/* <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Payment Status:</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.payment_status === "P" ? "Paid" : "Not Paid"}</Text>
                      </View> */}

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Phone Number :</Text>
                        <Text style={{fontFamily:'poppinsRegular', maxWidth:'80%', fontSize:11}}>{item.delivery_phone}</Text>
=======
                          <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.1,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                        :
                        <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.05,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                      }

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Price : </Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.agreed_price === null ? '0.00' : item.agreed_price}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row',  alignItems:'center', }}>
                        <Text style={{marginRight: 20, marginBottom:5, fontSize:11}}>Description :</Text>
                        <Text style={{fontFamily:'poppinsRegular', maxWidth:'70%', textAlign:'right', fontSize:11}}>{item.help_desc}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Help Intervals :</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_frequency}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Landmark :</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_landmark}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Request Type :</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.preassessment_flg === "N" ? "Normal Request" : "Preassessment Request"}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Address :</Text>
                        <Text style={{fontFamily:'poppinsRegular', maxWidth:'80%', fontSize:11}}>{item.help_location}</Text>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Country :</Text>
<<<<<<< HEAD
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_country}</Text>
=======
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_country}</Text>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>State :</Text>
<<<<<<< HEAD
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_state}</Text>
=======
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_state}</Text>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>L.G.A :</Text>
<<<<<<< HEAD
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_lga}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Address:</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_address}</Text>
                      </View>
                      

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular',  fontSize:11}}>Landmark :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_landmark}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular',  fontSize:11}}>Sum Total :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.sub_total_amount}</Text>
=======
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_lga}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Help Size :</Text>
                        <Text  style={{fontFamily:'poppinsRegular',fontSize:11}}>{item.help_size}</Text>
                      </View>
                      
                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular',  fontSize:11}}>Landmark :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_landmark}</Text>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Status :</Text>
<<<<<<< HEAD
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_status === "R" ? "Dispatched" : item.delivery_status === "P" ? "Packaged" : item.delivery_status === "D" ? "Delivered" : "Undelivered"}</Text>
                      </View>



                      {/* <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Date :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.updated_at}</Text>
                      </View> */}
=======
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_status === "A" ? "Active" : item.help_status === "N" ? "Negotiating" : item.help_status === "C" ? "Completed" : "Cancelled"}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Date :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_date}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Time :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_time}</Text>
                      </View>
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
                    </View>
                  )}    
                />
              }
              <View style={{ marginBottom:20}}/>  
            </View>
            </SafeAreaView>
          </Modal>

<<<<<<< HEAD

          <Modal isVisible={isdeliverymodalvisible} style={{maxHeight: DIMENSION.HEIGHT * 0.80, marginTop:DIMENSION.HEIGHT * 0.07}}>
            <SafeAreaView style={styles.centeredView}>

            <View style={styles.modalView}>
            <TouchableOpacity style={{justifyContent:'flex-end',  position:'absolute', alignSelf:'flex-end', marginBottom:5, padding:10 }} onPress={() => [toggledeliveryModal(), setId(null)]}>
              <MaterialIcons name="cancel" size={24} color={Color.darkolivegreen_100} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Delivery Status</Text>

            {/* <Text>Fire{IdData.length}</Text> */}
            {/* <Dropdown
              style={[styles.dropdown, isIdFocus && { borderColor: 'blue' }, IsIdcheck && styles.inputInvalid]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={IdData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isIdFocus ? 'Select request by id' : '...'}
              searchPlaceholder="Search..."
              value={Id}
              onFocus={() =>[ setIsIdFocus(true), setIsIdcheck(false)]}
              onBlur={() => setIsIdFocus(false)}
              onChange={item => {
                setId(item.value);
                setIsIdFocus(false);
              }}
            /> */}

            <Dropdown
              style={[styles.dropdown, isdeliveryfocus && { borderColor: 'blue' }, isdelivery ? styles.inputInvalid : null, ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={deliver_status}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isdeliveryfocus ? 'Select Status' : deliverystatus}
              searchPlaceholder="Search..."
              value={deliverystatus}
              onFocus={() => [setisdeliveryfocus(true), setisdelivery(false)]}
              onBlur={() => setisdeliveryfocus(false)}
              onChange={item => {
                setdeliverystatus(item.value);
                setisdeliveryfocus(false);
              }}
            />

              <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop: 20, marginBottom:5}}>
                <TouchableOpacity style={styles.cancelbtn} onPress={() => [deliverystatus === null || deliverystatus.length === 0 || deliverystatus === undefined ? Alert.alert('Status Empty', 'Select a status to continue') : [StatusUpdate(), toggledeliveryModal()]]}>
                <Text style={styles.canceltext}>Continue</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.statusbtn} onPress={() => [toggledeliveryModal(), setId([])]}>
                <Text style={styles.statustext}>Close</Text>
              </TouchableOpacity> */}
              
              </View>
            </View>
            </SafeAreaView>
          </Modal>

=======
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
    </SafeAreaView>
  )
}

export default ViewRequest

const styles = StyleSheet.create({
<<<<<<< HEAD
  inputInvalid: {
    backgroundColor: Color.error100,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  }, 
  placeholderStyle: {
    fontSize: 16,
  },
=======
>>>>>>> bacd05420795edb414c445a0815f6d8df7be4f6e
  centeredView: {
    flex: 1,
    // backgroundColor: Color.light_black,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: DIMENSION.WIDTH  * 0.9,
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
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
    // marginBottom: 15,
    textAlign: 'center',
    fontSize:18, 
    fontFamily:'poppinsRegular'
  },
  viewrequesttxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  pressable:{
    backgroundColor: Color.mintcream,
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderStyle: "solid",
    margin:4,
    borderRadius: Border.br_3xs,
    padding:10
  },
  cancelbtn: {
    backgroundColor: Color.darkolivegreen_100,
    borderRadius: 3,
    justifyContent:'center',
    width: DIMENSION.WIDTH * 0.36,
    padding: 5
  },
  canceltext:{
    fontFamily: 'poppinsMedium',
    fontSize: 12,
    color: Color.white,
    textAlign: "center",
  },
  statustext:{
    fontFamily: 'poppinsMedium',
    fontSize: 12,
    color: Color.darkolivegreen_100,
    textAlign: "center",
  },
  statusbtn: {
    borderRadius: 3,
    borderWidth:1,
    backgroundColor:'white',
    borderColor: Color.darkolivegreen_100,
    justifyContent:'center',
    width: DIMENSION.WIDTH * 0.36,
    padding: 5
  },

})