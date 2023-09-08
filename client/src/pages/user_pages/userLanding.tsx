import { useEffect } from "react";
import "./userLanding.css";
import AOS from 'aos'
import "aos/dist/aos.css"
import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const Body = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
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
          <NavLink className="place-self-center mt-10" to={"/explore-events"}>
            <Button
              data-aos="fade-up"
              className="w-min "
              size="md"
              color="white"
            >
              Explore
            </Button>
          </NavLink>
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
              Promote events
            </h1>
            <p className="md:text-xl text-lg">
              Easily share and promote events you love or host with just a few
              clicks.
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
              Buy tickets
            </h1>
            <p className="md:text-xl text-lg">
              Secure your spot at the events you're excited about with
              convenient ticket purchases.
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
};

const OurPartners: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col  bg-light-blue-50 sm:px-28 md:px-20 lg:px-28 px-4">
        <h1
          data-aos="fade-up"
          className="text-center my-8 md:my-14 text-2xl md:text-5xl font-semibold"
        >
          Our partners...
        </h1>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  md:mt-14">
          <div
            data-aos="fade-up"
            className="w-full h-full flex flex-col place-items-center shadow-md rounded-xl p-5  bg-blue-100"
          >
            <img
              className="w-60 mb-5 "
              src="https://res.cloudinary.com/djmhw4yob/image/upload/v1694195359/eventZone_partners/securens_stsopd.png"
            ></img>
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 text-center">
              Securens systems pvt ltd
            </h1>
            <p className="md:text-xl text-lg text-center">
              Securens is an Enterprise IoT E-Surveillance Company in India.
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="w-full h-full flex flex-col place-items-center shadow-md rounded-xl p-5  bg-blue-100"
          >
            <img
              className="w-20 mb-5 "
              src="https://res.cloudinary.com/djmhw4yob/image/upload/v1694196462/eventZone_partners/cropped-E_factor_new_Logo-500x512-1_cqtcbx.png"
            ></img>
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 text-center">
              E-factor Experiences ltd
            </h1>
            <p className="md:text-xl text-lg text-center">
              India's best event management company with over 20 years of
              experience in creating larger then life events.
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="w-full h-full flex flex-col place-items-center shadow-md rounded-xl p-5  bg-blue-100"
          >
            <img
              className="w-60 mb-5 "
              src="https://res.cloudinary.com/djmhw4yob/image/upload/v1694196732/eventZone_partners/Screenshot_2023-09-08_234128-removebg-preview_c3dbfk.png"
            ></img>
            <h1 className="md:text-3xl text-xl font-semibold  mb-3 lg:mb-8 text-center">
              v3 staffing solutions pvt ltd
            </h1>
            <p className="md:text-xl text-lg text-center">
              V3 Staffing, a leading IT staffing agency in Hyderabad and
              Bangalore, India.
            </p>
          </div>
        </div>
      </div>
    </>
  );  
};
