import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import {AntDesign} from '@expo/vector-icons'
import { Image } from 'expo-image'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { AuthContext } from '../Utils/AuthContext'
import { RequestSumTotal, SupplierUrl } from '../Utils/AuthRoute'


const ProfilePicsView = ({navigation, route}) => {
  const authCtx = useContext(AuthContext)
  const [photo, setphoto] = useState('')
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    supplierget()
  }, [])

  const supplierget = async () => {
    try {
      setisloading(true)
      const response = await SupplierUrl(authCtx.Id, authCtx.token)
      console.log(response.data.data)
      setphoto(response.data.data.photo)
      authCtx.supplierPicture(response.data.data.photo)
      setisloading(false)
    } catch (error) {
      setisloading(true)
      setisloading(false)
      return;
    }
  }

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

  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack() } style={{marginHorizontal:10}}>
          {/* <Entypo name="" size={18} color={Color.darkolivegreen_100} />      */}
          <AntDesign name="arrowleft" size={24} color={Color.orange_100} />  
      </TouchableOpacity>

          <View style={styles.imageContainer}>
            {
               photo === null || photo === undefined || photo === "null" || photo === "" ? 
              <Image style={[styles.image, ]} source={require("../assets/person-4.png")} contentFit='contain'/>
              :
              <Image style={[styles.image, ]} source={{uri: `https://phixotech.com/igoepp/public/supplier/${photo}`}}  contentFit='contain'/>

            }
          </View>
  </SafeAreaView>

  )
}

export default ProfilePicsView

const styles = StyleSheet.create({
  imageContainer:{
    flex:1,
    marginBottom:'20%'
},
container: {
    flex: 1,
    marginTop:marginStyle.marginTp
},
pressed:{
    opacity: 0.55
},
image:{
    flex:1,
    width: "100%",
},
backParent:{
    marginTop: '12%',
    left: 10,
    flexDirection: 'row',
},
image2:{
    width: 15,
    height: 15,
    marginHorizontal: 15,
    marginTop: "10%"
  }
})