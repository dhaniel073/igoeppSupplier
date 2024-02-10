import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import { Image } from 'expo-image'
import {Ionicons} from '@expo/vector-icons'
import Flat from '../Components/Ui/Flat'
import { ConvertPassword, LoginUrl, LoginWithBiometric } from '../Utils/AuthRoute'
import { AuthContext } from '../Utils/AuthContext'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import Input from '../Components/Ui/Input'
import SubmitButton from '../Components/Ui/SubmitButton'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Device from 'expo-device'
import { Base64 } from 'js-base64'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = ({navigation}) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [emailinvalid, setemailinvalid] = useState(false)
  const [passwordinvalid, setpasswordinvalid] = useState(false)
  const [isloading, setisloading] = useState(false)
  const authCtx = useContext(AuthContext)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const log = Device.osInternalBuildId


 function onAuthenticate (spec){
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Touch ID',
      fallbackLabel: 'Enter Password'
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
      if(result.success === true){
        BiometricSignUp()
      }else if(result.error === 'not_enrolled'){
        Alert.alert("", result.error)
        // console.log(result)
      }else{
        Alert.alert("Error", "Try again later")
      }
    })
  }

  const convertpasswordget = async () => {
    const emailcheck = email.includes('@') && email.includes(".com")
    const passwordcheck = password.length < 7

    // console.log(emailcheck, passwordcheck)

    if(!emailcheck || passwordcheck){
      setemailinvalid(!emailcheck)
      setpasswordinvalid(passwordcheck)
      Alert.alert('Invalid details', 'Please check your entered credentials.')
    }else{
      try {
        setisloading(true)
        const response = await ConvertPassword(password)
        console.log(response)
        const passwordcon = response
        loginhandler(passwordcon)
      } catch (error) {
        setisloading(true)
        console.log(error.response)
        Alert.alert("Error", "An error occured")
        setisloading(false)
      }
    }
  }

  const cleardata = () => {
    setemail('')
    setpassword('')
  }

  const BiometricSignUp = async () => {
    try {
      setisloading(true)
      const response = await LoginWithBiometric(log)
      console.log(response.data)
      authCtx.authenticated(response.data.access_token)  
      authCtx.supplierId(response.data.id)
      authCtx.supplierEmail(response.data.email)
      authCtx.supplierFirstName(response.data.first_name)
      authCtx.supplierLastName(response.data.last_name)
      authCtx.supplierBalance(response.data.wallet_balance)
      authCtx.supplierPhone(response.data.phone)
      authCtx.supplierPicture(response.data.picture)
      authCtx.supplierShowAmount('show')
      authCtx.supplieruserid(response.data.user_id)
      authCtx.supplierlastLoginTimestamp(new Date().toString())
      AsyncStorage.setItem("checktime",new Date().toString())
      setisloading(false)
    } catch (error) {
      setisloading(true)
      Alert.alert('Login Failed', error.response.data.message)
      setisloading(false)   
      // console.log(error.response)     
    }
  }

  // console.log(authCtx.token)
  console.log(password + " Password")


  const loginhandler = async (conpass) => {
    try {
      // const passwordMd5 = Base64.encode(password)
      // alert(passwordMd5 )
      setisloading(true)
      const response = await LoginUrl(email, conpass)
      console.log(response.data)
      authCtx.authenticated(response.data.access_token)  
      authCtx.supplierId(response.data.id)
      authCtx.supplierEmail(response.data.email)
      authCtx.supplierFirstName(response.data.first_name)
      authCtx.supplierLastName(response.data.last_name)
      authCtx.supplierBalance(response.data.wallet_balance)
      authCtx.supplierPhone(response.data.phone)
      authCtx.supplierPicture(response.data.picture)
      authCtx.supplierShowAmount('show')
      authCtx.supplieruserid(response.data.user_id)
      authCtx.supplierlastLoginTimestamp(new Date().toString())
      AsyncStorage.setItem("checktime",new Date().toString())
      // console.log(response.total_points + " total point")
      setisloading(false)
    } catch (error) {
      setisloading(true)
      console.log(error.response.data)
      Alert.alert('Login Failed', error.response.data.message)
      setisloading(false)
    }
  }

  if(isloading){
    return <LoadingOverlay message={'Logging in'}/>
  }
  return (
   <SafeAreaView>
    <ScrollView>
    <View style={{justifyContent:'center', flex:1, marginTop:'40%', marginHorizontal:20}}>
      <Image style={{ width:100, height:100, alignSelf:'center'}} source={require("../assets/igoepp_transparent2.png")}   placeholder={'blurhash'} contentFit="contain"/>
      <Text style={styles.Title}>Login</Text>


      <Input
        placeholder="Email Address"
        isInvalid={emailinvalid}
        value={email}
        onUpdateValue={setemail}
        keyboardType={"email-address"}
        onFocus={() => setemailinvalid(false)}
        autoCapitalize={"none"}
        />
      <Input
        placeholder="Password"
        isInvalid={passwordinvalid}
        value={password}
        onUpdateValue={setpassword}
        secure
        onFocus={() => setpasswordinvalid(false)}
        autoCapitalize={"none"}
      />
    </View>
    <SubmitButton style={{marginHorizontal:50, marginTop:10}} message={"Login"} onPress={convertpasswordget}/>

      <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginTop: 10}} onPress={() => onAuthenticate()}>
        {
          Platform.OS === 'android' ? 
          <Ionicons name="finger-print" size={35} color={Color.darkolivegreen_100} />
          :
          <Image source={require("../assets/faceid.jpg")} style={{width:50, height:50}} contentFit='cover'/>

        }
      </TouchableOpacity>

      
      <View style={styles.button}>
          <Flat onPress={() => [navigation.navigate("ForgotPassword"), cleardata()]}>
            Forgot Password
          </Flat>
        </View>
      <View style={{flexDirection:'row', alignItem:'center', justifyContent:'center', }}>
        <Text style={styles.newuser}>Dont have an account? </Text>
        <TouchableOpacity onPress={() => [navigation.navigate('SignUp'), cleardata()]}>
          <Text style={styles.backtext}> SignUp</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  Title:{
    marginTop: 10, 
    marginBottom: 10,
    fontSize: 25,
    fontFamily: 'poppinsMedium',
    color: Color.darkolivegreen_100
  },
  newuser:{
    fontSize:14,
    fontFamily: 'poppinsMedium'
  },
 backtext:{
    fontSize:14,
    color: Color.darkolivegreen_100,
    textAlign:'center',
    fontFamily: 'poppinsMedium'

  },
})