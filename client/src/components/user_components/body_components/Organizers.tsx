import { useEffect, useState } from "react";
import { getAllOrganizers } from "../../../api/userAuth/userApis";
import { RegisteredOrganization } from "../../../types/userInterface";

import { OrganizerCardShimmer, OrganizersCard } from "../../common/organizerCards";

const Organizers = () => {
  const [organizations, setOrganizations] =
    useState<RegisteredOrganization[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrganizers = async () => {
    setIsLoading(true)
    const data = await getAllOrganizers();
    setOrganizations(data?.data.data);
    setTimeout(()=>setIsLoading(false),3000)
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  return (
    <>
      <div className=" mt-24  w-full px-20 ">
        <h4 className="text-2xl pl-4 mb-10 font-bold dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 inline-block mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Organizers to follow
        </h4>
        <div className="flex w-full  overflow-x-scroll px-4">
          {organizations && organizations?.length > 0 ? (
            <>
              {isLoading ?
                <>
                  <OrganizerCardShimmer />
                </>
                :
                <>
              {organizations.map((item) => {
                return <OrganizersCard key={item._id} organization={item} />;
              })}
                </>
              }
            </>
          ) : (
            <h4 className="text-2xl md:text-4xl">
              Apologies, but it seems that there are currently no organizers
              available.
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Organizers;
