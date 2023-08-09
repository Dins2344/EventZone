import React, { useEffect, useState } from "react";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
import EventCards, { EventCardsShimmer } from "../../common/eventCards";
import { getEventsFromFollowingOrganizers } from "../../../api/userAuth/userApis";

const EventFromOrganizers: React.FC = () => {
  const [events, setEvents] = useState<RegisteredEventInterface[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    setIsLoading(true);
    const data = await getEventsFromFollowingOrganizers();
    setEvents(data?.data.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    };
    

  return (
    <div className=" mt-24  w-full px-5 md:px-20">
      <h4 className="text-2xl pl-4 mb-10 font-bold dark:text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 mr-2 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
          />
        </svg>
        Events from organizers you follow
      </h4>
      {events?.length === 0 ? (
        <>
          <div className="w-full flex justify-center h-80 items-center">
            <h4 className="text-2xl md:text-4xl">
              Apologies, but it seems that you are not following any organizers.
            </h4>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap ">
          {isLoading ? (
            <>
              <EventCardsShimmer />
            </>
          ) : (
            <>
              {events &&
                    events.map((item, i) => {
                  return <EventCards key={i} approvedEvent={item} />;
                })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFromOrganizers;
