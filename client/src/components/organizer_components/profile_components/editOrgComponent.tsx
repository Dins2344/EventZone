import { useEffect, useState } from "react";
import { getOrganizationDetails } from "../../../api/organizer/organizer";
import { RegisteredOrganization } from "../../../types/userInterface";
import { Button, Input } from "@material-tailwind/react";
import { getOwnerDetails } from "../../../api/organizer/organizer";
import { RegisteredUserInterface } from "../../../types/userInterface";

const EditOrgComponent: React.FC = () => {
  const [organization, setOrganizations] = useState<RegisteredOrganization>();
  const [changeLogo, setChangeLogo] = useState(false);
  const [owner,setOwner] = useState<RegisteredUserInterface>()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    id && fetchOrganization(id);
  }, []);

  useEffect(()=>{
  organization && fetchOrgOwner(organization?.ownerId)
  },[organization])

  const fetchOrgOwner= async (ownerId:string)=>{
    const data = await getOwnerDetails(ownerId)
    console.log(data)
    setOwner(data?.data.data)
  }


  const fetchOrganization = async (id: string) => {
    const data = await getOrganizationDetails(id);
    setOrganizations(data.data.data);
  };


  return (
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
      <div className="flex flex-wrap mt-5">
        <div className="flex flex-col md:w-1/2 w-full ">
          <h5 className="mt-5 mb-5">Organization Logo</h5>
          {!changeLogo ? (
            <div className="flex flex-col w-52 items-center">
              <img
                className="rounded-full w-52 h-52"
                src="https://img.freepik.com/free-icon/user_318-159711.jpg"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  //   onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-col md:w-1/2 w-full">
          <h5 className="mt-5 mb-5">Organization Info</h5>
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <Input label="Username" />
              </div>
              <div className="w-full md:w-1/2">
                
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrgComponent;
