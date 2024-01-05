import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons, FontAwesome5} from '@expo/vector-icons'
import LoadingOverlay from './Components/Ui/LoadingOverlay';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import ForgotPassword from './Screens/ForgotPassword';
import Settings from './Screens/Settings';
import ViewRequest from './Screens/ViewRequest';
import WelcomeScreen from './Screens/WelcomeScreen';
import BillPayment from './Screens/BillPayment';
import AuthContextProvider, { AuthContext } from './Utils/AuthContext';
import { Color } from './Components/Ui/GlobalStyle';
import Disco from './Screens/Disco';
import Bet from './Screens/Bet';
import Education from './Screens/Education';
import Internet from './Screens/Internet';
import Television from './Screens/Television';

import NotificationSetup from './Screens/NotificationSetup';
import Biometric from './Screens/Biometric';
import PasswordReset from './Screens/PasswordReset';
import TransactionPin from './Screens/TransactionPin';
import FeedBack from './Screens/FeedBack';
import NotificationScreen from './Screens/NotificationScreen';
import Availability from './Screens/Availability';
import AddToWallet from './Screens/AddToWallet';
import FundWithCard from './Screens/FundWithCard';
import Complaince from './Screens/Complaince';
import ProfilePicsView from './Screens/ProfilePicsView';
import ServiceHistory from './Screens/ServiceHistory';
import * as Notification from 'expo-notifications'
import MarketPlace from './Screens/MarketPlace';
import * as Device from 'expo-device'
import { VirtualTopUp } from './Screens/VirtualTopUp';
import MarketPlaceItems from './Screens/MarketPlaceItems'
import CreateProduct from './Screens/CreateProduct';


Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notification.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
      Notification.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notification.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notification.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notification.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notification.getExpoPushTokenAsync({ projectId: '0e18ffeb-cbc7-439c-8348-da5e8ba93af1' })).data;
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("./assets/Fonts/Poppins-Regular.ttf"),
    'poppinsMedium': require("./assets/Fonts/Poppins-Medium.ttf"),
    'poppinsSemiBold': require("./assets/Fonts/Poppins-SemiBold.ttf"),
    'poppinsBold': require("./assets/Fonts/Poppins-Bold.ttf"),
    'poppinsBold': require("./assets/Fonts/Inter-Bold.ttf"),
    'interBold': require("./assets/Fonts/Inter-Bold.ttf"),
    'interMedium': require("./assets/Fonts/Inter-Medium.ttf"),
    'interRegular': require("./assets/Fonts/Inter-Regular.ttf"),
  })

  if(!fontloaded){
    return <LoadingOverlay message={'...'}/>
  }


  function AuthStack (){
    return(
      <Stack.Navigator
      screenOptions={{
        contentStyle:{backgroundColor: "#fff"}
      }}>
        <Stack.Screen
          component={Login}
          name='Login'
          options={{
            headerShown: false
          }} 
        />

        <Stack.Screen
          component={SignUp}
          name='SignUp'
          options={{
            headerShown: false
          }} 
        />

        <Stack.Screen
          component={ForgotPassword}
          name='ForgotPassword'
          options={{
            headerShown: false
          }} 
        />
      </Stack.Navigator>
    )
  }

  function TabBottom(){
    return(
      <Tabs.Navigator
      sceneContainerStyle={{backgroundColor:'white'}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{backgroundColor: Color.darkolivegreen_100}
      }}
      >
        <Tabs.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{
              tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <Ionicons name="home" size={24} color={focused ? Color.white : '#d3d3d3'} />
                  <Text style={{ fontSize:8, fontFamily: 'poppinsRegular', color: focused ? Color.white : '#d3d3d3'}}>Home</Text>
                </View>
              ),
            }}
        /> 

        <Tabs.Screen
          name='Compliance'
          component={Complaince}
          options={{
            tabBarIcon:({focused}) => (
              <View style={{alignItems:'center'}}>
                  <Ionicons name="document-attach" size={24} color={focused ? Color.white : "#d3d3d3"} />
                <Text style={{ fontSize:8, fontFamily: 'poppinsRegular', color: focused ? Color.white : "#d3d3d3"}}>Compliance</Text>
              </View>
            ),
          }}
        />

      

      <Tabs.Screen
        name='ViewRequest'
        component={ViewRequest}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', backgroundColor:Color.orange_300, }}>
             <FontAwesome5 name="clipboard-list" size={24} color={focused ? Color.white : '#d3d3d3'}/>
             <Text style={{fontFamily: 'poppinsRegular', color: focused ? Color.white : '#d3d3d3', fontSize:8}}>Request</Text>
            </View>
           ),
        }}
     />


        <Tabs.Screen
          name='MarketPlace'
          component={MarketPlace}
          options={{
            tabBarIcon:({focused}) => (
              <View style={{alignItems:'center'}}>
                    <Ionicons name="checkmark-done-outline" size={24} color={focused ? Color.white : '#d3d3d3'} />
                <Text style={{ fontSize:8, fontFamily: 'poppinsRegular', color: focused ? Color.white : '#d3d3d3'}}>Accepted</Text>
              </View>
            ),
          }}
        /> 


      <Tabs.Screen
          name='logout'
          component={Settings}
          options={{
            tabBarIcon:({focused}) => (
              <View style={{alignItems:'center'}}>
                    <Ionicons name="settings" size={24} color={focused ? Color.white : '#d3d3d3'} />
                <Text style={{ fontSize:8, fontFamily: 'poppinsRegular', color: focused ? Color.white : '#d3d3d3'}}>Settings</Text>
              </View>
            ),
          }}
        />
      </Tabs.Navigator>
    )
  }

  function AuthenticatedStack (){
    return (
      <Stack.Navigator
      screenOptions={{
        contentStyle:{backgroundColor: "#fff"}
      }}>

       <Stack.Screen
          name='Tabs'
          component={TabBottom}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='BillPayment'
          component={BillPayment}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Disco'
          component={Disco}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Bet'
          component={Bet}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Education'
          component={Education}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Internet'
          component={Internet}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Television'
          component={Television}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='VirtualTopup'
          component={VirtualTopUp}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='NotificationSetup'
          component={NotificationSetup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Biometric'
          component={Biometric}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='PasswordReset'
          component={PasswordReset}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='TransactionPin'
          component={TransactionPin}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='FeedBack'
          component={FeedBack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='NotificationScreen'
          component={NotificationScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Availability'
          component={Availability}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AddToWallet'
          component={AddToWallet}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='FundWithCard'
          component={FundWithCard}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='ProfilePicsView'
          component={ProfilePicsView}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='ServiceHistory'
          component={ServiceHistory}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='MarketPlaceItems'
          component={MarketPlaceItems}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='CreateProduct'
          component={CreateProduct}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    )
  }

  const Navigation = () => {
    const authCtx = useContext(AuthContext)
    const checkAuth =  () => {
      if(authCtx.isAuthenticated === false){
        return <AuthStack/>
      }else{
        return <AuthenticatedStack/>
      }
    }
    return (
      <NavigationContainer>
        {/* {!authCtx.isAuthenticated && <AuthStack/>}
        {authCtx.isAuthenticated && <AuthenticatedStack/>} */}
        {checkAuth()}
      </NavigationContainer>
    )
  }

  function Root () {
    const authCtx = useContext(AuthContext)
    const [isTrying, setisTrying] = useState(false)

    async function fetchData(){
      setisTrying(true)
      const storedToken = await AsyncStorage.getItem('suppliertoken')
      const storedId = await AsyncStorage.getItem('supplierId')
      const storedemail = await AsyncStorage.getItem('supplierEmail')
      const storedfirstname = await AsyncStorage.getItem('supplierFirstname')
      const storedlastname = await AsyncStorage.getItem('supplierLastname')
      const storedphone = await AsyncStorage.getItem('supplierPhone')
      const storedpicture = await AsyncStorage.getItem('supplierPicture')
      const storedshowamount = await AsyncStorage.getItem('supplierShowAmount')
      const storedbalance = await AsyncStorage.getItem('supplierBalance')
      const storedlastlogintime = await AsyncStorage.getItem('supplierlastLoginTimestamp')
      const storedpoint = await AsyncStorage.getItem('supplierPoints')
      const storeduserid = await AsyncStorage.getItem('supplieruserid')

    if(storedToken && storedId && storedemail){
      authCtx.authenticated(storedToken)
      authCtx.supplierId(storedId)
      authCtx.supplierEmail(storedemail)
      authCtx.supplierFirstName(storedfirstname)
      authCtx.supplierLastName(storedlastname)
      authCtx.supplierBalance(storedbalance)
      authCtx.supplierPhone(storedphone)
      authCtx.supplierPicture(storedpicture)
      authCtx.supplierShowAmount(storedshowamount)
      authCtx.supplierlastLoginTimestamp(storedlastlogintime)
      authCtx.supplierPoints(storedpoint)
      authCtx.supplieruserid(storeduserid)
    }
      setisTrying(false)
    }

    useEffect(() => {
      fetchData()
    }, [])

    if(isTrying){
      return <LoadingOverlay message={"..."}/>
    }
    
    return <Navigation/>
  }


  return (
    <>
    <StatusBar style="dark-content" />
    <AuthContextProvider>
      <Root/>
    </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
