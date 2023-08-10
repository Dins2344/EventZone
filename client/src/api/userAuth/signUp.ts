import {
  createUserInterface,
  loginUserInterface,
} from "../../types/userInterface";
import axios from "axios";
import config from "../../config/envConfig";

export const signUpPost = async (signUpData: createUserInterface) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/auth/register-user`,
      signUpData
    );
    return response;
  } catch (error) {
    console.log("error in fetching", error);
  }
};

export const loginPost = async (loginData: loginUserInterface) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/auth/user-login`,
      loginData
    );
    return response;
  } catch (error: any) {
    console.log("error in login", error);
    if (error?.response.status == 401) {
      throw new Error("invalid user name or password");
    } else {
      throw new Error("login error");
    }
  }
};

export const OTPRequestPost = async (email: string,mode:string) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/auth/user-email-verify/${email}/${mode}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const OTPVerifyPost = async (OTP: string, email: string | null,mode:string) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/auth/user-OTP-verify/${OTP}/${email}/${mode}`
    );
    return response;
  } catch (error) {
    console.log(error); 
  }
};


export const loginWithGoogle = async (token: string) => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/auth/user-google-login/${token}`
    );
      return res
  } catch (error) {
    console.log(error)
  }
}