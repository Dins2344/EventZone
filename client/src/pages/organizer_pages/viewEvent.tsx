import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import EditEventComponent from "../../components/organizer_components/editEventComponent";
import { getCompleteEventDetails } from "../../api/userAuth/userApis";
import { EventDetailsInterface } from "../../types/userInterface";
import ViewMoreComponent from "../../components/organizer_components/EventViewMore";
import { FaPencilAlt } from "react-icons/fa";
const ViewEvent: React.FC = () => {
  const [mode, setMode] = useState("view");
  const [eventInfo, setEventInfo] = useState<EventDetailsInterface>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("eventId");
    id && fetchEventInfo(id);
  }, []);

  const fetchEventInfo = async (id: string) => {
    const data = await getCompleteEventDetails(id);
    setEventInfo(data?.data.data[0]);
  };
  return (
    <>
      <div className="min-h-screen">
        <div className="flex w-full  px-4 mt-10 mb-5">
          <h2 className="text-4xl font-bold">{eventInfo?.eventName} <span className="text-xl">Organized by {eventInfo?.orgName}</span></h2>
          {mode === 'view' && 
          <Button className="text-sm" size="sm" variant="text" color="red" onClick={() => setMode("edit")}>
            <FaPencilAlt /> edit
          </Button>
          }
        </div>
        {mode === "view" && eventInfo && (
          <ViewMoreComponent eventData={eventInfo} />
        )}
        {mode === "edit" && eventInfo && <EditEventComponent eventId={eventInfo?._id} setMode={setMode} />}
      </div>
    </>
  );
};

export default ViewEvent;
