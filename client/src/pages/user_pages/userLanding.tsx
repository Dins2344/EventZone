import Organizers from "../../components/user_components/body_components/Organizers";
import EventFromOrganizers from "../../components/user_components/body_components/eventsFromOrganizers";
import HeroComponent from "../../components/user_components/body_components/hero";
import MoreEvents from "../../components/user_components/body_components/moreEvents";
const Body = () => {
  return (
    <>
      <div className="mb-10">
        <HeroComponent />
        <MoreEvents />
        <Organizers />
        <EventFromOrganizers />
      </div>
    </>
  );
};

export default Body;
