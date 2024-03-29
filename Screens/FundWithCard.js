import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext';
import { UpdateWallet } from '../Utils/AuthRoute';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import SubmitButton from '../Components/Ui/SubmitButton';
import { Paystack } from 'react-native-paystack-webview';
import LoadingOverlay from '../Components/Ui/LoadingOverlay';
import GoBack from '../Components/Ui/GoBack';
import { Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle';



const FundWithCard = ({navigation}) => {
  const paystackWebViewRef = useRef(); 
  const [amount, setAmount] = useState()
  const [isInvalid, setIsInvalid] = useState(false)
  const authCtx = useContext(AuthContext)
  const [isloading, setisloading] = useState(false)

  const check = () => {
    setIsInvalid(true) 
    Alert.alert("Empty Field", "Input an Amount to continue") 
  }

  const SuccessHandler = async () => {
    try {
      setisloading(true)
      const response = await UpdateWallet(amount, authCtx.Id, authCtx.token)
      // authCtx.helperbalance(response.wallet_balance)
      console.log(response)
      authCtx.supplierBalance(response.wallet_balance)
      setAmount(null)
      navigation.goBack()
      setisloading(false)
    } catch (error) {
      setisloading(true)
      console.log(error.response)
      Alert.alert("Sorry", "An error occured try again later", [
        {
          text:"Ok",
          onPress: () => navigation.goBack()
        }
      ])
      setisloading(false)
      return;
    }
    // navigation.navigate('BillPayment')
  }

  function CancleHandler(error){
    setAmount(null)
    navigation.goBack()
  }

  // console.log(amount)

  if(isloading){
    return <LoadingOverlay message={"..."}/>
  }
  
  return (
    <ScrollView style={styles.container}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.addtowalletpaymentxt}>AddToWallet</Text>

      <SafeAreaView style={styles.maincontainer}>
        <View style={{alignSelf:'center'}}>
          <Text style={styles.text}>How much will you like to fund ?</Text>
        </View>


        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:'28%',marginBottom:'28%' }}>
          <MaterialCommunityIcons name="currency-ngn" size={34} color={Color.darkolivegreen_100}/>
          <TextInput 
            style={[styles.input, isInvalid && styles.invalid]}  
            onFocus={() => setIsInvalid(false)}
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            maxLength={6}
          />
        </View>

        {
          amount < 100 &&
          <Text style={{textAlign:'center', color: Color.red}}>* Note: Amount must be more than <MaterialCommunityIcons name="currency-ngn" size={14} color={Color.red}/>100 *</Text>
        }


        <View style={{marginHorizontal:30, marginTop:10}}>
          <SubmitButton message={'Submit'} onPress={() => amount === undefined  ? Alert.alert("Empty Field", "Input an Amount to continue")  : amount < 100 ?  Alert.alert("Amount ", "Amount must be more than NGN 100")  : paystackWebViewRef.current.startTransaction() }/>
        </View>
      </SafeAreaView>

      <Paystack
        paystackKey="pk_test_229cbd7654c78526259b0ce604b03b96c34c4bde"
        billingEmail={authCtx.email}
        amount={amount}
        onCancel={(error) =>{
          CancleHandler(error)
        }}
        onSuccess={(res) => {
            SuccessHandler(res)
        }}
        ref={paystackWebViewRef}
        
      />

      {/* <PaystackWebView
        buttonText = "Pay Now"
        showPayButton={true}
        paystackKey="pk_test_229cbd7654c78526259b0ce604b03b96c34c4bde"
        billingEmail={authCtx.email}
        amount={amount}
        billingMobile={authCtx.phone}
        billinName={authCtx.firstname + " " + authCtx.lastname}
        ActivityIndicator="green"
        autoStart={false}
        onCancel={(error) =>{
          CancleHandler(error)
        }}
        onSuccess={(res) => {
            SuccessHandler(res)
        }}
      /> */}
      
    </ScrollView>
  )
}

export default FundWithCard

const styles = StyleSheet.create({
  container:{
    marginTop:marginStyle.marginTp,
    marginHorizontal:10
  },
  invalid:{
    backgroundColor: Color.error100
  },
  input:{
    fontSize: 36,
    padding:5,
    maxWidth: DIMENSION.WIDTH ,
    height: DIMENSION.HEIGHT * 0.1,
    color: Color.darkolivegreen_100,
    borderBottomWidth:0.5,
  },
  maincontainer:{
    // borderWidth:1,
  },
  addtowalletpaymentxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  text:{
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'interRegular',
    color: Color.grey2,
    width: 200,
    height: 42,
    marginTop: "10%",
    textAlign:'center'
  }

})