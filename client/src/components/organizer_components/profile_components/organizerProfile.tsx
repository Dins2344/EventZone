import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getUsersOrganizations } from "../../../api/organizer/organizer";
import { OrganizationInterface } from "../../../types/organizerInterface";
import AddOrganizationModal from "./addOrganizationModal";
import { useNavigate } from "react-router-dom";

const OrganizerProfile: React.FC = () => {
  const [organizations, setOrganizations] = useState<OrganizationInterface[]>();
  const [updated,setUpdated] = useState(false)
  const navigate = useNavigate()

  const fetchOrganizations = async () => {
    const data = await getUsersOrganizations();
    setOrganizations(data.data.data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, [updated]);
  return (
    <>
      <h2 className="text-4xl font-extrabold text-black mt-10">
        Organization Settings
      </h2>
      <h3 className="text-2xl  text-black mt-10">Organizer profiles</h3>
      <p className="text-sm">
        Each profile describes a unique organizer and shows all of their events
        on one page. Having a complete profile can encourage attendees to follow
        you.
      </p>
      <div className="flex justify-end mt-10">
        <AddOrganizationModal updated = {updated} setUpdated = {setUpdated} />
      </div>

      <div className="flex flex-col mt-2 w-full">
        {organizations &&
          organizations.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-wrap justify-between w-full my-2 px-4 py-2 border border-gray-300 rounded-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item.logo ? item.logo : 'https://img.freepik.com/free-icon/user_318-159711.jpg'}
                    alt="https://img.freepik.com/free-icon/user_318-159711.jpg"
                    className="w-16 h-16 rounded-full"
                  ></img>
                  <p className="ml-3">{item.orgName}</p>
                </div>
                <div className="flex items-center">
                  <Button onClick={()=>{
                    navigate(`/organization/settings/edit-organization/?id=${item._id}`)
                  }} color="red" className="rounded-sm">
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrganizerProfile;
