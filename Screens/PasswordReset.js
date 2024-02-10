import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import Input from '../Components/Ui/Input'
import SubmitButton from '../Components/Ui/SubmitButton'
import { AuthContext } from '../Utils/AuthContext'
import { ConvertPassword, SupplierResetPassword, ValidateLogin } from '../Utils/AuthRoute'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { Base64 } from 'js-base64'

const PasswordReset = ({navigation}) => {
  const authCtx = useContext(AuthContext)

  const [oldpassword, setoldpassword] = useState('')
  const [oldpasswordvalid, setoldpasswordvalid] = useState(false)
  const oldpasswordcheck = oldpassword.length < 7
  const [oldpassworderrormessage, setoldpassworderrormessage] = useState([])

  const [password, setPassword] = useState('')
  const [passwordvalid, setpasswordvalid] = useState(false)
  const [passworderrormessage, setpassworderrormessage] = useState('')
  const passwordcheck = password.length < 7
  const [isloading, setisloading] = useState(false)


  let refT = useRef(0);

  function handleClick() {
    refT.current = refT.current + 1;
    // alert('You clicked ' + ref.current + ' times!');
  }

  const ValidateOldPassword = async () => {
    if(refT.current > 3){
      Alert.alert("", "To many attempt, try again later", [
        {
          text: "Ok",
          onPress: () => navigation.goBack()
        }
      ])
    }else{
      try {
        setisloading(true)
        const response = await ConvertPassword(oldpassword)
        // console.log(response)
        const passwordCon = response
        passwordvalidate(passwordCon)
      } catch (error) {
        setisloading(true)
        // console.log(error)
        Alert.alert("Error", "An error occured try again later", [
          {
            text: "Ok",
            onPress: () => navigation.goBack()
          }
        ])
        setisloading(false)
      }
    }
  }

  const passwordvalidate = async (conpass) => {
    try {
      setisloading(true)
      const response = await ValidateLogin(authCtx.email, conpass)
      // console.log(response.message)
      if(response.message === "Invalid passoword"){
        setoldpassworderrormessage(response.message)
        setoldpasswordvalid(true)
        Alert.alert("Error", response.message, [
          {
            text:"Ok",
            onPress: () => setisloading(false)
          }
        ])
      }else{
        ResetHandler()
      }
      // setisloading(false)
    } catch (error) {
      setisloading(true)
      // console.log(error)
      setisloading(true)
    }

  }

  const ResetHandler = async () => {
    const passwordMd5New = Base64.encode(password)
    try {
      setisloading(true)
      const response = await ConvertPassword(password)
      // console.log(response)
      const passwordCon = response
      passwordreset(passwordCon)
    } catch (error) {
      setisloading(true)
      // console.log(error)
      Alert.alert("Error", "An error occured try again later", [
        {
          text: "Ok",
          onPress: () => navigation.goBack()
        }
      ])
      setisloading(false)
    }
  }

  const passwordreset = async (conpass) => {
    try {
      setisloading(true)
      const response = await SupplierResetPassword(authCtx.Id, conpass, authCtx.token)
      // console.log(response)
      Alert.alert("Successful", "Password reset successful", [
        {
          text:'Ok',
          onPress: () => navigation.goBack()
        }
      ])
      setisloading(false)
      setPassword('')
      setoldpassword('')
      setoldpassworderrormessage('')
      setpassworderrormessage('')
    } catch (error) {
      setisloading(true)
      // console.log(error)
      Alert.alert('Error', "An error occured while reseting your password", [
        {
            text:'Ok',
            onPress: () => navigation.goBack()
          }
      ])
      setisloading(false)
    }
  }


    if(isloading){
    return <LoadingOverlay message={"..."}/>
    }


  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
        <Text style={styles.passwordresettxt}>PasswordReset</Text>

        <View style={{marginHorizontal:10}}>
        <Input value={authCtx.email} editable={false}/>
        <Input 
          onUpdateValue={setoldpassword}
          value={oldpassword}
          placeholder={'Enter old password'}
          autoCapitalize={'none'}
          secure
          onFocus={() => setoldpasswordvalid(false)}
          isInvalid={oldpasswordvalid}
        />

        {
        oldpassworderrormessage.length !== 0 && <Text style={{color: Color.tomato, fontSize:11}}>{oldpassworderrormessage}</Text>
        }
        <Input 
            onUpdateValue={setPassword}
            value={password}
            placeholder={'Enter new password'}
            autoCapitalize={'none'}
            secure
            onFocus={() => setpasswordvalid(false)}
            isInvalid={passwordvalid}
        />

        {
        passwordvalid && <Text style={{color: Color.tomato, fontSize: 11}}>Password must be more than 7 characters</Text>
        }
        <SubmitButton message={"Reset"} style={{marginTop:20, marginHorizontal:20}} onPress={() => oldpasswordcheck || passwordcheck ? [setoldpasswordvalid(true),  setpasswordvalid(true)] : [handleClick(), ValidateOldPassword()]}/>
        </View>
    </SafeAreaView>
  )
}

export default PasswordReset

const styles = StyleSheet.create({
    passwordresettxt:{
        fontSize: 18,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsSemiBold',
        left: 10,
        marginTop:10,
        marginBottom:15,
      }, 
})