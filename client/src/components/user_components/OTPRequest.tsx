import { useState, ChangeEvent, FormEvent } from "react";
import { OTPRequestPost } from "../../api/userAuth/signUp";
import { LoginImage } from "./loginForm";
import { useNavigate } from "react-router-dom";

const OTPRequestForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email)
    const res = await OTPRequestPost(email);
    console.log(res);
    if(res){
      navigate(`/register/OTP-login/OTP-login-submit/:${email}`)
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoginImage />
    </div>
  );
};

export default OTPRequestForm;
