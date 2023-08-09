import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllEventCategories,
  getAllOrgCategories,
  deleteEventCategory,
  deleteOrgCategory,
} from "../../api/adminAuth/admin";
import { eventCategoryInterface } from "../../types/adminInterface";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export const EventCategory = () => {
  const [categories, setCategories] = useState<eventCategoryInterface[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleOpen = () => setOpen(!open);

  const fetchData = async () => {
    const data = await getAllEventCategories();
    setCategories(data?.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-event-category/${id}`);
  };

  const handleDelete = async () => {
    const res = await deleteEventCategory(deleteId);
    console.log(res);
    if (res?.data.message) {
      const deleted = categories.filter((item) => item._id !== deleteId);
      setCategories(deleted);
      setDeleteId("");
      handleOpen();
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            Are you sure..!
          </Typography>
          <Typography className="text-center font-normal">
            once you deleted can't be restored
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="sm"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
      <footer className="bg-white rounded-lg shadow my-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl py-4 md:flex md:items-center md:justify-between">
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
                        onClick={() => {
                          setDeleteId(item._id);
                          handleOpen();
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline w-12 ml-2"
                      >
                        Delete
                      </button>
                    </td>
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getAllOrgCategories();
    setCategories(data?.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-event-category/${id}`);
  };
  const handleDelete = async () => {
    const res = await deleteOrgCategory(deleteId);
    if (res?.data.message) {
      const deleted = categories.filter((item) => item._id !== deleteId);
      setCategories(deleted);
      setDeleteId("");
      handleOpen();
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            Are you sure..!
          </Typography>
          <Typography className="text-center font-normal">
            once you deleted can't be restored
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="sm"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
      <footer className="bg-white rounded-lg shadow my-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl py-4 md:flex md:items-center md:justify-between">
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
                        onClick={() => {
                          setDeleteId(item._id);
                          handleOpen();
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline w-12 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
