import React, { useState,ChangeEvent } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import BasicInfoComponent from "../../components/organizer_components/basicInfoForm";
import MediaInfoForm from "../../components/organizer_components/mediaInfoForm";
import PublishFormComponent from "../../components/organizer_components/publishForm";

export interface ChildComponentProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const EventAddingPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue" : "blue-gray"}
            >
              Basic Info
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue" : "blue-gray"}
            >
              Media Info
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue" : "blue-gray"}
            >
              Lets Publish
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className=" mt-28">
        {activeStep === 0 ? <BasicForm  setActiveStep = {setActiveStep}/> : null}
        {activeStep === 1 ? <MediaForm /> : null}
        {activeStep === 2 ? <PublishForm /> : null}

        {/* <BasicForm className =  {activeStep !== 0 && 'hidden' }></BasicForm> */}
      </div>
      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventAddingPage;

const BasicForm = ({setActiveStep}: ChildComponentProps) => {
  return (
    <>
      <div className=" lg:px-20">
        <div className="flex">
          <div className="mr-3">
            <svg
              className="w-10 h-10 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Basic Info
            </h2>
          </div>
        </div>
        
        <BasicInfoComponent setActiveStep = {setActiveStep} />
      </div>
    </>
  );
};

const MediaForm = () => {
  return (
    <>
      <div className=" lg:px-20">
        <div className="flex">
          <div className="mr-3">
            <svg
              className="w-10 h-10 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                fill="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Media Info
            </h2>
          </div>
        </div>
        <MediaInfoForm />
      </div>
    </>
  );
};

const PublishForm = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   const renderInputFields = () => {
//     if (selectedOption === "option1") {
//       return (
//         <>
//         <form>
//         <input
//           type="number"
//           name="eventCapacity"
//           placeholder="Enter capacity for event"
//           className="input-field mr-3"
//         />
//         <input
//         type="text"
//         name="ticketPrice"
//         placeholder="Free of cost"
//         readOnly
//         value={0}
//         className="input-field"
//       />
//         <Button color="blue" size="sm" variant="outlined" className="ml-2">Submit</Button>
//         </form>
//         </>
//       );
//     } else if (selectedOption === "option2") {
//       return (
//         <>
//         <form>
//         <input
//           type="number"
//           name="eventCapacity"
//           placeholder="Enter capacity for event"
//           className="input-field mr-3"
//         />
//         <input
//         type="text"
//         name="ticketPrice"
//         placeholder="Attendees can pay what they want"
//         readOnly
//         className="input-field"
//       />
//         <Button color="blue" size="sm" variant="outlined" className="ml-2">Submit</Button>
//         </form>
//         </>
//       );
//     } else if (selectedOption === "option3") {
//       return (
//         <>
//         <form>
//         <input
//           type="number"
//           name="eventCapacity"
//           placeholder="Enter capacity for event"
//           className="input-field mr-3"
//         />
//         <input
//         type="number"
//         name="ticketPrice"
//         placeholder="Enter ticket price"
//         className="input-field"
//       />
//          <Button color="blue" size="sm" variant="outlined" className="ml-2">Submit</Button>
//         </form>
//         </>
//       );
//     }

//     return null;
//   };

  return (
    <>
      <div className=" lg:px-20">
        <div className="flex">
          <div className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Publish your event
            </h2>
          </div>
        </div>
        <form className="mx-12">
          <div className="mt-7">
            <h2 className="mb-4 text-lg font-bold  tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ticket details
            </h2>
          </div>
          {/* <div className="mb-6">
            <div className="flex flex-wrap mb-3 ">
                <div className="mr-2">
            <p>Choose a method for ticketing : </p>
                </div>
                <div className="flex">
              <div className=" mr-2">
                <label>
                  <input
                    type="radio"
                    name="options"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                  />
                  {' '}Free
                </label>
              </div>
              <div className="mr-2">
                <label>
                  <input
                    type="radio"
                    name="options"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleOptionChange}
                  />
                  {' '}Donation
                </label>
              </div>
              <div className="mr-2">
                <label>
                  <input
                    type="radio"
                    name="options"
                    value="option3"
                    checked={selectedOption === "option3"}
                    onChange={handleOptionChange}
                  />
                 {' '} Charge price
                </label>
              </div>
                </div>

            </div>
              {renderInputFields()}
          </div> */}
          <PublishFormComponent />

          <div className="mt-10">
            <div>
              <h2 className="mb-4 text-lg font-bold  tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Event details
              </h2>
            </div>
            <div className="flex flex-wrap justify-center border shadow-md">
              <div className="md:w-1/2 w-full">
              <img  className="w-full h-auto p-4 rounded-lg" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F172482489%2F250110139773%2F1%2Foriginal.20210826-144848?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C12%2C1200%2C600&s=1dac3212e0fca149b0c72f035d22bd95" alt="image description" />
              </div>
              <div className="md:w-1/2 w-full">
                <div className="flex flex-col p-4">
                  <h5 className="text-xl font-bold dark:text-white">
                    Heading 5
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400">
                    Date at time
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    venue details
                  </p>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">
                      Ticket Price
                    </p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">
                      event capacity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            
            <Button type="submit" size="sm" color="red" className="mt-3 w-28 ">
              Publish
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
