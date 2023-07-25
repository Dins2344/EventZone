import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCities } from "../../api/adminAuth/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  cityName: Yup.string().required("City Name is required"),
  state: Yup.string().required("State is required"),
});

const CityAddingForm = () => {
  const formik = useFormik({
    initialValues: {
      cityName: "",
      state: "",
    },
    validationSchema,
    onSubmit: async (values ,{resetForm}) => {
      const res = await addCities(values);
      if (res?.data.ok) {
        notify();
        resetForm();
      }
    },
  });


  const notify = () => {
    toast.success("successfully added a city!", {
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
      <div className="flex flex-col justify-center w-full min-h-screen -mt-14 place-items-center p-3 ">
        <div className="flex w-full md:w-2/3 lg:w-1/3">
          <p className="my-4 text-sm text-gray-500">
            <Link to={"/admin/add-cities"}>Go back</Link>
          </p>
        </div>
        <div className="w-full text-center mb-4 mt-1">
          <h2 className="text-4xl font-extrabold dark:text-white place-self-center">
            Add a city
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full md:w-2/3 lg:w-1/3 h-min p-6 bg-white border border-gray-200 rounded-lg shadow"
        >
          <div className="flex flex-col">
            <div className="mb-6">
              <label
                htmlFor="cityName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City Name
              </label>
              <input
                id="cityName"
                type="text"
                placeholder="Write city name"
                {...formik.getFieldProps("cityName")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.cityName && formik.errors.cityName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.cityName}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                placeholder="State"
                {...formik.getFieldProps("state")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-500 text-sm">
                  {formik.errors.state}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add City
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CityAddingForm;
