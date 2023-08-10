
import { lazy, Suspense } from "react";


const Organizers = lazy(() => import("../../components/user_components/body_components/Organizers"));
const EventFromOrganizers = lazy(() =>import("../../components/user_components/body_components/eventsFromOrganizers"));
const MoreEvents = lazy(() => import("../../components/user_components/body_components/moreEvents"));
const HeroComponent = lazy(() => import("../../components/user_components/body_components/hero"));


const Body = () => {
  return (
    <>
      <div className="mb-10">
        <Suspense>
          <HeroComponent />
        </Suspense>
        <Suspense>
          <MoreEvents />
        </Suspense>
        <Suspense>
          <Organizers />
        </Suspense>
        <Suspense>
          <EventFromOrganizers />
        </Suspense>
      </div>
    </>
  );
};

export default Body;
