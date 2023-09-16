import { Button, Dialog, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import {
  CompleteReviewData,
  EventDetailsInterface,
} from "../../../types/userInterface";
import {
  // lazy,
  // Suspense,
  useEffect,
  useState
} from "react";
import { addFollowing, getReview, getUserDetailsById, unFollow } from "../../../api/userAuth/userApis";
import { Avatar } from "@material-tailwind/react";
import StartRating from "../profile_components/starRating";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

// const VideoPlayer = lazy(() => import("./youtube"));

export type EventData = {
  _id: string;
  eventName: string;
  organizer: string;
  category: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  imageURL: string[];
  status: string;
  orgOwnerId: string;
  orgName: string;
  __v: number;
  description: string;
  videoURL: string;
  eventCapacity: number;
  ticketPrice: number;
  ticketValue: string;
  registeredTime: string;
  organizerInfo: {
    _id: string;
    userId: string;
    orgName: string;
    orgType: string;
    ownerId: string;
    admin: string[];
    __v: number;
  };
};

type EventDetailsProps = {
  event: EventDetailsInterface;
};
const EventInfo: React.FC<EventDetailsProps> = ({ event }) => {
  const [reviews, setReviews] = useState<CompleteReviewData[]>();
  const [expiry,setExpiry] = useState(false)
  // const youtubeVideoUrl = event?.videoURL;
  // const videoId = youtubeVideoUrl?.split("v=")[1];

  useEffect(() => {
    fetchEventReviews();
    checkExpiry()
  }, []);

  const checkExpiry = () => {
    const currDate = new Date().getTime()
    const eventDate = new Date(event.startDate).getTime()
    if (currDate > eventDate) {
      setExpiry(true)
    }
  }

  const fetchEventReviews = async () => {
    const data = await getReview(event._id);
    setReviews(data?.data.data.reviews);
  };
  return (
    <>
      <div className=" mt-5 mb-10">
        <div className="flex flex-col">
          <p className="font-bold text-red-500">Date : {event?.startDate} {expiry && <>Expired</> }</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {event?.eventName}
          </h1>
          <div className="flex flex-col mt-8">
            <h3 className="text-3xl font-bold dark:text-white block">
              When & Where
            </h3>
            <div className="flex flex-wrap mt-5">
              <div className="flex flex-col w-full md:w-1/2 p-5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>

                  <h5 className="text-xl font-bold dark:text-white mb-3">
                    Date & Time
                  </h5>
                </div>
                <p className="mb-3">
                  Start time: {event?.startDate} {event?.startTime}
                </p>
                <p>
                  End time: {event?.endDate} {event?.endTime}
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/2 p-5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <h5 className="text-xl font-bold dark:text-white mb-3">
                    Location
                  </h5>
                </div>
                <p className="mb-3">
                  {event?.addressLine1} {event?.addressLine2}
                </p>
                <p>
                  {event?.city},{event?.state}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-3xl font-bold dark:text-white block ">
              About this event
            </h3>
            <div className="flex flex-col">
              <h5 className="text-xl font-bold dark:text-white mt-3 mb-3">
                Reviews ({reviews?.length ? reviews.length : "0"})
              </h5>
              {reviews?.length ? (
                <>
                  <div className="w-full flex flex-col max-h-60 border-2 p-2">
                    {reviews?.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="flex flex-col border p-2"
                        >
                          <div className="flex">
                            <StartRating rating={item.rating} />
                            <p className="ml-2">{item.rating} stars</p>
                          </div>
                          <p className="mb-2">{item.comment}</p>
                          <div className="flex">
                            <Avatar
                              className="w-7 h-7"
                              size="sm"
                              src={item && item?.userId?.profileImage}
                            ></Avatar>
                            <p className="ml-2 ">
                              {item.userId.firstName} {item.userId.lastName}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div  className="flex flex-col border p-2 h-16 justify-center">
                   <h3>No one have reviewed yet....!</h3>
                  </div>
                </>
              )}
              <h5 className="text-xl font-bold dark:text-white mt-3 mb-3">
                Event description
              </h5>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {event?.description}
              </p>
              <h5 className="text-xl font-bold dark:text-white mt-3 mb-3">
                Agenda
              </h5>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {event?.agenda}
              </p>
              <p>
                event category:{" "}
                <span className="mb-3 text-gray-500 dark:text-gray-400">
                  {event?.category}
                </span>
              </p>
              <p>
                event capacity:{" "}
                <span className="mb-3 text-gray-500 dark:text-gray-400">
                  {event?.eventCapacity}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="mt-3 overflow-scroll no-scrollbar">
            <Suspense>
              <VideoPlayer videoId={videoId} />
            </Suspense>
          </div> */}
          
          <OrganizerInfo event={event} />
        </div>
      </div>
    </>
  );
};

export default EventInfo;

type OrganizerInfoProps = {
  event: EventDetailsInterface;
};
const OrganizerInfo: React.FC<OrganizerInfoProps> = ({ event }) => {
  const [followed, setFollowed] = useState<boolean>();
  const [followers, setFollowers] = useState<number>(event.organizerInfo.followers.length)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  
  const organization = event.organizerInfo;
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const token = localStorage.getItem('token')
  useEffect(() => {
    setFollow();
  }, []);
  
  const setFollow = async () => {
    if (user) {
      const data = await getUserDetailsById();
      if (data?.data.data.following.includes(event.organizer)) {
        setFollowed(true);
      }
    } else {
      setFollowed(false)
   }
  };
  
  const handleFollow = async (orgId: string) => {
    if (!token) {
      handleOpen()
    } else {
      const res = await addFollowing(orgId);
      if (res?.data.response.ok) {
        setFollowed(true);
        setFollowers(followers+1)
        addedNotify();
      }
    }
  };

  const handleUnfollow = async (orgId: string) => {
     const res = await unFollow(orgId);
     if (res?.data.response.ok) {
       setFollowed(false);
       setFollowers(followers -1)
       removedNotify();
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
          <Button size="sm" onClick={() => {
            navigate("/register/user-login");
          }}>
            lets login
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="flex flex-col mt-8">
        <h3 className="text-3xl  font-bold dark:text-white block mb-3">
          About the organizer
        </h3>
        <div className="flex flex-col place-items-center border mt-3 rounded-md shadow-md p-5">
          <img
            className="rounded-full w-20 h-20 mb-5 mt-10"
            src={
              organization.logo
                ? organization.logo
                : "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }
            alt="image description"
          />
          <p>Organized by</p>
          <h3 className="text-3xl mb-5 font-bold dark:text-white">
            {organization?.orgName}
          </h3>
          <p>{followers}</p>
          <p className="font-bold mb-4">Followers</p>
          <div className="flex mt-3">
            <Button
              className="mr-3"
              size="sm"
              color="blue"
              variant="outlined"
              onClick={() => {
                token ?
                navigate(`/show-organizer/?id=${event.organizer}`)
                :
                handleOpen()
              }}
            >
              View
            </Button>
            {followed ? (
              <Button onClick={() => handleUnfollow(event.organizer)} size="sm">
                Unfollow
              </Button>
            ) : (
                <Button onClick={() => {
                    handleFollow(event.organizer)
                }} size="sm">
              
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
