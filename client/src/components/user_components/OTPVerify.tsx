import { useState, ChangeEvent, FormEvent } from "react";
import { OTPVerifyPost } from "../../api/userAuth/signUp";
import { LoginImage } from "./loginForm";
import { useNavigate } from "react-router-dom";


const OTPVerifyForm: React.FC = () => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate()
  
  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    const email  = urlParams.get('email')
    e.preventDefault();
    console.log(OTP,email)
    const res = await OTPVerifyPost(OTP,email);
    console.log(res);
    if(res?.data.OTPValidation){
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      navigate('/')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full lg:w-1/2 ">
        <div className="lg:max-w-lg mx-auto flex justify-center">
          <form
            onSubmit={submitHandle}
            className="bg-white shadow-md rounded px-2 pt-6 pb-8 mb-4 w-3/4"
          >
            <h2 className="text-2xl font-bold mb-6">OTP Login</h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="OTP"
              >
                Enter OTP
              </label>
              <input
                value={OTP}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setOTP(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="OTP"
                type="number"
                placeholder="Enter your OTP"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoginImage />
    </div>
  );
};

export default OTPVerifyForm;
