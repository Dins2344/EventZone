import { useEffect, useState } from "react";
import { getBookingDetails } from "../../../api/userAuth/userApis";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Bookings } from "../../../types/userInterface";



const ProfileActivities: React.FC = () => {
  const [bookings, setBookings] = useState<Bookings[]>();
  const navigate = useNavigate()
  useEffect(() => {
    fetchBookingInfo();
  }, []);

  const fetchBookingInfo = async () => {
    const data = await getBookingDetails();
    console.log(data);
    setBookings(data?.data.data);
  };
  return (
    <>
      <div className="md:pl-10 pt-2 w-full">
        <h3 className="text-2xl mb-2">Bookings</h3>
        <div className="flex flex-col p-2 border-4 rounded-lg h-80 overflow-scroll no-scrollbar">
          {bookings &&
            bookings.map((item) => {
              return (
                <div className="flex justify-between h-min mb-2 border">
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
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-2">
                    <Button
                      className="h-8"
                      size="sm"
                      variant="outlined"
                      color="gray"
                      onClick={()=>{
                        navigate(`/show-booking/?bookingId=${item._id}`)
                      }}
                    >
                      View more
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProfileActivities;
