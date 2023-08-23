
import { adminLoginPost } from "../../api/adminAuth/login";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
 email: Yup.string().email('Invalid email address').required('Email is required'),
 password: Yup.string().required('Password is required'),
});
const AdminLoginComponent = () => {
     const navigate = useNavigate()


    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        // Handle form submission here
        const res = await adminLoginPost(values)
        if(res?.data){
          localStorage.setItem("adminToken",res.data.token)
          navigate('/admin')
        }
      },
    });

   
  return (
    <div className="relative flex flex-col justify-center min-h-screen p-6">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md md:max-w-xl lg:w-1/3">
        <h1 className="text-3xl font-semibold text-center text-black ">
          Admin Login
        </h1>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="text"
          {...formik.getFieldProps('email')}
          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
             {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginComponent;
