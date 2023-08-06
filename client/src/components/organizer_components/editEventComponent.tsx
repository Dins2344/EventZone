import { Button, Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  editEventInfo,
  getAllCities,
  getEventCategories,
  getEventDetails,
} from "../../api/organizer/organizer";
import {
  CityInterface,
  eventCategoryInterface,
} from "../../types/adminInterface";
import * as Yup from "yup";

interface EditEventProps {
  eventId: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export interface EditEventFormData {
  eventName: string;
  category: string;
  description: string;
  agenda: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  eventId?: string;
}
const EditEventComponent: React.FC<EditEventProps> = ({ eventId, setMode }) => {
  const [categories, setCategories] = useState<eventCategoryInterface[]>();
  const [cities, setCities] = useState<CityInterface[]>();
  const [formData, setFormData] = useState<EditEventFormData>({
    eventName: "",
    category: "",
    description: "",
    agenda: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchEventCategories();
    fetchCities();
    fetchEventInfo();
  }, []);
  const fetchEventInfo = async () => {
    const data = await getEventDetails(eventId);
    const details = data?.data.data;
    const formData = {
      eventName: details.eventName,
      category: details.category,
      description: details.description,
      agenda: details.agenda,
      addressLine1: details.addressLine2,
      addressLine2: details.addressLine2,
      state: details.state,
      city: details.city,
      startTime: details.startTime,
      startDate: details.startDate,
      endTime: details.endTime,
      endDate: details.endDate,
    };
    setFormData(formData);
  };
  const fetchEventCategories = async () => {
    const data = await getEventCategories();
    setCategories(data?.data.data);
  };
  const fetchCities = async () => {
    const data = await getAllCities();
    setCities(data?.data.data);
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string().required("Address line 1 is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is required"),
    eventName: Yup.string().required("event name is required"),
    state: Yup.string().required("State is required"),
    category: Yup.string().required("event category is required"),
    description: Yup.string().required("description is required"),
    agenda: Yup.string(),
    startDate: Yup.string().required("start Date is required"),
    startTime: Yup.string().required("start time is required"),
    endDate: Yup.string().required("end Date is required"),
    endTime: Yup.string().required("end time is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // Your form submission logic goes here
        setErrors({});
        formData.eventId = eventId;
        console.log(formData);
          const res = await editEventInfo(formData);
          if (res?.data.message) {
              
              res && setMode("view");
          }
      })
      .catch((err: Yup.ValidationError) => {
        const newErrors = err.inner.reduce(
          (acc: { [key: string]: string }, { path, message }) => {
            if (path) {
              acc[path] = message;
            }
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      });
  };

  return (
    <div className="flex flex-col px-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h5 className="mt-5 mb-5">Event Basic Info</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <Input
                  name="eventName"
                  value={formData?.eventName}
                  onChange={handleChange}
                  label="Event name"
                ></Input>
                {errors?.eventName && (
                  <div className="error text-red-600">{errors?.eventName}</div>
                )}
              </div>
              <div className="">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <option value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                </select>
                {errors?.category && (
                  <div className="error text-red-600">{errors?.category}</div>
                )}
              </div>
            </div>
            <div className="mt-3 mb-1">
              <Textarea
                name="description"
                value={formData?.description}
                onChange={handleChange}
                label="Description"
              />
              {errors?.description && (
                <div className="error text-red-600">{errors?.description}</div>
              )}
            </div>
            <div>
              <Textarea
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                label="Agenda"
              />
              {errors?.agenda && (
                <div className="error text-red-600">{errors?.agenda}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="mt-5 mb-5">Event Location Info</h5>
            <Input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              label="Address Line 1"
            />
            {errors?.addressLine1 && (
              <div className="error text-red-600">{errors?.addressLine1}</div>
            )}
            <div className="mt-2">
              <Input
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                label="Address Line 2"
              />
              {errors?.addressLine2 && (
                <div className="error text-red-600">{errors?.addressLine2}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a State</option>
                  <option value="kerala">kerala</option>
                </select>
                {errors?.state && (
                  <div className="error text-red-600">{errors?.state}</div>
                )}
              </div>
              <div className="">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a city</option>
                  {cities &&
                    cities.map((item) => {
                      return (
                        <option value={item.cityName}>{item.cityName}</option>
                      );
                    })}
                </select>
                {errors?.city && (
                  <div className="error text-red-600">{errors?.city}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.startDate && (
                  <div className="error text-red-600">{errors?.startDate}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="startTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Time
                </label>
                <input
                  value={formData.startTime}
                  onChange={handleChange}
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.startTime && (
                  <div className="error text-red-600">{errors?.startTime}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date
                </label>
                <input
                  value={formData.endDate}
                  onChange={handleChange}
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.endDate && (
                  <div className="error text-red-600">{errors?.endDate}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Time
                </label>
                <input
                  value={formData.endTime}
                  onChange={handleChange}
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.endTime && (
                  <div className="error text-red-600">{errors?.endTime}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-6 justify-end">
          <Button onClick={()=>setMode('view')} className="mr-2" size="sm" color="red" variant="outlined">
            Discard
          </Button>
          <Button size="sm" color="green" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEventComponent;
