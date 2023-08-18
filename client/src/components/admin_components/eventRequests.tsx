import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  Input,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  approveEvent,
  getAllEvents,
  promoteEvent,
  rejectEvent,
  removeFromPromote,
} from "../../api/adminAuth/admin";
import { RegisteredEventInterface } from "../../types/organizerInterface";

const TABLE_HEAD = [
  "Events",
  "Organization",
  "Start time",
  "End time",
  "Location",
  "Status",
  "Action",
];

export default function EventRequests() {
  const [events, setEvents] = useState<RegisteredEventInterface[]>();
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [id, setId] = useState("");

  const handleOpen = () => setOpen(!open);
  const fetchEvents = async () => {
    const events = await getAllEvents();
    setEvents(events?.data.data);
  };
  const TABLE_ROWS = events;

  useEffect(() => {
    fetchEvents();
  }, [updated]);

  const handleHandlers = () => {
    switch (mode) {
      case "promote":
        handlePromote(id);
        setMode("");
        setId("");
        break;
      case "demote":
        handleDemote(id);
        setMode("");
        setId("");
        break;
      case "approve":
        handleApprove(id);
        setMode("");
        setId("");
        break;
      case "reject":
        handleReject(id);
        setMode("");
        setId("");
        break;
      default:
        break;
    }
  };

  const handleApprove = async (id: string) => {
    handleOpen();
    const res = await approveEvent(id);
    console.log(res);
    if (res?.data) {
      setUpdated(!updated);
    }
  };
  const handleReject = async (id: string) => {
    handleOpen();
    const res = await rejectEvent(id);
    if (res?.data) {
      setUpdated(!updated);
    }
  };

  const handlePromote = async (id: string) => {
    handleOpen();
    const res = await promoteEvent(id);
    if (res?.data.response.ok) {
      setUpdated(!updated);
    }
  };

  const handleDemote = async (id: string) => {
    handleOpen();
    const res = await removeFromPromote(id);
    if (res?.data.response.ok) {
      setUpdated(!updated);
    }
  };
  return (
    <>
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
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
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
              {TABLE_ROWS &&
                TABLE_ROWS.map(
                  (
                    {
                      _id,
                      imageURL,
                      eventName,
                      orgName,
                      startDate,
                      startTime,
                      endDate,
                      endTime,
                      addressLine1,
                      addressLine2,
                      status,
                      isPromoted,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr key={eventName}>
                        <td className={classes}>
                          <div className="flex items-center gap-1">
                            <Avatar
                              src={imageURL[0]}
                              alt="image"
                              size="md"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {eventName}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {orgName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {startDate}
                            <br />
                            {startTime}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {endDate}
                            <br />
                            {endTime}
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
                                {addressLine1.split("-").join(" ")}{" "}
                                {addressLine2}
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
                                status === "approved"
                                  ? "green"
                                  : status === "draft"
                                  ? "amber"
                                  : "red"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          {(status === "requested") && (
                            <>
                              <Button
                                className="mr-2"
                                size="sm"
                                color="green"
                                onClick={() => {
                                  setMode("approve");
                                  setId(_id);
                                  handleOpen();
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                color="red"
                                onClick={() => {
                                  setMode("reject");
                                  setId(_id);
                                  handleOpen();
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {status === "approved" && (
                            <>
                              <Button
                                size="sm"
                                color="red"
                                className="mr-2"
                                onClick={() => {
                                  setMode("reject");
                                  setId(_id);
                                  handleOpen();
                                }}
                              >
                                Reject
                              </Button>
                              {isPromoted ? (
                                <Button
                                  size="sm"
                                  color="red"
                                  onClick={() => {
                                    setMode("demote");
                                    setId(_id);
                                    handleOpen();
                                  }}
                                >
                                  Demote
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  color="green"
                                  onClick={() => {
                                    // handlePromote(_id);
                                    setMode("promote");
                                    setId(_id);
                                    handleOpen();
                                  }}
                                >
                                  Promote
                                </Button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  }
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
      <WarningModal
        open={open}
        handleOpen={handleOpen}
        handleHandlers={handleHandlers}
      />
    </>
  );
}

interface WarningModalProps {
  open: boolean;
  handleOpen: () => void;
  handleHandlers: () => void;
}
const WarningModal: React.FC<WarningModalProps> = ({
  open,
  handleOpen,
  handleHandlers,
}) => {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="grid place-items-center gap-4">
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
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            Are you sure you want to do this action .This action is
            irreversible. Please proceed with awareness.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="red" size="sm" onClick={handleOpen}>
            Cancel
          </Button>
          <Button size="sm" color="green" onClick={handleHandlers}>
            Proceed
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
