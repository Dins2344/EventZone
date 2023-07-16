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
import { EventDetailsInterface } from "../../../types/userInterface";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import {
  RegisteredBookingInterface,
  ticketBookingCreationInterface,
} from "../../../types/userInterface";
import { ticketBooking } from "../../../api/userAuth/userApis";
import { useNavigate } from "react-router-dom";
import { LoggedUserInterface } from "../../../types/userInterface";

type ReserveSeatProps = {
  eventDetails: EventDetailsInterface;
};

const ReserveSeatComponent: React.FC<ReserveSeatProps> = ({
  eventDetails,
}): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketPass, setTicketPass] = useState(1);
  const [bookingRes, setBookingRes] = useState<RegisteredBookingInterface>();
  const [size, setSize] = useState<null | string>(null);
  const [showPaypal,setShowPaypal] = useState(false)
  const [registerInfo,setRegisterInfo] = useState<ticketBookingCreationInterface>()
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleOpen = (value: string | null) => setSize(value);
  const handleIncrement = () => {
    setTicketPass(ticketPass + 1);
  };
  const handleDecrement = () => {
    setTicketPass(ticketPass - 1);
  };
  const handlePaidRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const data: ticketBookingCreationInterface = {
      firstName,
      lastName,
      phoneNumber,
      email: user.user.email,
      userId: user.user._id,
      ticketCount: ticketPass,
      eventId: eventDetails._id,
    };
    setRegisterInfo(data)
    setShowPaypal(true)
  }
  const handleFreeRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ticketBookingCreationInterface = {
      firstName,
      lastName,
      phoneNumber,
      email: user.user.email,
      userId: user.user._id,
      ticketCount: ticketPass,
      eventId: eventDetails._id,
    };
    const res = await ticketBooking(data);
    console.log(res);
    if (res?.data.message === "booking confirmed") {
      setBookingRes(res.data.response);
    }
  };

  const total = ticketPass * eventDetails?.ticketPrice;

  return (
    <>
      <div className=" w-full pt-5 lg:p-5  sticky md:top-0 bg-white">
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
        {eventDetails && 
        <div className="flex flex-col">
          <label className="mb-3">
            Ticket type : { eventDetails?.ticketValue}
          </label>
          <label className="mb-3">
            Ticket price : { eventDetails?.ticketPrice}
          </label>
          <label className="mb-3">
            Ticket sold : { eventDetails?.ticketSold} / { eventDetails?.eventCapacity}
          </label>
          {eventDetails.ticketSold + ticketPass <= eventDetails.eventCapacity ?
          <Button onClick={() => handleOpen("xl")} color="deep-orange">
            Reserve a spot
          </Button>
          
        :
        <Button onClick={() => handleOpen("xl")} color="deep-orange">
           can't provide that much tickets
          </Button>
        }
        </div>
        }
        </div>
      </div>

      <div className="mb-3 flex gap-3"></div>
      <Dialog open={size === "xl"} size='xl' handler={handleOpen}>
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
          {bookingRes ? (
            <>
              <div className="w-full flex">
                <div className="w-full md:w-8/12 md:px-14 ">
                  <div className="flex">
                    <div className="w-7 h-7 bg-green-500 rounded-full mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-white mr-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <p>Thank you for your order...! #{bookingRes?._id}</p>
                  </div>
                  <div className="flex  w-11/12 mb-5">
                    <div className="flex flex-col w-full mt-4">
                      <p>Your going to</p>
                      <h3 className="text-3xl font-bold text-black">
                        {eventDetails.eventName}
                      </h3>
                      <h3 className="text-xl font-bold text-black mt-10">
                        Organization message
                      </h3>
                      <p>Dear,</p>
                      <p>
                        Thanks for registering to attend the{" "}
                        {eventDetails.eventName}. Look forward to meeting you
                        and family on {eventDetails.startDate} at{" "}
                        {eventDetails.addressLine1}
                      </p>
                      <div className="flex flex-wrap mt-5 mb-3">
                        <div className="flex flex-col w-full md:w-1/2">
                          <h3 className="text-xl font-bold text-black">
                            One registration sent to
                          </h3>
                          <p>{bookingRes.contactInfo.email}</p>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 mt-3 md:mt-0">
                          <h3 className="text-xl font-bold text-black">
                            Event date
                          </h3>
                          <p>{eventDetails.startDate}</p>
                          <p>{eventDetails.startTime}</p>
                        </div>
                      </div>
                      <div className="flex flex-col mb-5">
                        <h3 className="text-xl font-bold text-black">
                          Location
                        </h3>
                        <p>{eventDetails.addressLine1}</p>
                        <p>{eventDetails.addressLine2}</p>
                      </div>

                      <Button
                        onClick={() => {
                          navigate(
                            `/show-booking/?bookingId=${bookingRes._id}`
                          );
                        }}
                        variant="outlined"
                        color="deep-orange"
                      >
                        View Registration
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="md:w-4/12 hidden md:block">
                  <div className="flex flex-col">
                    <div className="flex">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                        alt="nature image"
                      />
                      <div className="flex flex-col ml-4">
                        <h5 className="text-xl font-bold dark:text-white mb-1">
                          {eventDetails.organizerInfo.orgName}
                        </h5>
                        <p>followers count</p>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex">
                <div className="w-full md:w-8/12 md:px-14 ">
                  <div className="flex justify-center w-11/12 mb-5">
                    <h3 className="text-3xl font-bold text-black">Checkout</h3>
                  </div>
                  <form>
                    <div className="flex flex-col h-96 overflow-scroll no-scrollbar">
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
                            type="number"
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
                              size="md"
                              color="deep-orange"
                              className="w-full mb-3"
                              onClick={handlePaidRegister}
                            >
                              Register and continue to payment
                            </Button>
                           {showPaypal &&<div>
                              <PaypalPayment
                              setBookingRes={setBookingRes}
                                registerInfo = {registerInfo}
                                total={total}
                                eventName={eventDetails.eventName}
                              />
                            </div> } 
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
                      <p className="font-bold">{total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ReserveSeatComponent;
