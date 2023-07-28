import { useEffect, useState } from "react";
import { getAllOrganizers } from "../../../api/userAuth/userApis";
import { RegisteredOrganization } from "../../../types/userInterface";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Organizers = () => {
  const [organizations, setOrganizations] =
    useState<RegisteredOrganization[]>();

  const fetchOrganizers = async () => {
    const data = await getAllOrganizers();
    setOrganizations(data?.data.data);
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  return (
    <>
      <div className=" mt-24  w-full px-20 ">
        <h4 className="text-2xl pl-4 mb-10 font-bold dark:text-white">
          Organizers to follow
        </h4>
        <div className="flex w-full  overflow-x-scroll px-4+">
          {organizations && <OrganizersCard organizations={organizations} />}
        </div>
      </div>
    </>
  );
};

export default Organizers;

type OrganizersProps = {
  organizations: RegisteredOrganization[];
};

const OrganizersCard: React.FC<OrganizersProps> = ({ organizations }) => {
  const navigate = useNavigate()
  return (
    <>
      {organizations.map((item) => {
        return (
            <div key={item._id} className=" px-5 w-64 mr-3 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col w-full items-center mt-10 pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src= {item.logo? item.logo:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {item.orgName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Followers count
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <Button size="sm">Follow</Button>
                  <Button onClick={() => {
                        const id = item._id;
                        navigate(`/show-organizer/?id=${id}`);
                      }} size="sm" variant="outlined">View</Button>
                </div>
              </div>
            </div>
        );
      })}
    </>
  );
};
