import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  StarIcon,
  HeartIcon,
  WifiIcon,
  HomeIcon,
  TvIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getAllApprovedEvents } from "../../../api/userAuth/userApis";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
import { useNavigate } from "react-router-dom";

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
        <Cards approvedEvents={approvedEvents} />
      </div>
    </>
  );
};

export default MoreEvents;

interface CardProps {
  approvedEvents?: RegisteredEventInterface[];
}

const Cards: React.FC<CardProps> = ({ approvedEvents }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap">
        {approvedEvents &&
          approvedEvents.map((item) => {
            return (
              <>
                <div className="lg:w-1/4 px-2 md:w-1/2 w-full mt-2 ">
                  <Card className="w-full max-w-[26rem] shadow-lg ">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        const id = item._id;
                        navigate(`/show-event/?id=${id}`);
                      }}
                    >
                      <CardHeader className="p-0" floated={false} color="blue-gray">
                        <img src={item.imageURL[0]} alt="ui/ux review check" />
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                        <IconButton
                          size="sm"
                          color="red"
                          variant="text"
                          className="!absolute top-4 right-4 rounded-full"
                        >
                          <HeartIcon className="h-6 w-6" />
                        </IconButton>
                      </CardHeader>
                      <CardBody>
                        <div className="mb-3 flex flex-col  justify-between">
                          <div className="flex justify-between">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-thin"
                            >
                              {item.city},{item.state}
                            </Typography>
                            <Typography
                              color="blue-gray"
                              className="flex items-center gap-1.5 font-normal"
                            >
                              <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                              5.0
                            </Typography>
                          </div>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item.eventName}
                          </Typography>
                        </div>
                        <div className=" mt-2">
                          <Typography color="red">
                            {item.startDate}, {item.startTime}
                          </Typography>
                          <Typography className="mt-2">
                            Event type: {item.category}
                          </Typography>
                          {item.ticketValue === "free" ? (
                            <Typography>Payment type: free</Typography>
                          ) : (
                            <Typography>
                              Ticket fee : {item.ticketPrice}
                            </Typography>
                          )}
                          <Typography className="mt-2">
                            Organized by: {item.orgName}
                          </Typography>
                        </div>
                      </CardBody>
                    </div>
                    <CardFooter className="pt-2">
                      <Button size="lg" fullWidth={true}>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
