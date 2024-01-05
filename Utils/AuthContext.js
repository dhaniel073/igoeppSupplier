import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext } from "react";
import LoadingOverlay from '../Components/Ui/LoadingOverlay'

export const AuthContext = createContext({
    token: "",
    email: "",
    Id: "",
    firstname: "",
    lastname:"",
    isAuthenticated: false,
    phone: "",
    picture: "",
    balance: "",
    sessionid: "",
    showAmount: "",
    lastLoginTimestamp: "",
    points: "",
    userid: "",


    authenticated: (token) => {},
    supplierId: (Id) => {},
    supplierEmail: (email) => {},
    supplierFirstName: (firstname) => {},
    supplierLastName: (lastname) => {},
    supplierBalance: (balance) => {},
    supplierPhone: (phone) => {},
    supplierPicture: (picture) => {},
    supplierSessionId: (sessionid) => {},
    supplierShowAmount: (showAmount) => {},
    supplierlastLoginTimestamp : (lastLoginTimestamp) => {},
    supplierPoints: (points) => {},
    supplieruserid: (userid) => {},
    logout: () => {}
})

function AuthContextProvider({children}){
    const [IsLogout, setIsLogout] = useState(false)
    const [authToken, setauthToken] = useState()
    const [authEmail, setauthEmail] = useState()
    const [authId, setauthId] = useState()
    const [authFirstName, setauthFirstName] = useState()
    const [authLastName, setauthLastName] = useState()
    const [authShowAmount, setauthShowAmount] = useState()
    const [authBalance, setauthBalance] = useState()
    const [authphone, setauthphone] = useState()
    const [authSessionId, setauthSessionId] = useState()
    const [authpicture, setauthpicture] = useState()
    const [authlogintime, setauthlogintime] = useState()
    const [authpoint, setauthpoint] = useState()
    const [authuserid, setauthuserid] = useState()

    if(IsLogout){
        return <LoadingOverlay/>
    }

    function authenticated(token){
        setauthToken(token)
        AsyncStorage.setItem('suppliertoken', token)
    } 

    function supplierId(id){
        const idtostring = id.toString()
        setauthId(idtostring)
        AsyncStorage.setItem('supplierId', idtostring)
    }

    function supplierPhone(number){
        const phonecheck = number.toString()
        setauthphone(phonecheck)
        AsyncStorage.setItem('supplierPhone', phonecheck)
    }

    function supplierEmail (email){
        setauthEmail(email)
        AsyncStorage.setItem('supplierEmail', email)
    }

    function supplieruserid(userid){
        setauthuserid(userid)
        AsyncStorage.setItem('supplieruserid', userid)
    }

    function supplierFirstName (firstname){
        setauthFirstName(firstname)
        AsyncStorage.setItem('supplierFirstname', firstname)
    }

    function supplierLastName (lastname){
        setauthLastName(lastname)
        AsyncStorage.setItem('supplierLastname', lastname)
    }

    function supplierlastLoginTimestamp(time){
        setauthlogintime(time)
        AsyncStorage.setItem('supplierlastLoginTimestamp', time)
    }


    function supplierBalance(amount){
        if(amount === null || amount === "" || amount === undefined){
            setauthBalance('0.00')
            AsyncStorage.setItem('supplierBalance', '0.00')
        }else{
            const amountcheck = amount.toLocaleString()
            setauthBalance(amountcheck)
            AsyncStorage.setItem('supplierBalance', amountcheck)
        }
    }

    function supplierPoints(point) {
        if(point === null || point ===  '' || point === undefined){
            const set = "0"
            setauthpoint(set)
            AsyncStorage.setItem('supplierPoints', set)
        }else{
            const pointcheck = point.toLocaleString()
            setauthpoint(pointcheck)
            AsyncStorage.setItem('supplierPoints', pointcheck)
        }
    }

    function supplierShowAmount (status) {
        if(status === 'show'){
            setauthShowAmount('show')
            AsyncStorage.setItem('supplierShowAmount', "show")
        }else{
            setauthShowAmount(status)
            AsyncStorage.setItem('supplierShowAmount', 'hide')
        }
    }   

    function supplierPicture (picture){
        if(picture === null || picture === undefined || picture === ""){
            setauthpicture("NoImage")
            AsyncStorage.setItem('supplierPicture', 'NoImage')
        }else{
            setauthpicture(picture)
            AsyncStorage.setItem('supplierPicture', picture)
        }
    }

    function supplierSessionId(value){
        if(value === null || '' || undefined){
            setauthSessionId('nosessionid')
            AsyncStorage.setItem('supplierSessionId', '0.00')
        }else{
            // const amountcheck = amount.toLocaleString()
            setauthSessionId(value)
            AsyncStorage.setItem('supplierSessionId', value)
        }
    }



    function logout(){
        setIsLogout(true)
        setauthToken(null)
        setauthId(null)
        setauthFirstName(null)
        setauthLastName(null)
        setauthEmail(null)
        setauthBalance(null)
        setauthphone(null)
        setauthpicture(null) 
        setauthSessionId(null)
        setauthShowAmount(null)
        setauthlogintime(null)
        setauthpoint(null)
        setauthuserid(null)
        AsyncStorage.removeItem('suppliertoken')
        AsyncStorage.removeItem('supplierId')
        AsyncStorage.removeItem('supplierPhone')
        AsyncStorage.removeItem('supplierEmail')
        AsyncStorage.removeItem('supplierFirstname')
        AsyncStorage.removeItem('supplierLastname')
        AsyncStorage.removeItem('supplierBalance')
        AsyncStorage.removeItem('supplierPicture')
        AsyncStorage.removeItem('supplierSessionId')
        AsyncStorage.removeItem('supplierShowAmount')
        AsyncStorage.removeItem('supplierlastLoginTimestamp')
        AsyncStorage.removeItem('supplierPoints')
        AsyncStorage.removeItem('supplieruserid')
        setIsLogout(false)
    }

    const value = {
        token: authToken,
        Id: authId,
        email: authEmail,
        firstname: authFirstName,
        lastname: authLastName,
        isAuthenticated: !!authToken,
        balance: authBalance,
        phone: authphone,
        picture: authpicture, 
        sessionid: authSessionId,
        showAmount: authShowAmount,
        lastLoginTimestamp: authlogintime,
        points: authpoint,
        userid: authuserid,


        authenticated:authenticated,
        supplierId:supplierId,
        supplierEmail: supplierEmail,
        supplierFirstName: supplierFirstName,
        supplierLastName: supplierLastName, 
        supplierBalance: supplierBalance,
        supplierPhone: supplierPhone,
        supplierPicture: supplierPicture,
        supplierSessionId: supplierSessionId,
        supplierShowAmount: supplierShowAmount,
        supplierlastLoginTimestamp: supplierlastLoginTimestamp,
        supplierPoints: supplierPoints,
        supplieruserid:supplieruserid,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider