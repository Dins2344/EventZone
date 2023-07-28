import { useEffect, useState } from "react";
import {
  getOrganizationDetails,
  getOrganizersAllEvents,
} from "../../api/organizer/organizer";
import { RegisteredOrganization } from "../../types/userInterface";
import OrganizerHero from "../../components/user_components/organizerInfo/organizerHero";
import EventsSection from "../../components/user_components/organizerInfo/eventsSection";
import { RegisteredEventInterface } from "../../types/organizerInterface";

const ShowOrganizer: React.FC = () => {
  const [organization, setOrganization] = useState<RegisteredOrganization>();
  const [events, setEvents] = useState<RegisteredEventInterface[]>();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  useEffect(() => {
    id && fetchOrganization(id);
    id && fetchOrganizersEvents(id);
  }, []);

  const fetchOrganization = async (id: string) => {
    const data = await getOrganizationDetails(id);
    console.log(data);
    setOrganization(data?.data.data);
  };

  const fetchOrganizersEvents = async (id: string) => {
    const data = await getOrganizersAllEvents(id);
    setEvents(data?.data.data);
  };

  const approvedEvents = events?.filter((item) => {
    if (item.status === "approved") {
      return item;
    }
  });
  return (
    <>
      <div className="w-full min-h-screen">
        <div>
          {organization && <OrganizerHero organization={organization} />}
        </div>
        <div className="lg:px-28 md:px-20 px-4">
          {approvedEvents && <EventsSection events={approvedEvents} />}
        </div>
      </div>
    </>
  );
};

export default ShowOrganizer;
