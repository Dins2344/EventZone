import { RegisteredEventInterface } from "../../../types/organizerInterface"
import { EventCards } from "../body_components/moreEvents"


type EventsSectionProps = {
    events : RegisteredEventInterface[]
}
const EventsSection:React.FC<EventsSectionProps> = ({events})=>{
    return (
        <>
            <EventCards approvedEvents={events} />
        </>
    )
}

export default EventsSection