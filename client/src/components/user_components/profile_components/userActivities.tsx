import { useEffect, useState } from "react";
import {
  getBookingDetails,
  getLikedEvents,
  getFollowingOrgs,
  getUserDetailsById,
  unLikeEvent,
  likeEvent,
  updateBooking,
} from "../../../api/userAuth/userApis";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Bookings, RegisteredOrganization } from "../../../types/userInterface";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
import { OrganizersCard } from "../body_components/Organizers";
import Heart from "react-animated-heart";
import { selectUser, setUser } from "../../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileActivities: React.FC = () => {
  const [bookings, setBookings] = useState<Bookings[]>();
  const [upComing, setUpComing] = useState<Bookings>();
  const [likedEvents, setLikedEvents] = useState<RegisteredEventInterface[]>();
  const [followingOrgs, setFollowingOrgs] =
    useState<RegisteredOrganization[]>();
  const [updated, setUpdated] = useState<boolean>();

  const navigate = useNavigate();
  useEffect(() => {
    fetchBookingInfo();
    fetchLikedEvents();
    fetchFollowingOrg();
  }, [updated]);
  const fetchLikedEvents = async () => {
    const data = await getLikedEvents();
    if (data?.data.data.likedEvents.length > 0) {
      data && setLikedEvents(data.data.data.likedEvents);
    }
  };
  const fetchFollowingOrg = async () => {
    const data = await getFollowingOrgs();
    data && setFollowingOrgs(data.data.data.following);
  };
  const fetchBookingInfo = async () => {
    const data = await getBookingDetails();
    setBookings(data?.data.data);
    const events = data?.data.data.sort((a: Bookings, b: Bookings) => {
      return (
        new Date(b.event.startDate).getTime() -
        new Date(a.event.startDate).getTime()
      );
    });
    let lastEvent = events[0];
    const currentDate = new Date().getTime();
    events.filter((item: Bookings) => {
      if (
        new Date(item.event.startDate).getTime() >= currentDate &&
        new Date(item.event.startDate).getTime() <
          new Date(lastEvent.startDate).getTime()
      ) {
        lastEvent = item;
      } else {
        lastEvent = false;
      }
    });
    setUpComing(lastEvent);
  };
  useEffect(() => {
    updateBookings();
  }, []);
  const updateBookings = async () => {
    const today = new Date().getTime();
    bookings?.forEach(async (item) => {
      if (today > new Date(item.event.startDate).getTime()) {
        await updateBooking(item._id);
      }
    });
    setUpdated(!updated);
  };
  return (
    <>
      <div className="md:pl-10 pt-2 w-full">
        <h3 className="text-2xl mb-2">Upcoming Event</h3>
        <div className="flex flex-col p-2 border-4 rounded-lg mb-5">
          {upComing ? (
            <div
              key={upComing._id}
              className="flex justify-between h-min mb-2 border"
            >
              <div className="flex">
                <img
                  className=" hidden lg:block md:h-20 p-1 mr-2"
                  src={upComing.event.imageURL[0]}
                  alt="nature image"
                />
                <div className="flex flex-col">
                  <h3 className="md:text-2xl"> {upComing.event.eventName}</h3>
                  <p className="text-sm text-gray-600">
                    on {upComing.event.startDate} at {upComing.event.startTime}{" "}
                  </p>
                  <p className="text-sm text-gray-600">
                    {upComing.event.ticketValue} booking #{upComing._id}
                    <br />
                    booked on : {upComing.bookingTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-2">
                <Button
                  className="h-8"
                  size="sm"
                  variant="outlined"
                  color="gray"
                  onClick={() => {
                    navigate(`/show-booking/?bookingId=${upComing._id}`);
                  }}
                >
                  View more
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center h-20 items-center">
              <h3 className="text-2xl">you don't have any upcoming events</h3>
            </div>
          )}
        </div>

        <div className="w-full mb-5 border-2"></div>

        <h3 className="text-2xl mb-2">Bookings</h3>
        <div className="flex flex-col p-2 border-4 rounded-lg h-80 mb-5 overflow-scroll no-scrollbar">
          {bookings &&
            bookings.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex justify-between h-min mb-2 border"
                >
                  <div className="flex">
                    <img
                      className=" hidden lg:block md:h-20 p-1 mr-2"
                      src={item.event.imageURL[0]}
                      alt="nature image"
                    />
                    <div className="flex flex-col">
                      <h3 className="md:text-2xl"> {item.event.eventName}</h3>
                      <p className="text-sm text-gray-600">
                        on {item.event.startDate} at {item.event.startTime}{" "}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.event.ticketValue} booking #{item._id}
                        <br />
                        booked on : {item.bookingTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex i  tems-center p-2">
                    <Button
                      className="h-8"
                      size="sm"
                      variant="outlined"
                      color="gray"
                      onClick={() => {
                        navigate(`/show-booking/?bookingId=${item._id}`);
                      }}
                    >
                      View more
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="w-full mb-5 border-2"></div>

        <h3 className="text-2xl mb-2">Liked events</h3>
        <div className="flex p-2 border-4 rounded-lg mb-5 overflow-y-scroll no-scrollbar">
          {likedEvents && likedEvents.length > 0 ? (
            likedEvents.map((item) => {
              return <SmallEventCards key={item._id} approvedEvent={item} />;
            })
          ) : (
            <div>No liked events to display.</div>
          )}
        </div>
        <div className="w-full mb-5 border-2"></div>

        <h3 className="text-2xl mb-2">Following organizers</h3>

        <div className="flex p-2 border-4 rounded-lg overflow-y-scroll no-scrollbar">
          {followingOrgs && followingOrgs.length > 0 ? (
            followingOrgs.map((item) => {
              return <OrganizersCard organization={item} />;
            })
          ) : (
            <div>No liked events to display.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileActivities;

interface EventCardProps {
  approvedEvent: RegisteredEventInterface;
}

const SmallEventCards: React.FC<EventCardProps> = ({ approvedEvent }) => {
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
      <div key={approvedEvent._id} className="  px-2  mt-2 ">
        <Card className="w-60 shadow-lg ">
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
              <div className="mb-3 flex flex-col ">
                <div className="flex justify-between">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-thin"
                  >
                    {approvedEvent.city},{approvedEvent.state}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-bold h-14 "
                >
                  {approvedEvent.eventName}
                </Typography>
              </div>
              <div className="">
                <Typography color="red">
                  {approvedEvent.startDate}, {approvedEvent.startTime}
                </Typography>
              </div>
            </CardBody>
          </div>
          <CardFooter className="pt-1">
            <Button
              onClick={() => {
                const id = approvedEvent._id;
                navigate(`/show-event/?id=${id}`);
              }}
              size="lg"
              fullWidth={true}
            >
              View more
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
