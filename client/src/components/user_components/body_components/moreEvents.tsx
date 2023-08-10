import { useEffect, useState } from "react";
import { getAllApprovedEvents } from "../../../api/userAuth/userApis";
import { RegisteredEventInterface } from "../../../types/organizerInterface";
// import EventCards from "../../common/eventCards";
import { EventCardsShimmer } from "../../common/eventCards";
import { lazy, Suspense } from "react";

const EventCards = lazy(() => import("../../common/eventCards"));

const MoreEvents: React.FC = () => {
  const [approvedEvents, setApprovedEvents] =
    useState<RegisteredEventInterface[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    const data = await getAllApprovedEvents();
    setApprovedEvents(data?.data.data);
    setTimeout(() => setIsLoading(false), 2000);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchEvents();
  }, []);
  return (
    <>
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
          More events for you
        </h4>
        {approvedEvents?.length === 0 ? (
          <>
            <div className="w-full flex justify-center h-80 items-center">
              <h4 className="text-2xl md:text-4xl">
                Apologies, but it seems that there are currently no events
                available.
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
                <Suspense>
                  {approvedEvents &&
                    approvedEvents.map((item) => {
                      return <EventCards key={item._id} approvedEvent={item} />;
                    })}
                </Suspense>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MoreEvents;

// interface EventCardProps {
