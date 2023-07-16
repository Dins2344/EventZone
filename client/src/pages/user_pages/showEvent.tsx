import { useEffect, useState } from "react";
import { getCompleteEventDetails } from "../../api/userAuth/userApis";
import EventImageSection from "../../components/user_components/event_details_component/imageSection";
import EventInfo from "../../components/user_components/event_details_component/eventInfo";
import ReserveSeatComponent from "../../components/user_components/event_details_component/reserveSeat";
import { EventDetailsInterface } from "../../types/userInterface";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState<EventDetailsInterface>();
  const fetchEventDetails = async (id: string) => {
    const data = await getCompleteEventDetails(id);
    const details = data?.data.data[0];
    console.log(details)
    details && setEventDetails(details);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);
    id && fetchEventDetails(id);
  }, []);
  return (
    <>{eventDetails && 
      <>
      <EventImageSection images={eventDetails.imageURL} />
      <div className="flex md:mx-14 px-3 lg:px-10">
        <div className="flex flex-wrap w-full">
        <div className="md:w-8/12 w-full lg:px-5">
          <EventInfo event={eventDetails} />
        </div>
        <div className="md:w-4/12 w-full sticky bottom-0 lg:px-5">
          <ReserveSeatComponent eventDetails = { eventDetails} />
        </div>
        </div>
      </div>
      </>
    }
    </>
  );
};

export default EventDetails;


