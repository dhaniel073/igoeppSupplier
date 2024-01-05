import { Alert, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { AuthContext } from '../Utils/AuthContext'
import * as Notification from 'expo-notifications'
import { EnableAlert, ViewAlertSetup } from '../Utils/AuthRoute'
import * as LocalAuthentication from 'expo-local-authentication'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'


const NotificationSetup = ({navigation}) => {
  const [isEmailEnabled, setIsEmailEnabled] = useState(true)
  const [isSmsEnabled, setIsSMSEnabled] = useState(true)
  const [isPopupEnabled, setIsPopupEnabled] = useState(true)
  const authCtx = useContext(AuthContext)
  const [isloading, setisloading] = useState(false)
  const [notalert, setnotalert] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setisloading(true)
        const response = await ViewAlertSetup(authCtx.Id, authCtx.token)
        console.log(response.data)
        setnotalert(response.data)
        setisloading(false)
      } catch (error) {
        setisloading(true)
        // console.log(error.response)
        setisloading(false)
        return;
      }
    })
    return unsubscribe;
  }, [])

  const setNotificationAlert = async (eventy_type, alert_type) => {
    try {
      const response = await EnableAlert(authCtx.Id, eventy_type, alert_type, authCtx.token)
      // console.log(response)
    } catch (error) {
      // console.log(error.response)
      Alert.alert("Error", "An error occured try again later", [
        {
          text: "Ok",
          onPress: () => navigation.goBack()
        }
      ])
      return;
    }
  }


  const disabledNotification = () => {
    Notification.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        iosDisplayInForeground: false
      })
    })
  }
  

  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }

  const toggleEmailSwitch = async() => {
    setIsEmailEnabled(previousState => !previousState)
    if(isEmailEnabled){
      // console.log("enabled")
      setNotificationAlert("EA", "E")
    }else{
      // console.log("not enabled")
    }
  }

  // console.log()
  const toggleSMSSwitch = async() => {
    setIsSMSEnabled(previousState => !previousState)
    if(isSmsEnabled){
      // console.log("enabled")
      setNotificationAlert("SA", "S")
    }else{
      // console.log("not enabled")
    }
  }

  const togglePopupSwitch = async () => {
       // console.log(isPopupEnabled)
    setIsPopupEnabled(previousState => !previousState)
    if(isPopupEnabled){
      // console.log("enabled")
      setNotificationAlert("PA", "P")
    }else{
      // console.log("not enabled")
      disabledNotification()
    }
  }

 



  return (
    <SafeAreaView style={{marginHorizontal:10, marginTop: marginStyle.marginTp}}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.notificationtxt}>Notification Setup</Text>

      
      <View style={{ padding:20, justifyContent:'center', marginTop: '2%' }}>
      <Text style={{ fontSize:16, fontFamily: 'poppinsRegular' }}>Set Notification By Type</Text>

        <View style={{ flexDirection: 'row', marginTop: '10%', justifyContent:'space-between' }}>
          <Text style={styles.text}>Email</Text>

          {/* <Text style={{top:10, position:'absolute', left: '40%'}}>{notalert.email === 1 ? "Enabled" : "Disabled"}</Text> */}
          <Switch
            trackColor={{ false: 'grey', true: Color.darkolivegreen_100 }}
            thumbColor={'white'}
            ios_backgroundColor={'white'}
            onValueChange={toggleEmailSwitch}
            // value={authCtx.emailnotification === 'notset' ? isSmsEnabled && setSMSText('Disabled'): !isEmailEnabled}
            value={notalert.email === 1 ? isEmailEnabled : !isEmailEnabled  }
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
          <Text style={styles.text}>SMS</Text>
          {/* <Text style={{top:10, position:'absolute', left: '40%'}}>{notalert.sms === 1 ? "Enabled" : "Disabled"}</Text> */}
          <Switch
            trackColor={{ false: 'grey', true: Color.darkolivegreen_100 }}
            thumbColor={'white'}
            ios_backgroundColor={'white'}
            onValueChange={toggleSMSSwitch}
            // value={authCtx.smsnotification === 'notset' ? isSmsEnabled : !isSmsEnabled}
            value={notalert.sms === 1 ? isSmsEnabled : !isSmsEnabled }
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
          <Text style={styles.text}>Pop Ups</Text>

          {/* <Text  style={{top:10, position:'absolute', left: '40%'}}>{notalert.pushN === 1 ? "Enabled" : "Disabled"}</Text> */}
          <Switch
            trackColor={{ false: 'grey', true: Color.darkolivegreen_100 }}
            thumbColor={'white'}
            ios_backgroundColor={'white'}
            onValueChange={togglePopupSwitch}
            // value={authCtx.popupnotification === 'notset' ? isPopupEnabled : !isPopupEnabled }
            value={notalert.pushN === 1 ? isPopupEnabled : !isPopupEnabled }
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default NotificationSetup

const styles = StyleSheet.create({
  notificationtxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  text:{
    top:8,
    fontSize:15,
    fontFamily: 'poppinsRegular'
  },
})