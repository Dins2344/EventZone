import { useEffect, useState } from "react";
import { getCompleteEventDetails } from "../../api/userAuth/userApis";
import EventImageSection from "../../components/user_components/event_details_component/imageSection";
import EventInfo from "../../components/user_components/event_details_component/eventInfo";
import { Button } from "@material-tailwind/react";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState();
  const fetchEventDetails = async (id: string) => {
    const data = await getCompleteEventDetails(id);
    const details = data?.data.data[0];
    details && setEventDetails(details);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);
    id && fetchEventDetails(id);
  }, []);
  return (
    <>
      <EventImageSection images={eventDetails && eventDetails.imageURL} />
      <div className="flex mx-10 px-10">
        <div className="md:w-8/12">
          <EventInfo event={eventDetails && eventDetails} />
        </div>
        <div className="md:w-4/12 ">
          <ReserveSeatComponent />
        </div>
      </div>
    </>
  );
};

export default EventDetails;


const ReserveSeatComponent = ()=>{
  return (
    <>
      <div className="w-full p-5 sticky top-0">
        <div className="flex flex-col border-2 p-5 rounded-md ">
          <div className="flex mb-3">
            <label>entry pass</label>
            <input type="number"></input>
          </div>

          <Button color="deep-orange">Reserve a spot</Button>
        </div>

      </div>
    </>
  )
}