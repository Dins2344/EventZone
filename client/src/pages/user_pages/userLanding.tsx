import { useEffect } from "react";
import "./userLanding.css";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from "@material-tailwind/react";

const Body = () => {

  useEffect(() => {
    AOS.init({duration:2000})
  },[])
  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/djmhw4yob/video/upload/v1694192780/eventZoneBG_l3v9gi.mp4"
          autoPlay
          muted
          loop
        ></video>
        <div className="content px-5 lg:px-44">
          <h1
            className=" text-3xl md:text-5xl lg:text-6xl text-white text-center font-bold bgText"
            data-aos="fade-up"
          >
            From concept to celebration, our team ensures your vision becomes a
            reality.
          </h1>
          <Button
            data-aos="fade-up"
            className="w-min place-self-center mt-5"
            size="md"
            color="white"
          >
            Explore
          </Button>
        </div>
      </div>
      <WhatCanYouDo />
      <OurPartners />
    </>
  );
};

export default Body;


const WhatCanYouDo: React.FC = () => {
 useEffect(() => {
   AOS.init({ duration: 2000 });
 }, []);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-blue-100 sm:px-28 md:px-36 lg:px-28 px-4">
        <h1
          data-aos="fade-up"
          className="text-center my-8 md:my-14 text-2xl md:text-5xl font-semibold"
        >
          What you can do..
        </h1>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-8  md:mt-14">
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5 bg-light-blue-50"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5 bg-light-blue-50"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5 bg-light-blue-50"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const OurPartners: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col  bg-light-blue-50 sm:px-28 md:px-36 lg:px-28 px-4">
        <h1
          data-aos="fade-up"
          className="text-center my-8 md:my-14 text-2xl md:text-5xl font-semibold"
        >
          Our partners...
        </h1>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-8  md:mt-14">
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5  bg-blue-100"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5 bg-light-blue-50"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
          <div
            data-aos="fade-up"
            className="w-full h-full shadow-md rounded-xl p-5 bg-light-blue-50"
          >
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 ">
              Be an organizer
            </h1>
            <p className="md:text-xl text-lg">
              Unlock your potential as an event organizer - effortlessly create,
              manage, and sell your events with just a few simple steps.
            </p>

            <Button
              className="mt-5 lg:mt-9"
              size="sm"
              variant="outlined"
              color="light-blue"
            >
              let's go
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
