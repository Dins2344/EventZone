import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllEventCategories,
  getAllOrgCategories,
  deleteEventCategory,
  deleteOrgCategory,
} from "../../api/adminAuth/admin";
import { eventCategoryInterface } from "../../types/adminInterface";
import Modal from "modal-alerts-react";
import { useModal } from "modal-alerts-react/useModal";
import { Button } from "@material-tailwind/react";

export const EventCategory = () => {
  const [categories, setCategories] = useState<eventCategoryInterface[]>([]);
  const navigate = useNavigate();
  const [isOpenWarning, openWarning, closeWarning] = useModal(false);


  const fetchData = async () => {
    const data = await getAllEventCategories();
    console.log(data?.data.data);
    setCategories(data?.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-event-category/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    const res = await deleteEventCategory(id);
    console.log(res);
    const deleted = categories.filter((item) => item._id !== id);
    setCategories(deleted);
  };
  return (
    <>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">
            Categories for events
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link
                to={"/admin/add-event-category"}
                className="mr-4 hover:underline md:mr-6 "
              >
                Add category
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-14">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Subcategory name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item: eventCategoryInterface) => {
                // Your logic inside the map function
                return (
                
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.categoryName}
                    </th>
                    <td className="px-6 py-4">{item.subCategoryName}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          handleEdit(item._id);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline w-12"
                      >
                        Edit
                      </button>
                      <button
                        onClick={openWarning}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline w-12 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                   <Modal
                   type="warning"
                   title="Warning!"
                   text="Are you sure of this action?"
                   isOpen={isOpenWarning}
                   closeModal={closeWarning}
                 >
                   <Button
                     size="sm"
                     color="green"
                     className="rounded-full mr-3 mt-3"
                     onClick={() => {
                       handleDelete(item._id);
                       closeWarning();
                     }}
                   >
                     Yes
                   </Button>

                   <Button
                     size="sm"
                     color="red"
                     className="rounded-full ml-3 mt-3"
                     onClick={() => {
                       closeWarning();
                     }}
                   >
                     No
                   </Button>
                 </Modal>
                  </tr>
                  
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const OrgCategory = () => {
  const [categories, setCategories] = useState<eventCategoryInterface[]>([]);
  const navigate = useNavigate();
  const [isOpenWarning, openWarning, closeWarning] = useModal(false);

  const fetchData = async () => {
    const data = await getAllOrgCategories();
    console.log(data?.data.data);
    setCategories(data?.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-event-category/${id}`);
  };
  const handleDelete = async (id: string) => {
    const res = await deleteOrgCategory(id);
    console.log(res);
    const deleted = categories.filter((item) => item._id !== id);
    setCategories(deleted);
  };

  return (
    <>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">
            Categories for organizations
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link
                to={"/admin/add-org-category"}
                className="mr-4 hover:underline md:mr-6 "
              >
                Add category
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Subcategory name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item: eventCategoryInterface) => {
                // Your logic inside the map function
                return (
                
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.categoryName}
                    </th>
                    <td className="px-6 py-4">{item.subCategoryName}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          handleEdit(item._id);
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline w-12"
                      >
                        Edit
                      </button>
                      <button
                        onClick={openWarning}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline w-12 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  <Modal
                  type="warning"
                  title="Warning!"
                  text="Are you sure of this action?"
                  isOpen={isOpenWarning}
                  closeModal={closeWarning}
                >
                  <Button
                    size="sm"
                    color="green"
                    className="rounded-full mr-3 mt-3"
                    onClick={() => {
                      handleDelete(item._id);
                      closeWarning();
                    }}
                  >
                    Yes
                  </Button>

                  <Button
                    size="sm"
                    color="red"
                    className="rounded-full ml-3 mt-3"
                    onClick={() => {
                      closeWarning();
                    }}
                  >
                    No
                  </Button>
                </Modal>
                  </tr>
                  
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
