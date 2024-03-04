import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, DIMENSION, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'
import { Category, RequestSumTotal, SupplierCategoryGet } from '../Utils/AuthRoute'
import { Image } from 'expo-image'
import LoadingOverlay from '../Components/Ui/LoadingOverlay'
import { AuthContext } from '../Utils/AuthContext'
import {AntDesign} from '@expo/vector-icons'

const MarketPlace = ({navigation}) => {
  const [fetchedcategory, setFetchedCategory] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', async() => {
      try {
        setIsFetching(true)
        const response = await SupplierCategoryGet(authCtx.Id, authCtx.token)
        console.log(response)
        setFetchedCategory(response.data)
        setIsFetching(false)
      } catch (error) {
        setIsFetching(true)
        Alert.alert("Error", "Error fetching Market Items", [
          {
            text: "Ok",
            onPress: () => navigation.goBack()
          }
        ])
        setIsFetching(false)
        // console.log(error)
        return;
      }
    })
    return unsuscribe;
  },[])  

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

  if(isFetching){
    return <LoadingOverlay/>
  }

  const NoSubCategoryNote = () => {
    return (
      <View style={{ justifyContent:'center', alignItems:'center', marginTop: DIMENSION.HEIGHT * 0.33}}>
        <Text style={{ fontSize: 14, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Product Created</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{marginTop: marginStyle.marginTp, marginHorizontal:5,flex:1}}>
       <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:5}}>
        <View>
          <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
          <Text style={styles.acceptedrequesttxt}>Products </Text>
        </View>

        <TouchableOpacity style={{marginRight:15, marginTop:5}} onPress={() => navigation.navigate('CreateProduct')}>
          <AntDesign name="plus" size={24} color={Color.darkolivegreen_100} />
        </TouchableOpacity>
      </View>

      {
        fetchedcategory.length === 0 ? <NoSubCategoryNote/> :
      <FlatList
        showsVerticalScrollIndicator={false}
        data={fetchedcategory}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
          <View style={styles.container}  >
            <TouchableOpacity style={[styles.pressables]} onPress={() => navigation.navigate("MarketPlaceItems", {
              id: item.id,
              sup_id: item.supplier_product_category,
              avail: item.available,
              name: item.name,
              desc: item.description,
              pics: item.picture,
              price: item.price,
              status: item.status,
              shipping: item.shipping_cost  

            })}>
              <Text style={{position: 'absolute', alignSelf:'flex-end', top:8, right: 15}}>{item.id}</Text>
              <Image style={styles.image2} source={{ uri:`https://phixotech.com/igoepp/public/products/${item.picture}`}}/>
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          </View>
            }
        numColumns={2}
        /> 
      }
    </SafeAreaView>
  )
}

export default MarketPlace

const styles = StyleSheet.create({
  acceptedrequesttxt:{
    fontSize: 18,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsSemiBold',
    left: 10,
    marginTop:10,
    marginBottom:15,
  }, 
  pressables:{
    padding:20,
    width: DIMENSION.WIDTH *0.43,
    margin:10,
    height:DIMENSION.HEIGHT *0.17,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    backgroundColor: Color.mintcream,
    overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
  },
  image2:{
    width: 50,
    height: 50,
    marginBottom: 8
  },
  item: {
    fontSize: 10,
    fontFamily: 'poppinsSemiBold',
    textAlign: 'center',
    color: Color.darkolivegreen_100
  }, 
})