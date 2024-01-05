import { Alert, Pressable, Keyboard, TouchableOpacity, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { SetupPin, SupplierUrl, UpdatePin, ValidatePin } from '../Utils/AuthRoute'
import { AuthContext } from '../Utils/AuthContext'
import styled from 'styled-components'
import SubmitButton from '../Components/Ui/SubmitButton'
import Modal from 'react-native-modal'
import {MaterialIcons} from '@expo/vector-icons'
import OTPFieldInput from '../Components/Ui/OTPFieldInput'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'


 export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Color.new_color};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 50px;
    width: 60%
`;

export const ButtonText = styled.Text`
    font-size: 15px;
    color: ${Color.white};
    font-family: poppinsRegular
`;

const TransactionPin = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [isModalVisible, setisModalVisible] = useState(false)
  const [isModalVisible1, setisModalVisible1] = useState(false)
  const [isModalVisible2, setisModalVisible2] = useState(false)
  const [pinset, setPinSet] = useState(true)
  const [check, setCheck] = useState([])
  const [isSetpinModalVisible, setisSetpinModalVisible] = useState(false)
  const [isloading, setisloading] = useState(false)
  const [ischecking, setischecking] = useState(false)
  const [pinerrormessage, setPinerrorMessage] = useState('')

  const [code, setCode] = useState('')
  const [pinReady, setPinReady] = useState(false)
  const MAX_CODE_LENGTH = 4;

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async () => {
      try {
      setisloading(true)
      const response = await SupplierUrl(authCtx.Id, authCtx.token)
      console.log(response)
      setCheck(response.data.data.transaction_pin_setup)
      setisloading(false)
      } catch (error) {
      setisloading(true)
      // console.log(error)
      Alert.alert('Error', "An error occured try again later", [
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

  const toggleModal = () => {
    setisModalVisible(!isModalVisible)
  }

  const toggleModal1 = () => {
    setisModalVisible1(!isModalVisible1)
  }
  
  const toggleModal2 = () => {
    setisModalVisible2(!isModalVisible2)
  }

  function toggleTransactionpin(){
    if(check === "N"){
      setisSetpinModalVisible(!isSetpinModalVisible)
      toggleModal()
    }else{
      setisSetpinModalVisible(!isSetpinModalVisible)
    }
  }

  const pinhandler = async () => {
    try {
      setischecking(true)
      const response = await SetupPin(authCtx.Id, code, authCtx.token )
      // console.log(response)
      toggleTransactionpin()
      setCode('')
      if(check === "N"){
        setPinSet(previous => !previous)
      }else{
        return;
      }
      setischecking(false) 
    } catch (error) {
      setischecking(true)
      console.log(error.response)
      setCode('')
      toggleTransactionpin()
      Alert.alert("Error", "An error occured while setting up your transaction pin", [
        {
          text: "Ok",
          onPress: () => navigation.goBack()
        }
      ])
      setischecking(false)
    }
  }

  const pinvalidate = async () => {
      if(refT.current > 3){
        Alert.alert("", "To many attempt, try again later", [
          {
            text: "Ok",
            onPress: () => navigation.goBack()
          }
        ])
      }else{
        try {
          setischecking(true)
          const response = await ValidatePin(authCtx.Id, code, authCtx.token )
          // console.log(response)
          setCode('')
          toggleModal1()
          toggleModal2()
          setischecking(false)
        } catch (error) {
          setischecking(true)
          console.log(error)
          setCode('')
          setPinerrorMessage(error.response.data.message + "\n" + (3 - refT.current + " attempts remaining"))
          // console.log(error.response)
          Alert.alert("Error", error.response.data.message+ " " + "Try again", [
            {
              text: "Ok",
              onPress: () => {}
            },
          ])
          setischecking(false)
        }
      }
    }

    const updatepinhandler = async () => {
      try {
        setischecking(true)
        const response = await UpdatePin(authCtx.Id, code, authCtx.token)
        // console.log(response)
        toggleModal2()
        setCode('')
        Alert.alert("Success", "Pin reset successfully", [
          {
            text: "Ok",
            onPress: () => navigation.goBack()
          }
        ])
        setischecking(false)
      } catch (error) {
        setischecking(true)
        setCode('')
        Alert.alert("Error", + "An error occured please try again later", [
          {
            text: "Ok",
            onPress: () => navigation.goBack()
          },
        ])
        setischecking(false)
      }
    }
  
  let refT = useRef(0);
  
  function handleClick() {
    refT.current = refT.current + 1;
    // alert('You clicked ' + ref.current + ' times!');
  }

  
  if(isloading){
      return <LoadingOverlay message={"..."}/>
  }

  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.transactionpintxt}>TransactionPin</Text>

      <View style={{ flexDirection: 'row', marginTop: '5%', justifyContent:'space-between', marginHorizontal:10 }}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.text}>Set Pin</Text>
        </View>

        <Switch
          trackColor={{ false: 'grey', true: Color.darkolivegreen_100 }}
          thumbColor={'white'}
          ios_backgroundColor={'white'}
          onValueChange={check === "N" ? toggleTransactionpin : null}
          value={check === "N" ? !pinset : pinset}
        />
      </View>

      {
        check !== "N" && 
        <SubmitButton message={"Reset Pin"} style={{marginHorizontal: 30, marginTop:20}} onPress={toggleModal1}/> 
      }

      {/* register pin modal  */}
      <Modal isVisible={isModalVisible}>
        <Pressable  onPress={Keyboard.dismiss} style={styles.centeredView}>
        <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => [toggleModal(), setCode('')]}>
          <MaterialIcons name="cancel" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.modalView}>
          {
            ischecking ? 
            <View style={{flex:1, marginTop: 30, marginBottom: 70}}>
              <LoadingOverlay/>  
            </View>

            :
          <>
          <View style={{marginTop: '13%'}}/>
            <Text style={{fontFamily:'poppinsRegular'}}>Enter Pin</Text>

            <OTPFieldInput
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={MAX_CODE_LENGTH}
              secureTextEntry={true}
            />

          <StyledButton disabled={!pinReady} 
          onPress={() => pinhandler()}
          style={{
            backgroundColor: !pinReady ? Color.gray_100 : Color.darkolivegreen_100
          }}>
            <ButtonText
            style={{
              color: !pinReady ? Color.black : Color.white
            }}
            >Submit</ButtonText>
          </StyledButton>
            </>
            }
          </View>
        </Pressable>
      </Modal>

      {/* old pin modal */}
      <Modal isVisible={isModalVisible1}>
        <Pressable  onPress={Keyboard.dismiss} style={styles.centeredView}>
        <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => [toggleModal1(), setCode('')]}>
            <MaterialIcons name="cancel" size={30} color="white" />
        </TouchableOpacity>
            
        <View style={styles.modalView}>
          {
            ischecking ? 
            <View style={{flex:1, marginTop: 30, marginBottom: 70}}>
              <LoadingOverlay/>  
            </View>

            :
         <>
        <View style={{marginTop: '13%'}}/>
        <Text style={{fontFamily:'poppinsRegular'}}>Enter Old Pin</Text>

        <OTPFieldInput
          setPinReady={setPinReady}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          secureTextEntry={true}
        />
            
          {
            pinerrormessage.length !== 0 && <Text  style={{fontSize:11, textAlign:'center', color:Color.tomato}}>{pinerrormessage}</Text>
          }

        <StyledButton disabled={!pinReady} 
        onPress={() => [handleClick(), pinvalidate()]}
        style={{
          backgroundColor: !pinReady ? Color.gray_100 : Color.new_color
        }}>
          <ButtonText
          style={{
            color: !pinReady ? Color.black : Color.white
          }}
          >Submit</ButtonText>
        </StyledButton>
        </>
        }
        </View>
        </Pressable>
      </Modal>

      {/* enter new pin */}
      <Modal isVisible={isModalVisible2}>
        <Pressable  onPress={Keyboard.dismiss} style={styles.centeredView}>
        <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'flex-end', marginBottom:5, }} onPress={() => [toggleModal2(), setCode('')]}>
          <MaterialIcons name="cancel" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.modalView}>
          {
            ischecking ? 
            <View style={{flex:1, marginTop: 30, marginBottom: 70}}>
              <LoadingOverlay/>  
            </View>

            :
          <>
        <View style={{marginTop: '13%'}}/>
          <Text style={{fontFamily:'poppinsRegular'}}>Enter New Pin</Text>

          <OTPFieldInput
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={MAX_CODE_LENGTH}
            secureTextEntry={true}
          />

        <StyledButton disabled={!pinReady} 
        onPress={() => updatepinhandler()}
        style={{
            backgroundColor: !pinReady ? Color.gray_100 : Color.new_color
        }}>
          <ButtonText
          style={{
            color: !pinReady ? Color.black : Color.white
          }}
          >Submit</ButtonText>
        </StyledButton>
          </>
          }
        </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

export default TransactionPin

const styles = StyleSheet.create({
  transactionpintxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  centeredView: {
    flex: 1,
    // backgroundColor: Color.light_black,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    width: DIMENSION.WIDTH  * 0.9,
    borderRadius: 20,
    // flex:1,
    alignItems:'center',
    height: DIMENSION.HEIGHT * 0.4
  },  
})