import { lazy,Suspense, useEffect, useState } from "react";
// import ContactInfo from "../../../components/user_components/profile_components/contactInfo";
import ChangeEmail from "../../../components/user_components/profile_components/changeEmail";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../../components/user_components/profile_components/changePassword";


const ContactInfo = lazy(
  () =>
    import("../../../components/user_components/profile_components/contactInfo")
);

const EditProfile: React.FC = () => {
  const [menu, setMenu] = useState("contactInfo");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setToken(token);
    if (!token) {
      navigate("/");
    }
  }, []);
  const handleMenu = (option: string) => {
    setMenu(option);
  };
  return (
    <>
      {token && (
        <div className="w-full min-h-screen">
          <div className="w-full  bg-blue-gray-50 px-5 md:px-10 lg:px-40">
            <div className="flex h-10 md:h-20 w-full items-center justify-between">
              <h4
                onClick={() => handleMenu("contactInfo")}
                className={`text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3 ${
                  menu === "contactInfo" && "bg-blue-gray-500"
                } `}
              >
                Account info
              </h4>
              <h4
                onClick={() => handleMenu("changeEmail")}
                className={`text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3 ${
                  menu === "changeEmail" && "bg-blue-gray-500"
                }`}
              >
                Change email
              </h4>
              <h4
                onClick={() => handleMenu("changePassword")}
                className={`text-sm md:text-lg lg:text-xl md:font-bold dark:text-white hover:cursor-pointer hover:bg-blue-gray-600 rounded-md p-3 ${
                  menu === "changePassword" && "bg-blue-gray-500"
                }`}
              >
                Change password
              </h4>
            </div>
          </div>
          <div>
            {menu === "contactInfo" && (
              <Suspense>
                <ContactInfo />
              </Suspense>
            )}
          </div>
          <div>{menu === "changeEmail" && <ChangeEmail />}</div>
          <div>{menu === "changePassword" && <ChangePassword />}</div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
