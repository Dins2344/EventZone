import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { Bookings } from "../../../types/userInterface";

type viewTicketProps= {
BookingData:Bookings
}
import logo from '../../../assets/logos/svg/logo-no-background.svg'
import iconLogo from '../../../assets/logos/svg/logo icon-no-background.png'
import html2canvas from 'html2canvas';

const ViewTicketComponent :React.FC<viewTicketProps> = ({BookingData}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleDownload = () => {
    const element = document.getElementById('divToDownload');
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'EventZone Ticket.png';
        link.click();
      });
    }
  };

  return (
    <Fragment>
      <Button color="deep-orange" className="mb-3" onClick={handleOpen} variant="gradient">
        View ticket
      </Button>
      <Dialog
        size="sm"
        className="rounded-3xl w-min"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
          <div className="flex flex-col items-center justify-center  h-min bg-center bg-cover  ">
            <div className="absolute bg-blue-900 opacity-80 inset-0 z-0 rounded-3xl  "></div>
            <div id="divToDownload" className="max-w-md w-full h-full z-10 bg-blue-900 rounded-3xl">
              <div className="flex flex-col">
                <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-2 m-2">
                  <div className="flex-none sm:flex">
                    <div className=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
                      <img
                        src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                        alt="aji"
                        className=" w-32 h-32 object-cover rounded-2xl"
                      />
                      <a
                        href="#"
                        className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="flex-auto justify-evenly">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center  my-1">
                          <span className="mr-3 rounded-full bg-white w-8 h-8">
                            <img
                              src={iconLogo}
                              className="h-8 p-1"
                            />
                          </span>
                          <h2 className="font-medium">Event Zone</h2>
                        </div>
                        <div className="ml-auto text-blue-800">{BookingData.status}</div>
                      </div>
                      <div className=" border-dashed border-b-2 my-5"></div>
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          
                          <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                            {BookingData.event.eventName}
                          </div>
                          
                        </div>
                        <div className="flex flex-col mx-auto">
                          <img
                            src={logo}
                            className="w-28 p-1"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <div className="flex-auto text-xs text-gray-400 my-1">
                            
                            <span>Tickets</span>
                          </div>
                          <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                            {BookingData.ticketCount}
                          </div>
                        </div>
                      </div>
                      <div className=" border-dashed border-b-2 my-2 pt-5">
                        <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                        <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                      </div>
                      <div className="flex items-center mb-2 p-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-sm">Event</span>
                          <div className="font-semibold">{BookingData.event.eventName}</div>
                        </div>
                        <div className="flex flex-col ml-auto">
                          <span className="text-sm">Category</span>
                          <div className="font-semibold">{BookingData.event.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center mb-2 px-5">
                        <div className="flex flex-col text-sm">
                          <span className="">Start time</span>
                          <div className="font-semibold">{BookingData.event.startDate} <br/> {BookingData.event.startTime}</div>
                        </div>
                        <div className="flex flex-col mx-auto text-sm">
                          <span className="">End time</span>
                          <div className="font-semibold">{BookingData.event.endDate} <br/> {BookingData.event.endTime}</div>
                        </div>
                        <div className="flex flex-col text-sm">
                          <span className="">Ticket type</span>
                          <div className="font-semibold">{BookingData.event.ticketValue}</div>
                        </div>
                      </div>
                      <div className=" border-dashed border-b-2 my-2 pt-5">
                        <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                        <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                      </div>
                      <div className="flex items-center px-5 pt-3 text-sm">
                        <div className="flex flex-col">
                          <span className="">Attendee</span>
                          <div className="font-semibold">{BookingData.contactInfo.firstName} {BookingData.contactInfo.lastName}</div>
                        </div>
                        <div className="flex flex-col mx-auto">
                          <span className="">Phone number</span>
                          <div className="font-semibold">{BookingData.contactInfo.phoneNumber}</div>
                        </div>
                        <div className="flex flex-col">
                          <span className="">Amount paid</span>
                          <div className="font-semibold">{BookingData.totalAmount}</div>
                        </div>
                      </div>
                      <div className="flex flex-col py-2  justify-center items-center text-sm ">
                        <img className=" h-32 w-32" src={BookingData.QRCodeLink}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleDownload} className="mt-2 z-20" size="sm" color="deep-orange">Download ticket</Button>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
};

export default ViewTicketComponent;
