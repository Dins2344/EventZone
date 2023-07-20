import { useState } from "react";
import ContactInfo from "../../../components/user_components/profile_components/contactInfo";
import ChangeEmail from "../../../components/user_components/profile_components/changeEmail";


const EditProfile: React.FC = () => {
  const [menu, setMenu] = useState("");
  const handleMenu = (option: string) => {
    setMenu(option);
  };
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="w-full  bg-blue-gray-50 px-5 md:px-10 lg:px-40">
          <div className="flex h-10 md:h-20 w-full items-center justify-between">
            <h4
              onClick={() => handleMenu("contactInfo")}
              className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3"
            >
              Account info
            </h4>
            <h4
              onClick={() => handleMenu("changeEmail")}
              className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3"
            >
              Change email
            </h4>
            <h4
              onClick={() => handleMenu("changePassword")}
              className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3"
            >
              Change password
            </h4>

            <h4
              onClick={() => handleMenu("closeAcc")}
              className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3"
            >
              Close account
            </h4>
          </div>
        </div>
        <div>{menu === "contactInfo" && <ContactInfo />}</div>
        <div>{menu === 'changeEmail' && <ChangeEmail />}</div>
      </div>
    </>
  );
};

export default EditProfile;
