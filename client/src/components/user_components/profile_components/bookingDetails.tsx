import { useEffect, useState } from "react";
import { cancelBooking, getOneBookingDetails } from "../../../api/userAuth/userApis";
import { Bookings } from "../../../types/userInterface";
import {
  Button,
  Chip,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import ViewTicketComponent from "./viewTicket";

const BookingDetails = () => {
  const [bookingDetail, setBookingDetails] = useState<Bookings>();
  const [open, setOpen] = useState(false);
  const [updated,setUpdated] = useState(false)

  const handleOpen = () => setOpen(!open);
  const handleUpdated = () => setUpdated(!updated)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get("bookingId");
    console.log(bookingId);
    bookingId && fetchBookingDetails(bookingId);
  }, [updated]);

  const fetchBookingDetails = async (bookingId: string) => {
    const data = await getOneBookingDetails(bookingId);
    console.log(data);
    setBookingDetails(data?.data.data[0]);
  };

  const handleCancel = async ()=>{
   if(bookingDetail) {
    const res = await cancelBooking(bookingDetail?._id)
    console.log(res)
    handleUpdated()
    handleOpen()
   }
  }
  return (
    <>
      <div className="flex flex-col w-full px-8 md:px-20 lg:px-52 pt-20  h-screen">
        <div className="flex w-full justify-between">
        <h1 className="mb-4 text-2xl font-semibold w-full leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Booking for{" "}
          <span className="text-blue-600">
            {bookingDetail?.event.eventName}
          </span>
        </h1>
        <div className="flex">
            <p>Status: </p>
            {bookingDetail?.status === 'confirmed' &&  <Chip className="h-8" variant="ghost" value={bookingDetail?.status} color="green" />}
            {bookingDetail?.status === 'canceled' &&  <Chip className="h-8" variant="ghost" value={bookingDetail?.status} color="red" /> }
        </div>
        </div>
        <div className="flex flex-col">
          <p>
            {bookingDetail?.event.ticketValue} order #{bookingDetail?._id} on{" "}
            {bookingDetail?.bookingTime}
          </p>
          <p>Category: {bookingDetail?.event.category}</p>
          <p>
            Event info: from {bookingDetail?.event.startDate},{" "}
            {bookingDetail?.event.startTime} to {bookingDetail?.event.endDate},{" "}
            {bookingDetail?.event.endTime}
          </p>
          <p>Location: {bookingDetail?.event.addressLine2}</p>
        </div>
        <div className="flex flex-wrap mt-5">
          <div className="flex flex-col w-full md:w-4/12 p-2">
            {bookingDetail && 
            <ViewTicketComponent BookingData={bookingDetail} />
            }
            <Button onClick={handleOpen} color="red" variant="outlined">
              Cancel order
            </Button>
          </div>
          <div className="flex flex-col w-full md:w-8/12 p-2  md:border-l-2">
            <h3 className="text-2xl">Order details</h3>
            <div className="flex flex-col w-full pl-2 mt-2">
              <h4 className="text-xl font-semibold">Contact information</h4>
              <div className="flex flex-wrap mt-3">
                <p className="w-full md:w-1/2">
                  First name: {bookingDetail?.contactInfo.firstName}
                </p>
                <p className="w-full md:w-1/2">
                  Last name: {bookingDetail?.contactInfo.lastName}
                </p>
              </div>
              <div className="flex flex-wrap mt-3">
                <p className=" w-full md:w-1/2">
                  Email: {bookingDetail?.contactInfo.email}
                </p>
                <p className="w-full md:w-1/2">
                  Phone number: {bookingDetail?.contactInfo.phoneNumber}
                </p>
              </div>
              <p className="mt-3">Delivery method: e-Ticket</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody >
          <div className="relative w-full h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleOpen}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to cancel this booking?
                </h3>
                <button
                onClick={handleCancel}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleOpen}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>

      {/* <div id="popup-modal"  className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div> */}
    </>
  );
};

export default BookingDetails;
