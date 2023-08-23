import { Link } from "react-router-dom";
import { orgCategoryFormSubmit } from "../../api/adminAuth/admin";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  subcategory: Yup.string(),
  description: Yup.string().required("Description is required"),
});

const OrgCategoryForm : React.FC = () => {
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      subCategoryName: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      const res = await orgCategoryFormSubmit(values);
      if(res?.statusText == 'OK'){
        // navigate('/admin/add-event-category')
      }
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center w-full h-screen place-items-center p-3 ">
        <div className="flex w-full md:w-2/3 lg:w-1/3">
          <p className="my-4 text-sm text-gray-500 ">
            <Link to={"/admin/category-management"}>Go back</Link>
          </p>
        </div>
        <div className="w-full text-center mb-4 mt-1">
          <h2 className="text-4xl font-extrabold dark:text-white place-self-center">
            Add Organization Category
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full md:w-2/3 lg:w-1/3 h-min p-6 bg-white border border-gray-200 rounded-lg shadow"
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="categoryName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                placeholder="Write category name"
                {...formik.getFieldProps("categoryName")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.categoryName && formik.errors.categoryName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.categoryName}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="subcategory"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sub category
              </label>
              <input
                id="subCategoryName"
                type="text"
                placeholder="if any..!"
                {...formik.getFieldProps("subCategoryName")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.subCategoryName && formik.errors.subCategoryName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.subCategoryName}
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Write description for this category..."
            {...formik.getFieldProps("description")}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrgCategoryForm;
