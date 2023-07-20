import { useEffect, useState } from "react"
import { getCompleteEventDetails } from "../../api/userAuth/userApis"
import { EventDetailsInterface } from "../../types/userInterface"

const ViewMoreComponent:React.FC = ()=>{
    const [eventData,setEventData] = useState<EventDetailsInterface>()
    useEffect (()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get("eventId"); 
        if(eventId)fetchEventData(eventId)

    },[])

    const fetchEventData = async (id:string)=>{
        const event = await getCompleteEventDetails(id)
        console.log(event)
        // setEventData(event)
    }
    return (
        <>
        
        </>
    )
}


export default ViewMoreComponent