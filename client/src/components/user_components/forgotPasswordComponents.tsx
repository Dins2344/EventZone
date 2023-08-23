import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  OTPRequestPost,
  OTPVerifyPost,
  forgotChangePassword,
} from "../../api/userAuth/signUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordComponents: React.FC = () => {
  const [error, setError] = useState("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [OTPSend, setOTPSend] = useState<boolean>();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      //   password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      const mode = "OTPLogin";
      try {
        setEmail(values.email);
        const res = await OTPRequestPost(values.email, mode);
        if (res?.data.status) {
          setOTPSend(true);
          notify();
        } else {
          setError("Entered email is not registered");
        }
      } catch (error: any) {
        setError(error.toString());
      }
    },
  });
  const notify = () => {
    toast.success("OTP has been successfully sent to this email address.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="lg:max-w-lg mx-auto flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-9/12 lg:w-9/12 md:w-6/12 ">
          {emailVerified ? (
            <ChangePasswordComponents email={email} />
          ) : (
            <>
              {OTPSend ? (
                <VerifyOTP setEmailVerified={setEmailVerified} email={email} />
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <h2 className="text-2xl font-bold mb-6">Confirm email</h2>
                  <div className="mb-6">
                    {error && <div className="text-red-500">{error}</div>}
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      to={"/register/user-login"}
                    >
                      Back to login
                    </Link>
                    <button
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponents;

interface VerifyOTPProps {
  email: string;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ email, setEmailVerified }) => {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const mode = "signUpOTP";
    const res = await OTPVerifyPost(OTP, email, mode);
    if (res?.data.OTPValidation) {
      setEmailVerified(true);
    } else {
      setError(res?.data.message);
    }
  };
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6">Enter your OTP</h2>
        <div className="mb-6">
          {error && <div className="text-red-500">{error}</div>}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter OTP
          </label>
          <input
            name="OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Enter your OTP"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to={"/register/user-login"}
          >
            Back to login
          </Link>
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            verify
          </button>
        </div>
      </div>
    </>
  );
};

interface ChangePasswordProps {
  email: string;
}

const ChangePasswordComponents: React.FC<ChangePasswordProps> = ({ email }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      try {
        const res = await forgotChangePassword(values.email, values.password);
        if (res?.data.ok) {
          notify();
        }
      } catch (error: any) {
        setError(error.toString());
      }
    },
  });

  const notify = () => {
    toast.success(
      "Successfully changed password. Please login with your new password",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
    setTimeout(() => navigate("/register/user-login"), 3000);
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form onSubmit={formik.handleSubmit}>
        {error.length && (
          <>
            <div className="text-red-500">{error}</div>
          </>
        )}
        <h2 className="text-2xl font-bold mb-6">Enter new password</h2>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Re-enter password"
          />
          {formik.touched.password && formik.errors.confirmPassword && (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to={"/register/user-login"}
          >
            Back to login
          </Link>
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change
          </button>
        </div>
      </form>
    </>
  );
};
