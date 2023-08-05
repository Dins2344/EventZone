import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  getAllApprovedEvents,
  getUserDetailsById,
  likeEvent,
  unLikeEvent,
} from "../../../api/userAuth/userApis";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
import { useNavigate } from "react-router-dom";
import Heart from "react-animated-heart";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoreEvents = () => {
  const [approvedEvents, setApprovedEvents] =
    useState<RegisteredEventInterface[]>();

  const fetchEvents = async () => {
    const data = await getAllApprovedEvents();
    setApprovedEvents(data?.data.data);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <div className=" mt-24  w-full px-5 md:px-20">
        <h4 className="text-2xl pl-4 mb-10 font-bold dark:text-white">
          More events for you
        </h4>
        {approvedEvents?.length === 0 ? (
          <>
            <div className="w-full flex justify-center h-80 items-center">
              <h4 className="text-2xl md:text-4xl">
                Apologies, but it seems that there are currently no events
                available.
              </h4>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap ">
            {approvedEvents &&
              approvedEvents.map((item) => {
                return <EventCards approvedEvent={item} />;
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default MoreEvents;

interface EventCardProps {
  approvedEvent: RegisteredEventInterface;
}

export const EventCards: React.FC<EventCardProps> = ({ approvedEvent }) => {
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
    if (user.likedEvents.includes(approvedEvent._id)) {
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
                    {approvedEvent.avgRating?approvedEvent.avgRating:0}
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
