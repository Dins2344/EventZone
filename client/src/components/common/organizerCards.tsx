import { useEffect, useState } from "react";
import { RegisteredOrganization } from "../../types/userInterface";
import {
  addFollowing,
  getUserDetailsById,
  unFollow,
} from "../../api/userAuth/userApis";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";

type OrganizersProps = {
  organization: RegisteredOrganization;
};

export const OrganizersCard: React.FC<OrganizersProps> = ({ organization }) => {
  const [followed, setFollowed] = useState<boolean>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const user = useSelector(selectUser);

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
    if (user) {
      const res = await addFollowing(orgId);
      if (res?.data.response.ok) {
        setFollowed(true);
        addedNotify();
      }
    } else {
      handleOpen();
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
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You should login...!
          </Typography>
          <Typography className="text-center font-normal">
            You should have to login to explore more features
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button size="sm" variant="text" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              navigate("/register/user-login");
            }}
          >
            lets login
          </Button>
        </DialogFooter>
      </Dialog>
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
  const array = new Array(10).fill(0);
  return (
    <>
      {array.map((v, i) => {
        return (
          <div key={i} className="p-3">
            <p className="hidden">{v}</p>
            <div className="w-52 h-64 border-2 rounded-md border-gray-300 animate-pulse flex flex-col items-center">
              <div className="rounded-full w-20 h-20 bg-gray-300 mt-10"></div>
              <div className="w-20 h-4 bg-gray-300 mt-2 rounded-md"></div>
              <div className="w-14 h-3 bg-gray-300 mt-1 rounded-md"></div>
              <div className="flex justify-between w-full px-2 mt-12">
                <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
                <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
