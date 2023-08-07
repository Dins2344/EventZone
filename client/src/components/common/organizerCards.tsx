import { useEffect, useState } from "react";
import { RegisteredOrganization } from "../../types/userInterface";
import { addFollowing, getUserDetailsById, unFollow } from "../../api/userAuth/userApis";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type OrganizersProps = {
  organization: RegisteredOrganization;
};

export const OrganizersCard: React.FC<OrganizersProps> = ({ organization }) => {
  const [followed, setFollowed] = useState<boolean>();

  useEffect(() => {
    setFollow();
  }, []);

  const setFollow = async () => {
    const data = await getUserDetailsById();
    if (data?.data.data.following.includes(organization._id)) {
      setFollowed(true);
    }
  };

  const handleFollow = async (orgId: string) => {
    const res = await addFollowing(orgId);
    console.log(res?.data);
    if (res?.data.response.ok) {
      setFollowed(true);
      addedNotify();
    }
  };

  const handleUnfollow = async (orgId: string) => {
    const res = await unFollow(orgId);
    if (res?.data.response.ok) {
      setFollowed(false);
      removedNotify();
    }
  };

  const navigate = useNavigate();

  const removedNotify = () => {
    toast.warn("You will no longer receive updates from the organizer...!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const addedNotify = () => {
    toast.success("You will receive updates from the organizer....!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        key={organization._id}
        className=" px-5 w-64 mr-3 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex flex-col w-full items-center mt-10 pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={
              organization.logo
                ? organization.logo
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {organization.orgName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Followers count
          </span>
          <div className="flex justify-between mt-4 space-x-3 w-48 md:mt-6">
            {followed ? (
              <Button
                onClick={() => handleUnfollow(organization._id)}
                size="sm"
              >
                Unfollow
              </Button>
            ) : (
              <Button onClick={() => handleFollow(organization._id)} size="sm">
                Follow
              </Button>
            )}
            <Button
              onClick={() => {
                const id = organization._id;
                navigate(`/show-organizer/?id=${id}`);
              }}
              size="sm"
              variant="outlined"
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const OrganizerCardShimmer: React.FC = () => {
    const array = new Array(10).fill(0)
    return (
        <>
            {array.map((v, i) => {
                return (
                  <div className="p-3">
                    <div className="w-52 h-64 border-2 rounded-md border-gray-300 animate-pulse flex flex-col items-center">
                      <div className="rounded-full w-20 h-20 bg-gray-300 mt-10"></div>
                      <div className="w-20 h-4 bg-gray-300 mt-2"></div>
                      <div className="w-14 h-3 bg-gray-300 mt-1"></div>
                      <div className="flex justify-between w-full px-2 mt-12">
                        <div className="w-20 h-8 bg-gray-300"></div>
                        <div className="w-20 h-8 bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                );
            })}
        </>
    )
}
