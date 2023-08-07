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
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    initialCheck();
  }, [isClick]);

  const initialCheck = async () => {
    const data = await getUserDetailsById();
    dispatch(setUser(data?.data.data));
    if (data?.data.data.likedEvents.includes(approvedEvent._id)) {
      setIsClick(true);
    }
  };

  const handleLike = async () => {
    if (user) {
      if (user?.likedEvents.includes(approvedEvent._id)) {
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
          <div key={index} className="p-3">
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
              <div className="flex items-center mt-4 space-x-3">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
