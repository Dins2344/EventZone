import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useEffect,useState } from "react";
import { approveEvent, getAllEvents, rejectEvent } from "../../api/adminAuth/admin";
import { RegisteredEventInterface } from "../../types/organizerInterface";
 
const TABLE_HEAD = ["Events", "Organization", "Start time", "End time","Location", "Status", "Action"];
 
// const TABLE_ROWS = [
//   {
//     img: "/img/logos/logo-spotify.svg",
//     name: "Spotify",
//     amount: "$2,500",
//     date: "Wed 3:00pm",
//     status: "paid",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
// ];
 
export default function EventRequests() {
    const [events,setEvents]= useState<RegisteredEventInterface[]>()
    const [updated,setUpdated]= useState(0)
    const fetchEvents = async()=>{
        const events = await getAllEvents()
        console.log(events?.data.data)
        setEvents(events?.data.data)
    }
    const TABLE_ROWS = events

    

    useEffect(()=>{
        fetchEvents()
    },[updated])

    const handleApprove = async (id:string)=>{
        console.log(id)
        const res = await approveEvent(id)
        console.log(res)
        setUpdated(updated+1)
    }
    const handleReject = async(id:string)=>{
        console.log(id)
        const res = await rejectEvent(id)
        console.log(res)
        setUpdated(updated+1)
    }
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Events
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              You can control all the events here... 
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS && TABLE_ROWS.map(
              ({_id, imageURL, eventName,orgName, startDate,startTime,endDate,endTime,addressLine1,addressLine2, status,}, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={eventName}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={imageURL[0]}
                          alt='image'
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {eventName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {orgName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {startDate}<br/>{startTime}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {endDate}<br/>{endTime}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {addressLine1.split("-").join(" ")} {addressLine2}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            'expiry'
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "approved" ? "green" : status === "draft" ? "amber" : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Button className="mr-2" size="sm" color="green" onClick={(e)=>{
                        handleApprove(_id)
                      }}>Approve</Button>
                      <Button size="sm" color="red" onClick={(e)=>{
                        handleReject(_id)
                      }}>Reject</Button>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}