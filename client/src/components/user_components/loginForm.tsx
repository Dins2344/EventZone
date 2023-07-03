
import { Link, useNavigate } from "react-router-dom";
import { loginPost } from "../../api/userAuth/signUp";
import Divider from "../orDivider";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const LoginImage: React.FC = () => {
  return (
    <div className="w-full lg:w-1/2 hidden lg:block">
      {/* Image */}
      <img
        className="w-full h-auto"
        src="https://cdn.evbstatic.com/s3-build/perm_001/c24baa/django/images/login/lateral-image-3.jpg"
        alt="Your Image"
      />
    </div>
  );
};


function LoginForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async  (values) => {
      // Handle form submission
      console.log(values);
      const res = await loginPost(values)
      console.log(res?.data.userData);
      if (res?.data.userData) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res?.data.userData));
        navigate("/");
      }
    },
  });



  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="w-full lg:w-1/2 ">
        <div className="lg:max-w-lg mx-auto flex justify-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3">
            <form onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <div className="mb-6">
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
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <p className="mt-4">
              don't have an account ..?
              <Link className="text-blue-600" to={"/register/user-sign-up"}>
                sign up
              </Link>
            </p>
            <Divider text="or" />
            <p>
              Login with{" "}
              <Link className="text-blue-500" to={"/register/OTP-login"}>
                OTP
              </Link>
            </p>
          </div>
        </div>
        {/* Signup Form */}
      </div>
      <LoginImage />
    </div>
  );
}

export default LoginForm;
