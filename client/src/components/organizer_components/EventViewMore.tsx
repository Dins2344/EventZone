import { EventDetailsInterface } from "../../types/userInterface";
interface EventViewMoreProps {
  eventData: EventDetailsInterface;
}

const ViewMoreComponent: React.FC<EventViewMoreProps> = ({ eventData }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full px-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">Event basic info</h3>
          <p className="mb-1">
            <span className="font-semibold">Event Name: </span>
            {eventData.eventName}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Event category: </span>
            {eventData.category}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Event description: </span>
            {eventData.description}
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">When & where</h3>
          <p className="mb-1">
            <span className="font-semibold">State & city: </span>
            {eventData.city}, {eventData.state}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Address line 1: </span>
            {eventData.addressLine1}
          </p>
          <p className="mb-1">
            {" "}
            <span className="font-semibold">Address line 2:</span>{" "}
            {eventData.addressLine2}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Start date & time: </span>
            <span className="text-red-500 font-semibold">
              {eventData.startDate}, {eventData.startTime}
            </span>
          </p>
          <p className="mb-1">
            <span className="font-semibold">End date & time: </span>
            <span className="text-red-500 font-semibold">
              {eventData.endDate}, {eventData.endTime}
            </span>
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">Ticket info</h3>
          <p className="mb-1">
            <span className="font-semibold">Ticket price: </span> &#8377;
            {eventData.ticketPrice}
          </p>
          <p className="mb-1">
            {" "}
            <span className="font-semibold"> Ticket type: </span>
            {eventData.ticketValue}
          </p>
          <p className="mb-1">
            {" "}
            <span className="font-semibold"> Event capacity: </span>
            {eventData.eventCapacity}
          </p>
          <p className="mb-1">
            <span className="font-semibold"> Ticket sold: </span>
            {eventData.ticketSold}
          </p>
        </div>
        <div className="felx flex-col">
          <h3 className="text-xl font-bold mb-2">Media info</h3>
          <p className="mb-1">
            <span className="font-semibold">Images: </span>
          </p>
          <div className="flex w-full overflow-x-scroll no-scrollbar mb-1">
            {eventData.imageURL.map((item) => {
              return <img className="w-28 mx-2 " src={item}></img>;
            })}
          </div>
          <p className="mb-1">
            <span className="font-semibold">Video URL: </span>
            {eventData.videoURL}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Agenda: </span>
            {eventData.agenda}
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewMoreComponent;
