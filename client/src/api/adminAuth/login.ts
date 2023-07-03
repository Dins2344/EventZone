import axios from "axios"
import { adminInterface } from "../../types/adminInterface"

export const adminLoginPost = async(loginData:adminInterface)=>{
    try{
        const response = await axios.post('http://localhost:4000/auth/admin-login',loginData)
        return response
    }catch(error){
        console.log('error in login',error)
    }
  }