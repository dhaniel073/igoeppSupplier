import axios from "axios";

async function signupurl (lastname, firstname, country, state,  city,  email,phone,password, identification_type, identification_num) {
    const url = `https://igoeppms.com/igoepp/public/api/supplier/store`
    const response = axios.post(url, {
      "last_name": lastname,
      "first_name": firstname,
      "Country": country,
      "State": state,
      'lga': city,
      "email": email,
      "phone": phone,
      "password": password,
      "identification_type":identification_type,
      "identification_num":  identification_num,
      'application': "mobileapp"
    })
    const data = response.data;
    return data
}

async function loginurl(email, password){
    const url = `https://igoeppms.com/igoepp/public/api/igoeppauth/loginsupplier`
    const response = axios.post(url, {
        'username': email,
        'password': password,
        'application': "mobileapp"
    })
    const data  = response;
    return data
}

// 

async function notificationunread(Id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/general/viewpushnotificationcount/${Id}`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    return data
  
}

async function sliderimage(token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/general/getSlidesByApp/supplier`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  
    const data = response.data
    return data
}

async function trendingservice(token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/hrequest/fromtodayservicemarkettrend`
    const response = axios.get(url, {
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    const data = response
    return data
}
  
async function viewalertsetup(id,token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/${id}/supplieralertsetupview`
    const response = axios.get(url, {
        headers:{
            Accept: `application/json`,
            Authorization: `Bearer ${token}`
        }
    })

    const data = response
    return data
  }

  async function enablealert(id, event_type, alert_type, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/supplieralertsetups`
    const response = axios.post(url,{
        supplier_id: id,
        event_type: event_type,
        alert_type: alert_type
    }, {
        headers:{
            Accept:`application/json`,
            Authorization: `Bearer ${token}`
        }
    })
    const data = response
    return data
  }

  async function biometricsetup(id, fingerprinttoken,  token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/setupbiometric`
    const response = axios.post(url, {
      "supplier_id": id,
      "finger_print": fingerprinttoken,
    }, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  
    const data = response
    return data;
  }

  async function loginwithbiometric(fingerprinttoken){
    const url = `https://igoeppms.com/igoepp/public/api/igoeppauth/loginsupplierbiometric`
    const response = axios.post(url, {
      "biometric": fingerprinttoken,
    }) 
  
    const data = response
    return data
  }

  async function disablebiometric(id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/${id}/disablebiometric`
    const response = axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  
    const data = response
    return data;
  }

  async function setuppin(id, pin, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/setuppin`
    const response = axios.post(url, {
      "supplier_id": id,
      "pin": pin,
    }, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) 
    const data = response
    return data
  }
  
  async function validatepin(id, pin, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/validatepin`
    const response = axios.post(url, {
      "supplier_id": id,
      "pin": pin,
    }, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) 
    const data = response
    return data
  }

  async function updatepin(id, pin, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/resetpin`
    const response = axios.put(url, {
      "supplier_id": id,
      "pin": pin,
    }, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) 
    const data = response
    return data
  }

  async function supplierresetpassword(id, password, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/supplierpasswordreset`
    const response = axios.post(url, {
      "id": id,
      "password": password
    }, {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) 
    const data = response
    return data
  }

  async function supplierurl(id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/${id}`
    const response = axios.get(url,
    {
      headers:{
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }) 
    const data = response
    return data
  }

  async function validateLogin(email, password){
    const loginUrl = 'https://igoeppms.com/igoepp/public/api/igoeppauth/validateloginsupplier'
    
    const response = await axios.post(loginUrl, {
      'username': email,
      'password': password,
    })
    const data = response.data
    return data;
  }

  async function validatebet(id, billerID, betnijaID, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerBet`
    const response = axios.post(url, {
      "customerID": id,
      "billerID": billerID,
      "type": "S",
      "betnijaID": betnijaID
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response
    return data
  }
  // make payment for bet account endpoint
  async function betpay(requestID,amount,token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/betBillPayment`
    const response = axios.post(url, {
      "requestID": requestID,
      "amount": amount,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response
    return data
  }

  //purchase waec card endpoint
  async function waeccard(id,billerID,bouquetCode,amount,token, commission) {
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/purchaseWaecPin`
    const response = axios.post(url, {
      "customerID": id,
      "billerID": billerID,
      "type": "S",
      "bouquetCode": bouquetCode,
      "amount": amount,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })

    const data =  response 
    return data
  }

  //validate customer electricity number
  async function validatedisco(id, billerID, meterID, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerDisco`
    const response = axios.post(url, {
      "customerID": id,
      "billerID": billerID,
      "type": "S",
      "meterID": meterID
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = response
    return data 
  }

  // customer electricity payment
  async function discopayment(requestID, amount, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/discoPayment`
    const response = await axios.post(url, {
      "requestID": requestID,
      "amount": amount,
      "commission": commission        
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data
    return data
  }

  // validate multichoice endpoint
  async function validatetv(id, billerID, smartCardID, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerTv`
    const response = axios.post(url, {
      "customerID": id,
      "billerID": billerID,
      "type": "S",
      "smartCardID": smartCardID
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })

    const data = response
    return data 
  }

  async function tvpay(requestID, amount, bouquetCode, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/tvPayment`
    const response = axios.post(url, {
      "requestID": requestID,
      "amount": amount,
      "bouquetCode": bouquetCode,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })

    const data = response
    return data
}

  //multichoice payment for renewal endpoint
  async function tvrenewalpay(requestID, amount, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/tvPaymentRenewal`
    const response = axios.post(url, {
      "requestID": requestID,
      "amount": amount,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
        }
    })

    const data = response 
    return data
  }

  
  //validate helper thirdparty phone number
  async function supplierthirdparty(id, phone, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerPhoneThirdParty`
    const response = await axios.post(url, {
      "customerID": id,
      "phoneNumber": phone,
      "type": "S"
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })

    const data = response.data
    return data
  }

  //validate helper self phone number
  async function supplierSelf(id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerPhone`
    const response = await axios.post(url, {
      "customerID": id,
      "type": "S"
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })
    const data = response.data
    return data
  }

  // buy airtime endpoint 
  async function suppliervtuairtime( requestid, billerId, amount, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/vtuPaymentAirtime`
    const response = await axios.post(url, {
      "requestID": requestid,
      "billerId": billerId,
      "amount": amount,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })

    const data = response.data
    return data
  }

  //buy data endpoint
  async function suppliervtudata(requestid, billerId, amount, bouquetCode, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/vtuPaymentData`
    const response = await axios.post(url, {
      "requestID":  requestid,
      "billerId": billerId,
      "amount": amount,
      "bouquetCode": bouquetCode,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    })
    const data = response.data 
    return data
  }

//validate internet endpoint 
  async function validateinternet(id, billerId, smartCardID, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/validateCustomerInternet`
    const response = axios.post(url, {
      "customerID": id,
      "billerID": billerId,
      "type": "H",
      "smartCardID": smartCardID.toString()
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data =  response
    return data
  }

  //pay for internet endpoint
  async function internetPayment(requestID, amount, bouquetCode, token, commission){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/internetPayment`
    const response = axios.post(url, {
      "requestID": requestID,
      "amount": amount,
      "bouquetCode": bouquetCode,
      "commission": commission
    }, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data =  response
    return data
  }

  async function supplierbillercommission(id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/billpayment/getMyBillersByBillerID/${id}`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    return data;
  }

  async function sendfeedback(id, subject, message, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/supplierfeedback`
    const response = await axios.post(url,{
      "supplierid": id,
      "subject" : subject,
      "message": message
    }, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  
    const data = response.data
    return data
  }

  async function notification(Id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/general/viewpushnotification/${Id}`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data.data
    return data
  }
  
  async function notificationbyid(Id, token){
    const url = `https://igoeppms.com/igoepp/public/api/auth/general/viewpushnotificationbyid/${Id}`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    return data
  }

  async function availablestore(id, token){
    // console.log(id, token)
    const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/avialsupplier/${id}`
    const response = await axios.put(url, {}, {
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    return data
  }


//helper unavailable store endpoint
async function unavailablestore(id,token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/unavialsupplier/${id}`
  const response = await axios.put(url,{}, {
    headers:{
      Accept:'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data
} 

async function updatewallet(amount, id, token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/walletupdate`
  const response = await axios.post(url, {
    wallet_balance: amount,
    supplier_id: id
  }, {
    headers:{
      Accept:'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data
}

async function signupsupplier(lastname, firstname, sex, country, state, lga, email, phone, password, address, identification_type,identification_num, referral_code){
  const url = 'https://igoeppms.com/igoepp/public/api/supplier/store'
  const response = await axios.post(url, {
    "last_name": lastname,
    "first_name": firstname,
    "email": email,
    "phone": phone,
    "password": password,
    "sex": sex,
    "Country": country,
    "State": state,
    "lga": lga,
    "address": address,
    "identification_type": identification_type,
    "identification_num":identification_num,
    "referral_code": referral_code
  })
  const data = response.data
  return data;
}

//helper upload image/passport endpoint
async function upload(id, pictureurl, token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/uploadpictureapp`
  const response = await axios.post(url,{
    picture: pictureurl,
    supplierid: id
  }, {
    headers:{
      "Content-Type": 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })

  const data = response.data
  return data
}

//guarantors upload details endpoint
async function guarantorsupload(guarantorsname,guarantorsemail,id,token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/compliance/sendtoguarantor`
  const response = await axios.post(url, {
    name: guarantorsname,
    email:guarantorsemail,
    supplierid: id
  }, {
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${token}`
    }
  })

  const data = response.data
  return data
}

//guarantors upload ID card image endpoint
async function supplieruploadIdcard(picture,id,token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/compliance/uploadsupplieridcard`
  const response = await axios.post(url, {
    picture: picture,
    supplierid:id,
  }, {
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${token}`
    }
  })

  const data = response.data
  return data
}

//guarantors upload ID card image endpoint
async function supplieruploadAddressproof(picture,id,token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/compliance/uploadsupplieraddressdoc`
  const response = await axios.post(url, {
    picture: picture,
    supplierid:id,
  }, {
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${token}`
    }
  })

  const data = response.data
  return data
}

//helper update back details endpoint
async function supplierbankdetails(account, accountname, id, token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/accountupdate`
  
  const response = await axios.post(url, {
    "account": account,
    "accountname": accountname,
    "bank":"Parallex Bank",
    "supplier_id": id
  }, {
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${token}`
    }
  })

  const data = response.data
  return data
}

