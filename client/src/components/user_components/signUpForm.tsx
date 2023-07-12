import { signUpPost } from "../../api/userAuth/signUp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginImage } from "./loginForm";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const getEmail = ()=>{
  //   return email
  // }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    email && setEmail(email);
  },[]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email:'',
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      values.email = email
      console.log(values);
      const res = await signUpPost(values);
      console.log(res?.data);
      if (res?.data) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full lg:w-1/2 ">
        <div className="lg:max-w-lg mx-auto flex justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-2 pt-6 pb-8 mb-4 w-3/4"
          >
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <div className="mb-4 flex">
              <div className="mr-1 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="First name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Last name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            {/* <div className="mb-6">
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
            </div> */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                id="confirmPassword"
                type="password"
                placeholder="Reenter your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className=" w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-4">
              already have an account ..?
              <Link className="text-blue-600" to={"/register/user-login"}>
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
        {/* Signup Form */}
      </div>
      <LoginImage />
    </div>
  );
};

export default SignUpForm;
