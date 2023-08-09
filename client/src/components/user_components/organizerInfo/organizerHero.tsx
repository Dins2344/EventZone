import { Button } from "@material-tailwind/react";
import { RegisteredOrganization, RegisteredUserInterface } from "../../../types/userInterface";
import {
  accessChat,
  unFollow,
  addFollowing,
  getUserDetailsById,
} from "../../../api/userAuth/userApis";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../../redux/reducers/userSlice";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getOrganizersAllEvents } from "../../../api/organizer/organizer";
import { RegisteredEventInterface } from "../../../types/organizerInterface";

type OrganizerHeroProps = {
  organization: RegisteredOrganization;
};

const OrganizerHero: React.FC<OrganizerHeroProps> = ({ organization }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [followers, setFollowers] = useState(organization.followers?.length);
  const [events,setEvents]=useState<RegisteredEventInterface[]>()
  const dispatch = useDispatch();
  const user:RegisteredUserInterface = useSelector(selectUser);
  
  useEffect(() => {
    fetchEvents()
  },[])
  useEffect(() => {
    fetchUserInfo();
  }, [isFollowing]);

  const fetchEvents = async () => {
    const data = await getOrganizersAllEvents(organization._id)
    const events = data?.data.data.filter((item:RegisteredEventInterface) => {
      if (item.status === 'approved') {
        return item
      }
    })
    setEvents(events)

  }
  const handleContact = async () => {
    await accessChat(
      organization.ownerId,
      organization.orgName,
      organization.logo
      );
  };
  
  const fetchUserInfo = async () => {
    const user = await getUserDetailsById();
    if (user?.data.data.following.includes(organization._id)) {
      setIsFollowing(true);
    }
    user && dispatch(setUser(user.data.data));
  };

  const handleFollow = async () => {
   
    if (user?.following?.includes(organization._id)) {
      const res = await unFollow(organization._id);
      if (res?.data.response.ok) {
        setIsFollowing(false);
       followers && setFollowers(followers - 1);
        removedNotify();
      }
    } else {
      const res = await addFollowing(organization._id);
      if (res?.data.response.ok) {
        setIsFollowing(true);
       followers && setFollowers(followers + 1);
        addedNotify();
      }
    }
  };
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
      <div className="w-full flex justify-center items-center">
        <div className="md:w-3/4 lg:w-2/4 w-full flex flex-col items-center my-10 md:rounded-xl md:shadow-lg mt-3 md:mt-10">
          <img
            className="h-32 w-32 rounded-full object-cover object-center mt-4 mb-5"
            src={
              organization.logo
                ? organization.logo
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="nature image"
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold dark:text-white mb-3">
            {organization.orgName}
          </h1>
          <div className="flex mb-3">
            <Button
              onClick={handleFollow}
              className="mr-2 rounded-sm"
              size="sm"
              variant="outlined"
              color="blue"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
              onClick={handleContact}
              className="ml-2 rounded-sm"
              size="sm"
              color="blue"
            >
              Contact
            </Button>
          </div>
          <div className="flex mb-8">
            <div className="flex flex-col items-center px-3 border-r-2">
              <p>{followers}</p>
              <p>followers</p>
            </div>
            <div className="flex flex-col items-center px-3 ">
              <p>{events?.length} </p>
              <p>Events</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerHero;