async function forgotsupplierpassword(email){
  const url = 'https://igoeppms.com/igoepp/public/api/supplier/forgetpassword'
  const response = await axios.post(url, {
    'email': email
  })
  const data = response.data
  return data
}

async function walletbal(supplierId, token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/supplier/${supplierId}/wallet`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    return data;
}


async function category(token){
  const response = await axios.get("http://igoeppms.com/igoepp/public/api/auth/globalproductcategory", {
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data.data
  return data;
}

async function cartitem(categoryId, token){
  const response = await axios.get(`https://igoeppms.com/igoepp/public/api/auth/productbycatshow/${categoryId}`, {
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data;
}

async function suppliercategoryget(id, token){
  const response = await axios.get(`https://igoeppms.com/igoepp/public/api/auth/productbysupplierid/${id}`, {
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data;
}

async function supplierproductstore(product_category_id, supplier_id, name,description,price, shipping_cost,  available, token){
  const response = await axios.post(`https://igoeppms.com/igoepp/public/api/auth/product/store`, {
    "product_category_id": product_category_id,
    "supplier_id": supplier_id,
    "name": name,
    "description": description,
    "price": price,
    "shipping_cost": shipping_cost,
    "available": available
  },{
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data
}

async function customerrequest(id, token){
  const response = await axios.get(`https://igoeppms.com/igoepp/public/api/auth/purchaseheaderbysuppid/${id}`,{
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data
  return data
}

async function customerrequestbyid(id, token){
  const url = `https://igoeppms.com/igoepp/public/api/auth/purchaseheader/${id}`
  const response = await axios.get(url,{
    headers:{
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data.data
  return data
}

async function convertpassword(password){
  // console.log(email,password)
  const url = `https://igoeppms.com/igoepp/public/api/igoeppauth/getconvpass`
  const response = await axios.post(url, {
      "password": password,
  })
  // console.log(response.data)
  const data = response.data
  return data 
}

export const ConvertPassword = (password) => {
  return convertpassword(password)
}
  
  

export function SignUpUrl (lastname, firstname, country, state,  city,  email,phone,password, identification_type, identification_num){
  return signupurl(lastname, firstname, country, state,  city,  email,phone,password, identification_type, identification_num)
}

export function LoginUrl(email, password){
  return loginurl(email, password)
}

export const NotificationUnread = (id, token) => {
  return notificationunread(id, token)
}

export const SliderImage = (token) => {
  return sliderimage(token)
}

export const TrendingService = (token) => {
  return trendingservice(token)
}

export function Category(token){
  return category(token)
}

export function SupplierCategoryGet(id, token){
  return suppliercategoryget(id, token)
}

export function SupplierProductStore(product_category_id, supplier_id, name,description,price, shipping_cost, available, token) {
  return supplierproductstore(product_category_id, supplier_id, name,description,price, shipping_cost,  available, token)
}

export function CartItem(categoryId, token){
  return cartitem(categoryId, token)
}

export const EnableAlert = (id, event_type, alert_type, token) => {
  return enablealert(id, event_type, alert_type, token)
}

export const ViewAlertSetup = (id, token) => {
  return viewalertsetup(id, token)
}

export const DisableBiometric = (id, token) => {
  return disablebiometric(id, token)
}

export const BiometricSetup = (id, fingerprinttoken, token) => {
  return biometricsetup(id, fingerprinttoken, token)
}

export const LoginWithBiometric = (fingerprinttoken) => {
  return loginwithbiometric(fingerprinttoken)
}

export const SetupPin = (id, pin, token) => {
  return setuppin(id, pin, token)
}

export const ValidatePin = (id, pin, token,) => {
  return validatepin(id, pin, token)
}

export const UpdatePin = (id, pin, token) => {
  return updatepin(id, pin, token)
}

export const SupplierResetPassword = (id, password, token) => {
  return supplierresetpassword(id, password, token)
}

export const SupplierUrl = (id, token) => {
  return supplierurl(id, token)
}

export const ValidateLogin = (email, password) => {
  return validateLogin(email, password)
}

export const SupplierThirdParty = (id, phone, token) => {
  return supplierthirdparty(id, phone, token)
}

export const SupplierVtuAirtime = (requestid, billerId, amount, token, commission) => {
  return suppliervtuairtime(requestid, billerId, amount, token, commission)
}

export const SupplierVtuData = (requestid, billerId, amount, bouquetCode, token, commission) => {
  return suppliervtudata(requestid, billerId, amount,bouquetCode, token, commission)
}

export const SupplierSelf = (id, token) => {
  return supplierSelf(id, token)
}

export const ValidateInternet = (id, billerId, smartCardID, token) => {
  return validateinternet(id, billerId, smartCardID, token)
}

export const InternetPayment = (requestID, amount, bouquetCode, token, commission) => {
  return internetPayment(requestID, amount, bouquetCode, token, commission)
}

export const ValidateBet = (id, billerID, betnijaID, token) => {
  return validatebet(id, billerID, betnijaID, token)
}

export const BetPay = (requestID, amount, token, commission) => {
  return betpay(requestID, amount, token, commission)
}

export const WaecCard = (id,billerID,bouquetCode,amount,token, commission) => {
  return waeccard(id,billerID,bouquetCode,amount,token, commission)
}

export const ValidateDisco = (id, billerID, meterID, token) => {
  return validatedisco(id, billerID, meterID, token)
}

export const DiscoPayment = (requestID, amount, token, commission) => {
  return discopayment(requestID, amount, token, commission)
}

export const ValidateTv = (id, billerID, smartCardID, token) => {
  return validatetv(id, billerID, smartCardID, token)
}

export const TvPayment = (requestID, amount, bouquetCode, token, commission) => {
  return tvpay(requestID, amount, bouquetCode, token, commission)
}

export const TvRenewalPay = (requestID, amount, token, commission) => {
  return tvrenewalpay(requestID, amount, token, commission)
}

export const SupplierBillerCommission = (id, token) => {
  return supplierbillercommission(id, token)
}

export const SendFeedBack = (id, suject, message, token) => {
  return sendfeedback(id, suject, message, token)
}

export function Notification(Id, token){
  return notification(Id, token)
}

export const NotificationById = (id, token) => {
  return notificationbyid(id, token)
}

//helper unavailable
export const UnavailableStore = (id, token) => {
  return unavailablestore(id, token)
}

//helper available
export const AvailableStore = (id, token) => {
  return availablestore(id, token)
}

//update wallet 
export const UpdateWallet = (amount, id, token)  => {
  return updatewallet(amount, id, token)
}
// enteredLastName, enteredFirstname, enteredGender, country, state, city, enteredEmail, enteredPhone, passwordMd5,  address, idtype, idnum, referral_code)
export const SignUpSupplier = (lastname, firstname, sex, country, state, lga, email, phone, password, address, identification_type,identification_num, referral_code) => {
  return signupsupplier(lastname, firstname, sex, country, state, lga, email, phone, password, address, identification_type,identification_num, referral_code)
}

export const GuarantorsUpload = (guarantorsname, guarantorsemail, id, token) => {
  return guarantorsupload(guarantorsname, guarantorsemail, id, token)
}

//helepr upload idcard details
export const SupplierUploadIdCard = (picture, id, token) => {
  return supplieruploadIdcard(picture, id, token)
}


//helper upload address proof details
export const SupplierUploadAddressProof = (picture, id, token) => {
  return supplieruploadAddressproof(picture, id, token)
}

//helper bank details
export const SupplierBankDetails = (account, accountname, id, token) => {
  return supplierbankdetails(account, accountname, id, token)
}

export const UpLoad = (id, pictureurl, token) => {
  return upload(id,pictureurl, token)
}

export const ForgotSupplierPassword = (email) => {
  return forgotsupplierpassword(email)
}

export function WalletBalance(supplierId,token){
  return walletbal(supplierId, token)    
}

export function CustomerRequest(id, token){
  return customerrequest(id, token)
}

export function CustomerRequestById(id, token){
  return customerrequestbyid(id, token)
}