import { OTPRequestPost, OTPVerifyPost } from "../../api/userAuth/signUp";
import { Link } from "react-router-dom";
import { LoginImage } from "./loginForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SignUpEmailVerify: React.FC = () => {
  const [error, setError] = useState("");
  const [activeComponent, setActiveComponent] = useState(0);
  const [email, setEmail] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      setEmail(values.email);
      const mode = "emailVerification";
      const res = await OTPRequestPost(values.email, mode);
      console.log(res);
      if (res?.data.error === "user exist") {
        setError("Email already registered. Please login or reset password.");
        setTimeout(() => {
          setError("");
        }, 4000);
      } else if (res?.data.message == "OTP has send") {
        setActiveComponent(1);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full lg:w-1/2 ">
        <div className="lg:max-w-lg mx-auto flex justify-center">
          {activeComponent == 0 && (
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md rounded px-2 pt-6 pb-8 mb-4 w-3/4"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Verify your email</h2>

                <div className="mb-6">
                  {error && <div className="text-red-500">{error}</div>}
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              <p className="mt-4">
            already have an account ..?
            <Link className="text-blue-600" to={"/register/user-login"}>
              {" "}
              Login
            </Link>
          </p>
            </form>
          )}

          {activeComponent == 1 && <OTPSubmit email={email} />}

         
        </div>
        {/* Signup Form */}
      </div>
      <LoginImage />
    </div>
  );
};

const OTPSubmit = ({ email }: { email: string }) => {
  const [error, setError] = useState("");
  const [OTP,setOTP] = useState('')
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const mode = 'signUpOTP'
    const res = await OTPVerifyPost(OTP,email,mode)
    console.log(res)
    if(res?.data.message == 'OTP is invalid'){
        setError('enter valid OTP')
        setTimeout(()=>{setError('')},3000)
    }else if(res?.data.message == 'OTP is expired'){
        setError(res.data.message)
        setTimeout(()=>{setError('')},3000)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-2 pt-6 pb-8 mb-4 w-3/4"
      >
        <div>
          <h2 className="text-2xl font-bold mb-6">Enter OTP</h2>

          <div className="mb-6">
            {error && <div className="text-red-500">{error}</div>}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="OTP"
            >
              Enter OTP
            </label>
            <input
              id="OTP"
              type="number"
              placeholder="Enter your OTP"
              value={OTP}
              onChange={(e)=>{
                setOTP(e.target.value)
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            
              <div className="text-red-500">{}</div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit OTP
            </button>
          </div>
        </div>
        <p className="mt-4">
            already have an account ..?
            <Link className="text-blue-600" to={"/register/user-login"}>
              {" "}
              Login
            </Link>
          </p>
      </form>
    </>
  );
};

export default SignUpEmailVerify;
