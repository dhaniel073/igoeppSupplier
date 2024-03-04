import { Alert, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Border, Color, DIMENSION, FontSize, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { RequestSumTotal, ServiceHis, ServiceHisById } from '../Utils/AuthRoute'
import { AuthContext } from '../Utils/AuthContext'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import Modal from 'react-native-modal'
import {MaterialIcons} from "@expo/vector-icons"
import { Image, ImageBackground } from 'expo-image'

const ServiceHistory = ({navigation}) => {
  const [isloading, setisloading] = useState(false)
  const [isfetching, setisfetching] = useState(false)
  const [history, sethistory] = useState([])
  const authCtx = useContext(AuthContext)
  const [details, setDetails] = useState([])
  const [isModalVisible, setisModalVisible] = useState(false)
  const delivered = "D"

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      try {
        setisloading(true)
        const response = await ServiceHis(authCtx.Id, authCtx.token)
        console.log(response)
        sethistory(response)
        setisloading(false)        
      } catch (error) {
        setisloading(true)
        console.log(error.response)
        Alert.alert('Error', 'Sorry an error occured try again later', [
          {
            text:"Ok",
            onPress: () => navigation.goBack()
          }
        ])
        setisloading(false)
      }
    })
    return unsuscribe;
  }, [])

  useEffect(() => {
    navigation.addListener('focus', async () => {
    SumTotalAmt()
  })
}, [])

  const SumTotalAmt = async () => {
    try {
      const response = await RequestSumTotal(authCtx.Id , authCtx.token)
      // console.log(response)
        authCtx.suppliersumtot(response)
    } catch (error) {
      return;
    }
  }

  const toggleModal = () => {
    setisModalVisible(!isModalVisible)
  }

  const ViewDetails = async (id) => {
    try {
      setisfetching(true)
      const response = await ServiceHisById(id, authCtx.token)
      // console.log(response)
      setDetails(response)
      setisfetching(false)
    } catch (error) {
      setisfetching(true)
      Alert.alert("Sorry", "An error occured try again later", [
        {
          text:"Ok",
          onPress: () => navigation.goBack()
        }
      ])
      setisfetching(false)
      return;
    }
  }


  const NoServiceRequest = () => {
    return (
      <View style={{ justifyContent:'center', alignItems:'center', marginTop: '70%' }}>
        <Text style={{ fontSize: FontSize.size_sm, color: Color.dimgray_100, fontFamily: 'poppinsSemiBold' }}>No Service Completed</Text>
      </View>
    )
  }



  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }

  return (
    <View style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.servicehistorytxt}>Service History</Text>
      <>        
          {history.length === 0 ? <NoServiceRequest/> : 
            <>                          
            {/* <ImageBackground  style={{backgroundColor:'#F%F%F%', padding:5}} source={require("../assets/53541125-white-background-soft-light-grey-texture.jpg")}>
              <Text style={{textAlign:'center', fontSize:18, color:'grey', fontFamily:'poppinsMedium'}}>Completed Services</Text>
            </ImageBackground> */}

            <View style={{marginTop:8, marginBottom:10}}/>
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              style={{marginBottom:10}}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
              <>
              {item.delivery_status === delivered &&
              <View style={styles.pressable}>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:15, marginBottom:3}}>
                  <Text style={styles.itemText}>{item.purchase_id}</Text>
                  {/* <Text style={styles.itemText}>{item.delivery_status}</Text> */}
                  <Text style={styles.itemText}>{item.payment_mode === "W" ? "Wallet" : "Cash"}</Text>
                </View>


                  <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:10}}>
                    <Text style={styles.itemprice}>NGN {item.price}</Text>    

                  <TouchableOpacity style={{justifyContent:'center', flexDirection:'row',}} onPress={() => [toggleModal(), ViewDetails(item.id)]}>
                    <Text style={{textAlign:'center', fontFamily:'poppinsRegular', color: Color.tomato, fontSize:12}}> View Details</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              }
                </>
              )}
              
            />
              </>
          }
          </>


        <Modal isVisible={isModalVisible}>
          
        <SafeAreaView style={styles.centeredView}>
          <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => toggleModal()}>
            <MaterialIcons name="cancel" size={30} color="white" />
          </TouchableOpacity>

            <View style={styles.modalView}>
              <Text style={styles.modalText}>Details</Text>

                {isfetching ? <LoadingOverlay/> : 
                <FlatList
                  data={details}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <View>
                      {
                        Platform.OS === 'android' ?
                          <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.10,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                        :
                        <Image source={require("../assets/igoepp_transparent2.png")} style={{height:130, width:130, position:'absolute', alignContent:'center', alignSelf:'center', top:DIMENSION.HEIGHT * 0.05,justifyContent:'center', opacity:0.3, }} contentFit='contain'/>
                      }

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
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Country :</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_country}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>State :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_state}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>L.G.A :</Text>
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
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Status :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.delivery_status === "R" ? "Dispatched" : item.delivery_status === "P" ? "Packaged" : item.delivery_status === "D" ? "Delivered" : "Undelivered"}</Text>
                      </View>


                    </View>
                  )}    
                />
              }
              <View style={{ marginBottom:20}}/>  
          </View>

        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default ServiceHistory

const styles = StyleSheet.create({
  itemprice:{
    fontFamily:'poppinsRegular',
    fontSize:12,
    color: Color.tomato
  },
  servicehistorytxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:10,
  }, 
  pressable:{
    backgroundColor: Color.mintcream,
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderStyle: "solid",
    margin:3,
    borderRadius: Border.br_3xs,
    padding:16
  },
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
})

// const styles = StyleSheet.create({
//   servicehistorytxt:{
//     fontSize: 18,
//     color: Color.darkolivegreen_100,
//     fontFamily: 'poppinsSemiBold',
//     left: 10,
//     marginTop:10,
//     marginBottom:15,
//   }, 
//   pressable:{
//     backgroundColor: Color.mintcream,
//     borderColor: "rgba(151, 173, 182, 0.2)",
//     borderWidth: 1,
//     borderStyle: "solid",
//     margin:4,
//     borderRadius: Border.br_3xs,
//     padding:10
//   },
// })