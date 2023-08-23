import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  blockUser,
  getTotalUsers,
  unBlockUser,
} from "../../api/adminAuth/admin";
import { RegisteredUserInterface } from "../../types/userInterface";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<RegisteredUserInterface[]>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [unblockOpen, setUnblockOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleUnblockOpen = () => setUnblockOpen(!unblockOpen);

  useEffect(() => {
    fetchUsers();
  }, [updated]);

  const handleBlock = async () => {
    const res = await blockUser(userId);
    if (res?.data.response.ok) {
      setUserId("");
      setUpdated(!updated);
    }
  };

  const handleUnblock = async () => {
    const res = await unBlockUser(userId);
    if (res?.data.response.ok) {
      setUserId("");
      setUpdated(!updated);
    }
  };

  const TABLE_ROWS = users;

  const fetchUsers = async () => {
    const data = await getTotalUsers();
    data && setUsers(data.data.data);
  };

  const TABLE_HEAD = [
    "User",
    "Joined on",
    "Organizations",
    "Status",
    "Actions",
  ];

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Users
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
                      profileImage,
                      firstName,
                      email,
                      lastName,
                      status,
                      joinedDate,
                      organizations,
                      _id,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={
                                profileImage
                                  ? profileImage
                                  : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                              }
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {firstName} {lastName}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {joinedDate}
                            </Typography>
                            {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography> */}
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {organizations?.length}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                status && status === "active"
                                  ? "active"
                                  : status === "blocked"
                                  ? "blocked"
                                  : ""
                              }
                              color={
                                status && status === "active"
                                  ? "green"
                                  : status === "blocked"
                                  ? "blue-gray"
                                  : "gray"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex">
                            {status === "active" && (
                              <Button
                                onClick={() => {
                                  _id && setUserId(_id);
                                  handleOpen();
                                }}
                                size="sm"
                                color="red"
                                variant="outlined"
                              >
                                Block
                              </Button>
                            )}
                            {status === "blocked" && (
                              <Button
                                onClick={() => {
                                  _id && setUserId(_id);
                                  handleUnblockOpen();
                                }}
                                size="sm"
                                color="green"
                              >
                                Unblock
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
              Previous
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

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
            Are you sure...!
          </Typography>
          <Typography className="text-center font-normal">
            Once blocked user can't log in
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => {
              handleOpen();
              setUserId("");
            }}
          >
            cancel
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              handleBlock();
              handleOpen();
            }}
          >
            block
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={unblockOpen} handler={handleUnblockOpen}>
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
            Are you sure...!
          </Typography>
          <Typography className="text-center font-normal">
            Once unblocked user can experience the platform
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => {
              setUserId("");
              handleUnblockOpen();
            }}
          >
            cancel
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              handleUnblock();
              handleUnblockOpen();
            }}
          >
            Unblock
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UserManagement;
