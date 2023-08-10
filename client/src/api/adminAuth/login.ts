import axios from "axios"
import { adminInterface } from "../../types/adminInterface"
import config from "../../config/envConfig"

export const adminLoginPost = async(loginData:adminInterface)=>{
    try{
        const response = await axios.post(`${config.BASE_URL}/auth/admin-login`,loginData)
        return response
    }catch(error){
        console.log('error in login',error)
    }
  }