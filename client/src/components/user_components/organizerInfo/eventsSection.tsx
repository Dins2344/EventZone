import { Button } from "@material-tailwind/react";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
import EventCards from "../../common/eventCards";
import { useEffect, useState } from "react";

type EventsSectionProps = {
  events: RegisteredEventInterface[];
};
const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [eventsArray, setEventsArray] = useState<RegisteredEventInterface[]>();
  const [upComingClicked, setUpComingClicked] = useState(true);
  const [pastClicked, setPastClicked] = useState(false);
  useEffect(() => {
    handleUpcoming();
  }, []);
  const handleUpcoming = () => {
    const data = events.filter((item) => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-GB"); // Output: "11/07/2023"
      // Convert to "YYYY-MM-DD" format
      const [day, month, year] = formattedDate.split("/");
      const formattedDateISO = `${year}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}`;
      if (item.startDate > formattedDateISO) {
        return item;
      }
    });
    setEventsArray(data);
    setUpComingClicked(true);
    setPastClicked(false);
  };
  const handlePast = () => {
    const data = events.filter((item) => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-GB"); // Output: "11/07/2023"
      // Convert to "YYYY-MM-DD" format
      const [day, month, year] = formattedDate.split("/");
      const formattedDateISO = `${year}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}`;
      if (item.startDate < formattedDateISO) {
        return item;
      }
    });
    setEventsArray(data);
    setUpComingClicked(false);
    setPastClicked(true);
  };
  return (
    <>
      <div className="w-full border-t-2 mb-16">
        <h3 className="text-lg md:text-2xl mt-4 font-semibold">Events</h3>
        <div className="flex mt-4 mb-10">
          <Button
            onClick={handleUpcoming}
            className={
              upComingClicked
                ? "rounded-full mr-4 bg-blue-600 text-white"
                : "rounded-full mr-4 border-2 bg-white text-black"
            }
          >
            Upcoming events
          </Button>
          <Button
            onClick={handlePast}
            className={
              pastClicked
                ? "rounded-full  bg-blue-600 text-white"
                : "rounded-full mr-4 bg-white border-2 text-black"
            }
          >
            Past events
          </Button>
        </div>
        {eventsArray?.length === 0 ? (
          <div className="w-full flex justify-center h-80 items-center">
            <h4 className="text-2xl md:text-4xl">
              Apologies, but it seems that there are currently no events
              available.
            </h4>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {eventsArray &&
              eventsArray.map((item) => {
                return <EventCards approvedEvent={item} />;
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default EventsSection;
