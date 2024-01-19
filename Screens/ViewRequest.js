import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Border, Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { CustomerRequest, CustomerRequestById } from '../Utils/AuthRoute'
import { AuthContext } from '../Utils/AuthContext'
import {Ionicons} from '@expo/vector-icons'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { Image } from 'expo-image'
import {MaterialIcons} from '@expo/vector-icons'
import Modal from 'react-native-modal'


const ViewRequest = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [category, setcategory] = useState([])
  const [isloading, setisloading] = useState(false)
  const [ismodalvisible, setismodalvisible] = useState(false)
  const [request, setrequest] = useState([])
  const [state, setstate] = useState([])

  // console.log(authCtx.token)

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      try {
        setisloading(true)
        const response = await CustomerRequest(authCtx.Id, authCtx.token)
        console.log(response)
        setcategory(response.data)
        setisloading(false)
      } catch (error) {
        setisloading(true)
        console.log(error.response)
        setisloading(false)
      }
    }) 
    return unsuscribe;
  }, [])

  const toggleModal = () => {
    setismodalvisible(!ismodalvisible)
  }

  const showRequest = async (id) => {
    console.log(id)
    try {
      const response = await CustomerRequestById(id, authCtx.token)
      console.log(response)
      setrequest(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "An error occured, try again later")
    }
  }

  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }
  
  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.viewrequesttxt}>ViewRequest</Text>

      <FlatList
        data={category}
        showsVerticalScrollIndicator={false}
        style={{marginBottom:'20%'}}
        renderItem={({item}) => (
          <View>
            <View style={styles.pressable}>
          <View style={{flexDirection:'row'}}>
              <Text style={styles.itemText}>{item.cat_name}</Text>
              <Text style={{fontSize:12, top:3}}> (RID:{item.purchase_id})</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:DIMENSION.WIDTH * 0.85, top:5}}>
              <Text style={{fontFamily:'poppinsMedium', color: Color.saddlebrown_200, fontSize:10}}>
              <Ionicons name="location" size={12} color="tomato" />
                {item.delivery_lga} {item.delivery_state} { item.delivery_country} </Text>
            </View>

            {item.payment_status === 'P' ? 
              <View style={{position:'absolute', justifyContent:'flex-end',  alignSelf:'flex-end', right:20, top:15 }}>
                <Text style={{color: Color.tomato, fontSize:12,}}>Paid</Text>            
              </View>
              : 
              <View style={{position:'absolute', justifyContent:'flex-end',  alignSelf:'flex-end', right:20, top:15 }}>
                <Text style={{color: Color.tomato}}>Not Paid</Text>            
              </View>
            }

              <Text>Status: {item.delivery_status === null ? "Not Dispatched" : item.delivery_status === "D" ? "Dispatched" : "Completed" }</Text>
 
              <View style={{justifyContent:'space-evenly', alignItems:'flex-end', alignSelf:'flex-start', flexDirection:'row',marginTop: 15, marginLeft:20, marginBottom:10}}>
                <TouchableOpacity style={styles.cancelbtn} onPress={() => [toggleModal(), showRequest(item.purchase_id)]}>
                  <Text style={styles.canceltext}>View Request</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
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
                  renderItem={({item}) => (
                    <View>
                      {
                        Platform.OS === 'android' ?
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
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Country :</Text>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_country}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>State :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_state}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>L.G.A :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_lga}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Help Size :</Text>
                        <Text  style={{fontFamily:'poppinsRegular',fontSize:11}}>{item.help_size}</Text>
                      </View>
                      
                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular',  fontSize:11}}>Landmark :</Text>
                        <Text  style={{fontFamily:'poppinsRegular', fontSize:11}}>{item.help_landmark}</Text>
                      </View>

                      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontFamily:'poppinsRegular', fontSize:11}}>Status :</Text>
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
                    </View>
                  )}    
                />
              }
              <View style={{ marginBottom:20}}/>  
            </View>
            </SafeAreaView>
          </Modal>

    </SafeAreaView>
  )
}

export default ViewRequest

const styles = StyleSheet.create({
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

})