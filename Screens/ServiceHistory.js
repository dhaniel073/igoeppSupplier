import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, marginStyle } from '../Components/Ui/GlobalStyle'
import GoBack from '../Components/Ui/GoBack'

const ServiceHistory = ({navigation}) => {
  return (
    <SafeAreaView style={{marginTop:marginStyle.marginTp, marginHorizontal:10}}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.servicehistorytxt}>ServiceHistory</Text>
    </SafeAreaView>
  )
}

export default ServiceHistory

const styles = StyleSheet.create({
    servicehistorytxt:{
        fontSize: 18,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsSemiBold',
        left: 10,
        marginTop:10,
        marginBottom:15,
    }, 
})