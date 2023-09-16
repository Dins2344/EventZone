import { useNavigate } from "react-router-dom";
import { RegisteredEventInterface } from "../../types/organizerInterface";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/reducers/userSlice";
import { useEffect, useState } from "react";
import {
  getUserDetailsById,
  likeEvent,
  unLikeEvent,
} from "../../api/userAuth/userApis";


import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heart from "react-animated-heart";

interface EventCardProps {
  approvedEvent: RegisteredEventInterface;
}

const EventCards: React.FC<EventCardProps> = ({ approvedEvent }) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [expired,setExpired] = useState(false)

  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    checkExpiry()
  },[])
  useEffect(() => {
    initialCheck();
  }, [isClick]);

  const checkExpiry = async () => {
    const date = new Date().getTime()
    const eventDate = new Date(approvedEvent.startDate).getTime()
    if (date > eventDate) {
      setExpired(true)
    } else {
      setExpired(false)
    }
  }

  const initialCheck = async () => {
    const data = await getUserDetailsById();
    dispatch(setUser(data?.data.data));
    if (data?.data.data.likedEvents.includes(approvedEvent._id)) {
      setIsClick(true);
    }
  };

  const handleLike = async () => {
    if (user) {
      if (user?.likedEvents?.includes(approvedEvent._id)) {
        const res = await unLikeEvent(approvedEvent._id);
        if (res?.data.response.ok) {
          setIsClick(false);
          unLikeNotify();
        }
      } else {
        const res = await likeEvent(approvedEvent._id);
        if (res?.data.response.ok) {
          setIsClick(true);
          likeNotify();
        }
      }
    } else {
      handleOpen()
    }
  };

  const unLikeNotify = () => {
    toast.warn("Event removed from liked events...!", {
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
  const likeNotify = () => {
    toast.success("Event added to liked events....!", {
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
        key={approvedEvent._id}
        className="xl:w-1/4 lg:w-2/4 px-2 md:w-1/2 w-full mt-2 "
      >
        <Card className="w-full max-w-[26rem] shadow-lg ">
          {expired && (
            <>
              <div className="absolute top-2 left-1 z-50 bg-red-500 rounded-full w-36 ">
                <p className="w-36 text-center text-white">Event got expired</p>
              </div>
            </>
          )}
          <div className="!absolute top-0 right-0 rounded-full w-min h-min z-10">
            <Heart isClick={isClick} onClick={handleLike} />
          </div>
          <div className="">
            <CardHeader className="p-0" floated={false} color="blue-gray">
              <img
                onClick={() => {
                  const id = approvedEvent._id;
                  navigate(`/show-event/?id=${id}`);
                }}
                src={approvedEvent.imageURL[0]}
                alt="ui/ux review check"
              />
              <div className="hover:cursor-pointer to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex flex-col  justify-between">
                <div className="flex justify-between">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-thin"
                  >
                    {approvedEvent.city},{approvedEvent.state}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="flex items-center gap-1.5 font-normal"
                  >
                    <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                    {approvedEvent.avgRating ? approvedEvent.avgRating : 0}
                  </Typography>
                </div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold"
                >
                  {approvedEvent.eventName}
                </Typography>
              </div>
              <div className=" mt-2">
                <Typography color="red">
                  {approvedEvent.startDate}, {approvedEvent.startTime}
                </Typography>
                <Typography className="mt-2">
                  Event type: {approvedEvent.category}
                </Typography>
                {approvedEvent.ticketValue === "free" ? (
                  <Typography>Payment type: free</Typography>
                ) : (
                  <Typography>
                    Ticket fee : {approvedEvent.ticketPrice}
                  </Typography>
                )}
                <Typography className="mt-2">
                  Organized by: {approvedEvent.orgName}
                </Typography>
              </div>
            </CardBody>
          </div>
          <CardFooter className="pt-2">
            <Button
              onClick={() => {
                const id = approvedEvent._id;
                navigate(`/show-event/?id=${id}`);
              }}
              size="lg"
              fullWidth={true}
            >
              Reserve
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EventCards;

export const EventCardsShimmer = () => {
  const array = new Array(8).fill(0);
  return (
    <>
      {array.map((item, index) => {
        return (
          <div
            key={index}
            className="p-3 xl:w-1/4 lg:w-2/4 px-2 md:w-1/2 w-full mt-2"
          >
            <p className="hidden">{item}</p>
            <div
              role="status"
              className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="flex justify-center mt-4 space-x-3">
                <div className="h-10 w-60 bg-gray-200 rounded-md dark:bg-gray-700"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
