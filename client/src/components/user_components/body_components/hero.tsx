import { Carousel, Typography, Button } from "@material-tailwind/react";
import { getAllApprovedEvents } from "../../../api/userAuth/userApis";
import { useEffect, useState } from "react";
import { RegisteredEventInterface } from "../../../types/organizerInterface";


 const HeroComponent=() =>{
  const [events,setEvents] = useState<RegisteredEventInterface[]>()
  const fetchEvents = async()=>{
    const data = await getAllApprovedEvents()
    console.log(data)
    const carouselEvents = data?.data.data.splice(0,2)
    setEvents(carouselEvents)
  }
  useEffect(()=>{
    fetchEvents()
  },[])
  return (
    <Carousel className="h-min">
      {events?.map((item)=>{
        return(
      <div key={item._id} className="relative h-full w-full">
        <img
          src={item.imageURL[0]}
          alt="image 3"
          className="h-full "
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {item.eventName}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {item.description}
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
        )
      })}
    </Carousel>
  );
}

export default HeroComponent;
