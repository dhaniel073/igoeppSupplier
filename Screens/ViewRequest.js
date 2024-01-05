import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Border, Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { CustomerRequest } from '../Utils/AuthRoute'
import { AuthContext } from '../Utils/AuthContext'
import {Ionicons} from '@expo/vector-icons'



const ViewRequest = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [category, setcategory] = useState([])

  // console.log(authCtx.token)
  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      try {
        const response = await CustomerRequest(authCtx.Id, authCtx.token)
        console.log(response)
        setcategory(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }) 
    return unsuscribe;
  }, [])
  
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
              <Text style={{fontSize:12, top:3}}> (RID:{item.id})</Text>
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
                <TouchableOpacity style={styles.cancelbtn} onPress={() => [toggleModal(), showRequest(item.id)]}>
                  <Text style={styles.canceltext}>View Request</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
        <View style={{marginBottom:50}}/>
    </SafeAreaView>
  )
}

export default ViewRequest

const styles = StyleSheet.create({
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