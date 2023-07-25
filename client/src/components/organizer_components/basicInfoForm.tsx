import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import { BasicFormInterface } from "../../types/organizerInterface";
import {
  getAllCities,
  getUsersOrganizations,
} from "../../api/organizer/organizer";
import { getEventCategories } from "../../api/organizer/organizer";
import {
  RegisteredCityInterface,
  eventCategoryInterface,
} from "../../types/adminInterface";
import { OrganizationInterface } from "../../types/organizerInterface";
import { addBasicEventInfo } from "../../api/organizer/organizer";
import { ChildComponentProps } from "../../pages/organizer_pages/eventAdding";
import { useDispatch } from "react-redux";
import { setEvent } from "../../redux/reducers/eventSlice";

const BasicInfoComponent = ({ setActiveStep }: ChildComponentProps) => {
  const [eventCategories, setEventCategories] = useState<
    eventCategoryInterface[]
  >([]);
  const [organizers, setOrganizers] = useState<OrganizationInterface[]>();
  const [cities, setCities] = useState<RegisteredCityInterface[]>();
  const dispatch = useDispatch();

  const fetchOrganizer = async () => {
    const data = await getUsersOrganizations();
    setOrganizers(data.data.data);
  };

  const fetchEventCategory = async () => {
    const data = await getEventCategories();
    setEventCategories(data.data.data);
  };

  const fetchCities = async () => {
    const data = await getAllCities();
    setCities(data?.data.data);
  };
  useEffect(() => {
    fetchEventCategory();
    fetchOrganizer();
    fetchCities();
  }, []);
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("Event Name is required"),
    organizer: Yup.string().required("Choose an organizer"),
    category: Yup.string().required("Choose a category for the event"),
    agenda: Yup.string().required("Agenda is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    startDate: Yup.date().required("Select a start date"),
    startTime: Yup.string().required("Select a start time"),
    endDate: Yup.date().required("Select an end date"),
    endTime: Yup.string().required("Select an end time"),
  });

  // Initial form values
  const initialValues = {
    eventName: "",
    organizer: "",
    category: "",
    agenda:'',
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    addressLine3: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  // Form submission handler
  const handleSubmit = async (values: BasicFormInterface) => {
    const res = await addBasicEventInfo(values);
    console.log(res.data.response);
    dispatch(setEvent(res.data.response));
    setActiveStep(1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="mx-12">
        {/* Basic Info Section */}
        <div className="mt-7">
          <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Basic Info
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Name your event and tell event-goers why they should come. Add
            details that highlight what makes it unique.
          </p>
          <div className="mb-6">
            <label
              htmlFor="eventName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Name
            </label>
            <Field
              type="text"
              id="eventName"
              name="eventName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage
              name="eventName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 md:pr-2">
              <label
                htmlFor="organizer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Organizer
              </label>
              <Field
                as="select"
                id="organizer"
                name="organizer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select an organizer</option>
                {organizers &&
                  organizers.map((item) => {
                    return <option value={item._id}>{item.orgName}</option>;
                  })}
                {/* Add options for organizers */}
              </Field>
              <ErrorMessage
                name="organizer"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 md:mt-0 mt-3">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {eventCategories &&
                  eventCategories.map((item) => {
                    return (
                      <option value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    );
                  })}
                {/* Add options for categories */}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Events agenda
          </label>
          <Field
            as="textArea"
            id="agenda"
            name="agenda"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your events agenda here..."
          ></Field>
           <ErrorMessage
                name="agenda"
                component="div"
                className="text-red-500"
              />
        </div>

        {/* Location Info Section */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Location Info
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Let people know where the event will be held. Provide the address or
            specific location, if applicable.
          </p>
          <div className="mb-6">
            <label
              htmlFor="addressLine1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address Line 1
            </label>
            <Field
              type="text"
              id="addressLine1"
              name="addressLine1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage
              name="addressLine1"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* Add more fields related to the Location Info section */}
          <div className="mb-6">
            <label
              htmlFor="addressLine2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address Line 2
            </label>
            <Field
              type="text"
              id="addressLine2"
              name="addressLine2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage
              name="addressLine2"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 md:pr-2">
              <label
                htmlFor="cities"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a city
              </label>
              <Field
                as="select"
                id="city"
                name="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""} selected>
                  Choose a city
                </option>
                {cities &&
                  cities.map((item) => {
                    return (
                      <option value={item.cityName}>{item.cityName}</option>
                    );
                  })}
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 mt-3 md:mt-0">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a state
              </label>
              <Field
                as="select"
                id="state"
                name="state"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""} selected>
                  Choose a state
                </option>
                <option value={"kerala"} selected>
                  kerala
                </option>
                {/* {cities &&
                  cities.map((item) => {
                    return <option value={item.state}>{item.state}</option>;
                  })} */}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Date and Time
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Tell people when your event starts and ends so they can make plans
            to attend.
          </p>
          <div className="flex mb-3">
            <div className="md:w-1/2 w-full mr-3">
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <Field
                type="date"
                id="startDate"
                name="startDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Add more fields related to the Date and Time section */}
            <div className="md:w-1/2 w-full ml-3">
              <label
                htmlFor="startTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Time
              </label>
              <Field
                type="time"
                id="startTime"
                name="startTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="startTime"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="flex">
            <div className="md:w-1/2 w-full mr-3">
              <label
                htmlFor="endDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <Field
                type="date"
                id="endDate"
                name="endDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="md:w-1/2 w-full ml-3">
              <label
                htmlFor="endTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Time
              </label>
              <Field
                type="time"
                id="endTime"
                name="endTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage
                name="endTime"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Add more sections and fields as needed */}

        {/* Submit Button */}
        <div className="flex justify-between md:justify-end mt-4">
          <Button
            size="sm"
            color="red"
            variant="outlined"
            className="mt-3 w-28 mr-3"
          >
            Discard
          </Button>
          <Button type="submit" size="sm" color="blue" className="mt-3 w-28 ">
            Save
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default BasicInfoComponent;
