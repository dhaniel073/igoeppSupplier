import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Utils/AuthContext'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'
import Input from '../Components/Ui/Input'
import SubmitButton from '../Components/Ui/SubmitButton'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { SupplierProductStore } from '../Utils/AuthRoute'

const data = [
    {
      id:"Y",
      name: "Available"
    },
    {
      id:"N",
      name: 'Unavailable'
    }
  ]


const CreateProduct = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    const [category, setcategory] = useState([])
    const [isloading, setisloading] = useState(false)
    const [isFocus, setisFocus] = useState(false)

    const [id, setid] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [shippingcost, setshippingcost] = useState('')
    const [avail, setavail] = useState('')


    const [idvalid, setidvalid] = useState(false)
    const [namevalid, setnamevalid] = useState(false)
    const [descriptionvalid, setdescriptionvalid] = useState(false)
    const [pricevalid, setpricevalid] = useState(false)
    const [shippingcostvalid, setshippingcostvalid] = useState(false)
    const [availvalid, setavailvalid] = useState(false)

    console.log(id)


    useEffect(() => {
        setisloading(true)
        const url = `https://igoeppms.com/igoepp/public/api/auth/globalproductcategory`
        const response = axios.get(url, {
            headers:{
                Accept:'application/json',
                Authorization: `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            console.log(res.data)
            var count = Object.keys(res.data.data).length;
            let catarray = []
            for (var i = 0; i < count; i++){
                catarray.push({
                    label: res.data.data[i].name,
                    value: res.data.data[i].id,
                })
                // setCityCode(response.data.data[i].lga_code)
            }
            setcategory(catarray)
        }).catch((error) => {
            // console.log(error)
          })
          setisloading(false)
    }, [])

    const Submithandler = async () => {
        const pricecheck = price.length < 1
        const namecheck = name.length < 4
        const availcheck = avail === null || avail === undefined || avail === "" || avail.length === 0
        const shippingcostcheck = shippingcost.length < 1
        const descriptioncheck = description.length < 5
        const idcheck = id === null || id === undefined || id === "" || id.length < 1

        console.log(avail)

        if(pricecheck || namecheck || availcheck || shippingcostcheck || descriptioncheck || idcheck){
            setidvalid(idcheck)
            setnamevalid(namecheck)
            setdescriptionvalid(descriptioncheck)
            setpricevalid(pricecheck)
            setshippingcostvalid(shippingcostcheck)
            setavailvalid(availcheck)
            Alert.alert('Invalid details', 'Please check your entered credentials.')
        }else{
            // Alert.alert("", "Success")
            console.log(price, name, description, shippingcost, avail, id)
            try {
                setisloading(true)
                const response = await SupplierProductStore(id, authCtx.Id, name, description, price, shippingcost, avail, authCtx.token)
                console.log(response)
                Alert.alert("Successful", "Product created successfully", [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ])
                setisloading(false)
            } catch (error) {
                setisloading(true)
                console.log(error.response)
                Alert.alert("Error", "An error occured while creating a product", [
                    {
                        text: "Ok",
                        onPress: () => {}
                    }
                ])
                setisloading(false)

            }
        }
    }

    if(isloading){
    return <LoadingOverlay message={"..."}/>
    }

    console.log(avail.length)

  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.createtxt}>CreateProduct</Text>

    <ScrollView style={{marginHorizontal:10}} showsVerticalScrollIndicator={false}>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }, idvalid ? styles.inputInvalid : null]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={category}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Category' : '...'}
        searchPlaceholder="Search..."
        value={id}
        onFocus={() => [setisFocus(true), setidvalid(false)]}
        onBlur={() => setisFocus(false)}
        onChange={item => {
          setid(item.value);
          setisFocus(false);
        }}
        />
        <View style={{ marginBottom:20}}/>

        <Input placeholder={"Product Name"}
            value={name}
            isInvalid={namevalid}
            onUpdateValue={setname}
            onFocus={() => setnamevalid(false)}
        />

        <Input placeholder={"Product Description"}
            value={description}
            isInvalid={descriptionvalid}
            onUpdateValue={setdescription}
            multiline={true}
            onFocus={() => setdescriptionvalid(false)}
        />
        {descriptionvalid && <Text style={{textAlign:'center', color: Color.red}}>Description must be more than 5 characters</Text>}

        <Text style={styles.availtext}>Product Availability</Text>
        <View style={{flexDirection:'row'}}>
        {data.map((item, key) => 
              <View key={key} style={{flexDirection:'row', padding:10, alignContent:'center', flex:1, marginLeft:20}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setavail(item.id)}>
                <Text style={styles.availtext}>{item.name}</Text>
                <TouchableOpacity style={styles.outer} onPress={() => [setavail(item.id), setavailvalid(false)]}>
                  {avail === item.id && <View style={styles.inner}/>}
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
        )}
        </View>
        {availvalid && <Text style={{textAlign:'center', color: Color.red}}>Select product availability</Text>}
        <View style={{marginBottom:10}}/>

        <Input placeholder={"Product Price"} 
            value={price}
            keyboardType={'numeric'}
            onUpdateValue={setprice}
            isInvalid={pricevalid}
            onFocus={() => setpricevalid(false)}

        />

        <Input placeholder={"Shipping Cost"}
            keyboardType={"numeric"}
            isInvalid={shippingcostvalid}
            onUpdateValue={setshippingcost}
            value={shippingcost}
            onFocus={() => setshippingcostvalid(false)}
        />

        <SubmitButton message={"Submit"} style={{marginHorizontal:15}} onPress={() => Submithandler()}/>
            <View style={{marginBottom:20}}/>
    </ScrollView>
    </SafeAreaView>
  )
}

export default CreateProduct

const styles = StyleSheet.create({
    dropdown: {
        maxHeight: 70,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        padding:10,
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
        fontSize: 12,
      },
      selectedTextStyle:{
        fontSize:12
    },
    createtxt:{
        fontSize: 18,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsSemiBold',
        left: 10,
        marginTop:10,
        marginBottom:15,
    },
    shadow:{
        marginBottom: 20,
        borderRadius: 20, 
        elevation: 7,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        backgroundColor: 'white',
        overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
      },
     availtext:{
        fontSize:15,
        fontFamily:'poppinsSemiBold',
        color: Color.darkolivegreen_100
      },
      outer:{
        width:20,
        height: 20,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent:'center',
        alignItems: 'center',
        marginLeft:8
      },
      inner:{
        width:10,
        height:10,
        backgroundColor: Color.darkolivegreen_100,
        borderRadius:10
      },
      inputInvalid: {
        backgroundColor: Color.error100,
      },
})