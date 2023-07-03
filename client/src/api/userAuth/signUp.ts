import { createUserInterface,loginUserInterface } from "../../types/userInterface";
import axios from 'axios'


export const signUpPost = async (signUpData:createUserInterface) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register-user",
        signUpData
      );
      return response;
    } catch (error) {
      console.log("error in fetching", error);
    }
  };

  export const loginPost = async(loginData:loginUserInterface)=>{
    try{
        const response = await axios.post('http://localhost:4000/auth/user-login',loginData)
        return response
    }catch(error){
        console.log('error in login',error)
    }
  }

  export const OTPRequestPost = async(email:string)=>{
    try{
      const response = await axios.get(`http://localhost:4000/auth/user-email-verify/${email}`,)
      return response
    }catch(error){
      console.log(error)
    }
  }

  export const OTPVerifyPost = async(OTP:string,email:string|null)=>{
    try{
      const response = await axios.get(`http://localhost:4000/auth/user-OTP-verify/${OTP}/${email}`)
      return response
    }catch(error){
      console.log(error)
    }
  }