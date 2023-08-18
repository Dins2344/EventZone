import { useEffect, useState } from "react";
import {
  getOrganizationDetails,
  updateOrganizationInfo,
} from "../../../api/organizer/organizer";
import { RegisteredOrganization } from "../../../types/userInterface";
import { Button, Input } from "@material-tailwind/react";
import { getOwnerDetails } from "../../../api/organizer/organizer";
import { RegisteredUserInterface } from "../../../types/userInterface";
import { getAllOrgCategories } from "../../../api/organizer/organizer";
import { OrganizationCategoriesInterface } from "../../../types/adminInterface";
import * as Yup from "yup";
import SpinnerComponent from "../../common/Spinner";

const EditOrgComponent: React.FC = () => {
  const [organization, setOrganizations] = useState<RegisteredOrganization>();
  const [changeLogo, setChangeLogo] = useState(false);
  const [owner, setOwner] = useState<RegisteredUserInterface>();
  const [orgCategories, setOrgCategories] =
    useState<OrganizationCategoriesInterface[]>();
  const [formData, setFormData] = useState<RegisteredOrganization>({
    _id: "",
    userId: "",
    orgName: "",
    orgType: "",
    admin: [],
    ownerId: "",
    __v: 0,
    logo: "",
    country: "",
  });
  const [logo, setLogo] = useState<File | undefined>(undefined);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    id && fetchOrganization(id);
    fetchOrganizationCategories();
    setChangeLogo(false);
  }, [updated]);

  useEffect(() => {
    organization && fetchOrgOwner(organization?.ownerId);
  }, [organization]);

  const fetchOrgOwner = async (ownerId: string) => {
    const data = await getOwnerDetails(ownerId);
    console.log(data);
    setOwner(data?.data.data);
  };

  const fetchOrganization = async (id: string) => {
    const data = await getOrganizationDetails(id);
    console.log(data.data.data);
    setOrganizations(data?.data.data);
    setFormData(data?.data.data);
  };

  const fetchOrganizationCategories = async () => {
    const data = await getAllOrgCategories();
    console.log(data?.data);
    setOrgCategories(data?.data.data);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file (if any)
    setLogo(file);
  };

  const validationSchema = Yup.object().shape({
    orgName: Yup.string().required("Organization name is required"),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        // Your form submission logic goes here
        const data = new FormData();
        data.append("orgName", formData.orgName);
        data.append("orgType", formData.orgType);
        data.append("country", formData.country);
        data.append("_id", formData._id);
        if (logo) {
          const images = [logo];
          images.forEach((image, index) => {
            data.append(`images`, image, `images${index}`);
          });
        }
        console.log(formData);
        setIsLoading(true);
        const res = await updateOrganizationInfo(data);
        setErrors({});
        if (res?.data.ok) {
          setIsLoading(false);
          setUpdated(!updated);
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
        <>
          <h2 className="text-4xl font-extrabold text-black mt-10">
            Organization Settings
          </h2>
          <h3 className="text-2xl  text-black mt-10">
            {organization?.orgName} Organization
          </h3>
          <h3 className="text-xl  text-black mt-10">
            Owner : {owner && owner.firstName} {owner && owner.lastName}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-5">
              <div className="flex flex-col md:w-1/2 w-full ">
                <h5 className="mt-5 mb-5">Organization Logo</h5>
                {!changeLogo ? (
                  <div className="flex flex-col w-52 items-center">
                    <img
                      className="rounded-full w-52 h-52"
                      src={
                        formData.logo
                          ? formData.logo
                          : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                      }
                      alt="image description"
                    />
                    <Button
                      onClick={() => {
                        setChangeLogo(true);
                      }}
                      size="sm"
                      variant="outlined"
                      color="gray"
                      className="mt-3"
                    >
                      Change Logo
                    </Button>
                  </div>
                ) : (
                  <>
                    {logo ? (
                      <div className="flex flex-col w-52 items-center">
                        <img
                          className="rounded-full w-52 h-52"
                          src={URL.createObjectURL(logo)}
                          alt="image description"
                        />
                        <Button
                          onClick={() => {
                            setChangeLogo(true);
                          }}
                          size="sm"
                          variant="outlined"
                          color="gray"
                          className="mt-3"
                        >
                          Change Logo
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-52 h-52">
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
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col md:w-1/2 w-full">
                <h5 className="mt-5 mb-5">Organization Info</h5>
                <div className="flex flex-col">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 lg:pr-3">
                      <Input
                        onChange={handleChange}
                        label="Organization name"
                        value={formData.orgName}
                        name="orgName"
                      />
                      {errors.orgName && (
                        <div className="error text-red-600">
                          {errors.orgName}
                        </div>
                      )}
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-3 mt-3 lg:mt-0">
                      <select
                        onChange={handleChange}
                        name="orgType"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={formData?.orgType} selected>
                          {formData?.orgType}
                        </option>
                        {orgCategories &&
                          orgCategories.map((item) => {
                            return (
                              <option value={item.categoryName}>
                                {item.categoryName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-3 lg:pr-3">
                    <div className="w-full lg:w-1/2">
                      <select
                        onChange={handleChange}
                        name="country"
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {formData.country ? (
                          <option value={formData.country} selected>
                            {formData.country}
                          </option>
                        ) : (
                          <option selected>Choose a country</option>
                        )}
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button type="submit" color="red" size="sm">
                Save
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditOrgComponent;
