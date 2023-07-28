import { Button } from "@material-tailwind/react";
import { RegisteredOrganization } from "../../../types/userInterface";

type OrganizerHeroProps = {
  organization: RegisteredOrganization;
};

const OrganizerHero: React.FC<OrganizerHeroProps> = ({ organization }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="md:w-3/4 lg:w-2/4 w-full flex flex-col items-center my-10 md:rounded-xl md:shadow-lg mt-3 md:mt-10">
          <img
            className="h-32 w-32 rounded-full object-cover object-center mt-4 mb-5"
            src= {organization.logo? organization.logo:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="nature image"
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold dark:text-white mb-3">{organization.orgName}</h1>
            <div className="flex mb-3">
                <Button className="mr-2 rounded-sm" size="sm" variant="outlined" color="blue">Follow</Button>
                <Button className="ml-2 rounded-sm" size="sm" color="blue">Contact</Button>
            </div>
            <div className="flex mb-8">
                <div className="flex flex-col items-center px-3 border-r-2">
                    <p>followers count</p>
                    <p>Followers</p>
                </div>
                <div className="flex flex-col items-center px-3 ">
                    <p>Events count</p>
                    <p>Events</p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerHero;
