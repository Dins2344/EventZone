import { Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  addAddress,
  addProfileContactInfo,
  getAddressInfo,
  getUserDetailsById,
} from "../../../api/userAuth/userApis";
import { RegisteredUserInterface } from "../../../types/userInterface";
import SpinnerComponent from "../../common/Spinner";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";

const ContactInfo: React.FC = () => {
  const [address, setAddress] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [changeDp, setChangeDp] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [userData, setUserData] = useState<RegisteredUserInterface>();
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phoneNumber: userData?.phoneNumber || "",
    website: userData?.website || "",
    images: [] || "",
    profileImage: userData?.profileImage,
  });
  const [profilePicture, setProfilePicture] = useState<File | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    const data = await getUserDetailsById();
    if (data) {
      const userData: RegisteredUserInterface = data.data.data;
      setUserData(userData);
      const editableUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        website: userData.website,
        profileImage: userData?.profileImage,
        images: [],
      };
      setFormData(editableUser);
      userData && dispatch(setUser(userData));
      setDataFetched(true);
    }
  };
  useEffect(() => {
    fetchUserInfo();
    setChangeDp(false);
  }, [updated]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(10).min(3).required("First name is required"),
    lastName: Yup.string().max(10).min(3).required("Last name is required"),
    phoneNumber: Yup.string()
      .max(10)
      .min(10)
      .required("Phone number is required"),
    website: Yup.string().url("Invalid website URL"),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]; // Get the first selected file (if any)
    setProfilePicture(file);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // Your form submission logic goes here
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("phoneNumber", formData.phoneNumber);
        data.append("website", formData.website);
        if (profilePicture) {
          const images = [profilePicture];
          images.forEach((image, index) => {
            data.append(`images`, image, `images${index}`);
          });
        }
        setIsLoading(true);
        const res = await addProfileContactInfo(data);
        setErrors({});
        if (res?.data.ok) {
          console.log(res.data);
          setUpdated(!updated);
          setIsLoading(false);
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
    <div className="px-5 md:px-10 lg:px-40 mt-5">
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          <h3 className="font-semibold text-sm md:text-lg lg:text-xl">
            Account Information
          </h3>
          {dataFetched && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-full md:w-1/2 md:px-3">
                  <h5 className="mt-5 mb-5">Profile Photo</h5>
                  {!changeDp ? (
                    <div className="w-56 h-56 flex flex-col items-center  ">
                      <div className="flex flex-col items-center w-40-h-40 rounded-full overflow-hidden">
                        <img
                          className="rounded-full h-56  object-cover"
                          src={formData.profileImage}
                          alt="image description"
                        />
                        <Button
                          size="sm"
                          variant="gradient"
                          className=" w-48  -mt-16"
                          color="blue-gray"
                          onClick={() => setChangeDp(true)}
                        >
                          Change profile picture
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {profilePicture ? (
                        <div className="w-56 h-56 flex flex-col items-center  ">
                          <div className="flex flex-col items-center w-40-h-40 rounded-full overflow-hidden">
                            <img
                              className="rounded-full h-56  object-cover"
                              src={URL.createObjectURL(profilePicture)}
                              alt="image description"
                            />
                            <Button
                              size="sm"
                              variant="gradient"
                              className=" w-48  -mt-16"
                              color="blue-gray"
                              onClick={() => setChangeDp(true)}
                            >
                              Change profile picture
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-56 h-56">
                          <label
                            htmlFor="profilePicture"
                            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center ">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            </div>
                            <input
                              type="file"
                              id="profilePicture"
                              name="profilePicture"
                              onChange={handleProfilePictureChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col w-full md:w-1/2 md:px-3">
                  <h5 className="mt-5 mb-5">Contact Information</h5>
                  <div className="flex mb-4">
                    <div className="w-1/2 pr-3">
                      <Input
                        type="text"
                        name="firstName"
                        value={formData?.firstName}
                        onChange={handleChange}
                        label="First name"
                      />
                      {errors.firstName && (
                        <div className="error text-red-600">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 pl-3">
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        label="Last name"
                      />
                      <div className="error text-red-600">
                        {errors.lastName}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 pr-3">
                      <Input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        label="Phone number"
                      />
                      <div className="error text-red-600">
                        {errors.phoneNumber}
                      </div>
                    </div>
                    <div className="w-1/2 pl-3">
                      <Input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        label="Website link"
                      />
                      <div className="error text-red-600">{errors.website}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:pr-3 mt-3">
                <Button
                  className="md:ml-3"
                  size="sm"
                  onClick={() => setAddress(!address)}
                >
                  Add address
                </Button>
                <Button
                  type="submit"
                  color="red"
                  size="sm"
                  className="h-8 w-24"
                >
                  Save
                </Button>
              </div>
            </form>
          )}
          {address && <AddressForm />}
        </>
      )}
    </div>
  );
};

export default ContactInfo;

export interface AddressFormData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  pin: string;
  state: string;
  wAddressLine1: string;
  wAddressLine2: string;
  wCity: string;
  wCountry: string;
  wPin: string;
  wState: string;
}

const AddressForm: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    pin: "",
    state: "",
    wAddressLine1: "",
    wAddressLine2: "",
    wCity: "",
    wCountry: "",
    wPin: "",
    wState: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const data = await getAddressInfo();
    if (data?.data.ok) {
      const address = data?.data.data;
      setFormData(address);
    }
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string().required("Address line 1 is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    pin: Yup.string().required("Pin is required"),
    state: Yup.string().required("State is required"),
    wAddressLine1: Yup.string().required("Address line 1 is required"),
    wAddressLine2: Yup.string(),
    wCity: Yup.string().required("City is required"),
    wCountry: Yup.string().required("Country is required"),
    wPin: Yup.string().required("Pin is required"),
    wState: Yup.string().required("State is required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // Your form submission logic goes here
        setErrors({});
        const res = await addAddress(formData);
        if (res) {
          setIsLoading(false);
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
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="flex flex-col w-full md:w-1/2 md:mt-3 md:px-3">
              <h5 className="mt-5 mb-5">Home Address</h5>
              <div className="w-full mb-3">
                <Input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  label="Address line 1"
                />
                {errors?.addressLine1 && (
                  <div className="error text-red-600">
                    {errors?.addressLine1}
                  </div>
                )}
              </div>
              <div className="w-full mb-3">
                <Input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  label="Address line 2"
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-3">
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    label="City"
                  />
                  {errors?.city && (
                    <div className="error text-red-600">{errors?.city}</div>
                  )}
                </div>
                <div className="w-1/2 pl-3">
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    label="Country"
                  />
                  {errors?.country && (
                    <div className="error text-red-600">{errors?.country}</div>
                  )}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-3">
                  <Input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    label="Pin"
                  />
                  {errors?.pin && (
                    <div className="error text-red-600">{errors?.pin}</div>
                  )}
                </div>
                <div className="w-1/2 pl-3">
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    label="State"
                  />
                  {errors?.state && (
                    <div className="error text-red-600">{errors?.state}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:mt-3 md:px-3">
              <h5 className="mt-5 mb-5">Work Address</h5>
              <div className="w-full mb-3">
                <Input
                  type="text"
                  name="wAddressLine1"
                  value={formData.wAddressLine1}
                  onChange={handleChange}
                  label="Address line 1"
                />
                {errors?.wAddressLine1 && (
                  <div className="error text-red-600">
                    {errors?.wAddressLine1}
                  </div>
                )}
              </div>
              <div className="w-full mb-3">
                <Input
                  type="text"
                  name="wAddressLine2"
                  value={formData.wAddressLine2}
                  onChange={handleChange}
                  label="Address line 2"
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-3">
                  <Input
                    type="text"
                    name="wCity"
                    value={formData.wCity}
                    onChange={handleChange}
                    label="City"
                  />
                  <div className="error text-red-600">{errors?.wCity}</div>
                </div>
                <div className="w-1/2 pl-3">
                  <Input
                    name="wCountry"
                    value={formData.wCountry}
                    onChange={handleChange}
                    label="Country"
                  />
                  <div className="error text-red-600">{errors?.wCountry}</div>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-3">
                  <Input
                    name="wPin"
                    value={formData.wPin}
                    onChange={handleChange}
                    label="Pin"
                  />
                  <div className="error text-red-600">{errors?.wPin}</div>
                </div>
                <div className="w-1/2 pl-3">
                  <Input
                    name="wState"
                    value={formData.wState}
                    onChange={handleChange}
                    label="State"
                  />
                  <div className="error text-red-600">{errors?.wState}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end md:pr-3 mt-3 ">
            <Button
              type="submit"
              color="red"
              size="sm"
              className="h-8 w-full md:w-24"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
