import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
  Typography,
} from "@material-tailwind/react";

import PaypalPayment from "../../paypal/paypalButtonComponent";
import { EventData } from "./eventInfo";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { ticketBookingCreationInterface } from "../../../types/userInterface";
import { ticketBooking } from "../../../api/userAuth/userApis";

type ReserveSeatProps = {
  eventDetails: EventData;
};

const ReserveSeatComponent: React.FC<ReserveSeatProps> = ({
  eventDetails,
}): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketPass, setTicketPass] = useState(1);
  const [size, setSize] = useState<null | string>(null);
  const user = useSelector(selectUser);

  const handleOpen = (value: string | null) => setSize(value);
  const handleIncrement = () => {
    setTicketPass(ticketPass + 1);
  };
  const handleDecrement = () => {
    setTicketPass(ticketPass - 1);
  };

  const handleFreeRegister = async(e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data:ticketBookingCreationInterface  = {
      firstName,
      lastName,
      phoneNumber,
      email: user.user.email,
      userId: user.user._id,
      ticketCount: ticketPass,
      eventId:eventDetails._id
    };
    const res = await ticketBooking(data)
    console.log(res)
  };

  return (
    <>
      <div className=" w-full p-5  sticky md:top-0 bg-white">
        <div className="flex flex-col border-2 p-5 rounded-md ">
          <div className="flex mb-3">
            <label className="mr-2">entry pass : </label>
            <Button
              size="sm"
              variant="text"
              className="w-6 h-6 p-0 "
              onClick={handleDecrement}
            >
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
                  d="M18 12H6"
                />
              </svg>
            </Button>
            <input
              className="w-1/12 p-0 m=0 border border-none"
              type="text"
              value={ticketPass}
            />
            <Button
              size="sm"
              variant="text"
              className="w-6 h-6 p-0"
              onClick={handleIncrement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </Button>
          </div>

          <label className="mb-3">
            Ticket type : {eventDetails && eventDetails?.ticketValue}
          </label>

          <Button onClick={() => handleOpen("xl")} color="deep-orange">
            Reserve a spot
          </Button>
        </div>
      </div>
      <div className="mb-3 flex gap-3"></div>
      <Dialog open={size === "xl"} size={size} handler={handleOpen}>
        <DialogHeader>
          <div className="flex justify-end w-full">
            <button onClick={() => handleOpen(null)}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <div className="w-full flex">
            <div className="w-full md:w-8/12 md:px-14 ">
              <div className="flex justify-center w-11/12 mb-5">
                <h3 className="text-3xl font-bold text-black">Checkout</h3>
              </div>
              <form>
                <div className="flex flex-col h-96 overflow-scroll">
                  <h3 className="text-3xl font-bold dark:text-white">
                    Contact Information
                  </h3>
                  <div className="flex px-2 mb-3 mt-3">
                    <div className="flex flex-col w-1/2 gap-6 px-2">
                      <Input
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        variant="outlined"
                        label="First name"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 gap-6 px-2">
                      <Input
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        variant="outlined"
                        label="Last name"
                      />
                    </div>
                  </div>
                  <div className="flex px-2 mb-3 mt-2">
                    <div className="flex flex-col w-1/2 gap-6 px-2">
                      <Input
                        variant="outlined"
                        value={user.user.email}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col w-1/2 gap-6 px-2">
                      <Input
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        variant="outlined"
                        label="phone number"
                      />
                    </div>
                  </div>
                  <div className="px-2 mb-3 m-t2">
                    <Checkbox
                      label={
                        <Typography
                          color="blue-gray"
                          className="font-medium flex"
                        >
                          I agree with the
                          <Typography
                            as="a"
                            href="#"
                            color="blue"
                            className="font-medium hover:text-blue-700 transition-colors"
                          >
                            &nbsp;terms and conditions
                          </Typography>
                          .
                        </Typography>
                      }
                    />
                  </div>
                  <div className="px-3">
                    {eventDetails?.ticketValue === "free" && (
                      <Button
                        type="submit"
                        size="md"
                        color="deep-orange"
                        className="w-full mb-3"
                        onClick={handleFreeRegister}
                      >
                        Register and continue
                      </Button>
                    )}
                    {eventDetails?.ticketValue ===
                      ("charged" || "donation") && (
                      <>
                        <Button
                          type="submit"
                          size="md"
                          color="deep-orange"
                          className="w-full mb-3"
                        >
                          Register and continue
                        </Button>
                        <div>
                          <PaypalPayment />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="md:w-4/12 hidden md:block">
              <div className="flex flex-col">
                <img
                  className="h-full w-full rounded-lg shadow-xl shadow-blue-gray-900/50 mb-8"
                  src={eventDetails?.imageURL[0]}
                  alt="nature image"
                />
                <h5 className="text-xl font-bold dark:text-white mt-1 mb-5">
                  Order summary
                </h5>
                <div className="flex justify-between px-2 mt-1 mb-5 border-b-2">
                  <p className="flex">
                    1{"  "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {"  "}
                    {eventDetails && eventDetails?.eventName}
                  </p>
                  <p>{eventDetails && eventDetails?.ticketPrice}</p>
                </div>
                <div className="flex justify-between px-2 mb-5 border-b-2">
                  <p className="flex">
                    {ticketPass}
                    {"  "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {"  "}e-ticket
                  </p>
                  <p>
                    {eventDetails && ticketPass * eventDetails?.ticketPrice}
                  </p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">
                    {eventDetails && ticketPass * eventDetails?.ticketPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ReserveSeatComponent;
