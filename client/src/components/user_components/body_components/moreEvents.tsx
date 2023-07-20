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
      <div className=" mt-24  w-full px-20">
        <h4 className="text-2xl pl-4 mb-10 font-bold dark:text-white">more events for you</h4>
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
    const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-wrap">
        {approvedEvents &&
          approvedEvents.map((item) => {
            return (
              <>
                <div className="p-4">
                  <Card className="w-full max-w-[26rem] shadow-lg ">
                    <div className="hover:cursor-pointer" onClick={()=>{
                        const id = item._id
                        navigate(`/show-event/?id=${id}`)
                    }}>
                      <CardHeader floated={false} color="blue-gray">
                        <img
                          src={item.imageURL[0]}
                          alt="ui/ux review check"
                        />
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
                        <div className="mb-3 flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {item.eventName}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                          >
                            <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                            5.0
                          </Typography>
                        </div>
                        <div className="h-10 overflow-hidden">
                        <Typography color="gray">{item.description}</Typography>
                        </div>
                      </CardBody>
                    </div>
                    <CardFooter className="pt-3">
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
