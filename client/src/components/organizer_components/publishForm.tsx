import {  Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { addPublishEventInfo, } from "../../api/organizer/organizer";
import { useSelector } from "react-redux";
import { selectEvent } from "../../redux/reducers/eventSlice";
import { SubmittedChildComponentProps } from "../../pages/organizer_pages/eventAdding";


const PublishFormComponent :React.FC<SubmittedChildComponentProps>= ({ submitted, setSubmitted }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [ticketValue, setTicketValue] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("0");
  const [error, setError] = useState(false);
  const event:any = useSelector(selectEvent)




  const checkValue = () => {
    if ((ticketPrice === ""||ticketPrice > '5000') || (eventCapacity === ""||eventCapacity > '20000')) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };
  const handleSubmit = async () => {
    if (checkValue()) {
      const data = { eventCapacity, ticketPrice, ticketValue,eventId:'' };
      data.eventId = event.eventDetails._id
      const res = await addPublishEventInfo(data)
      if (res) {
        setSubmitted(false);
      }
    }
  };

  // const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedOption(event.target.value);
  // };

  const SubmitModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
      <Fragment>
        <Button className="h-10" onClick={handleOpen} variant="outlined">
          Submit
        </Button>
        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogBody divider>
            Please review the details you have provided carefully before
            submitting. Once submitted, changes cannot be made later.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              size="sm"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="outlined"
              color="green"
              size="sm"
              onClick={() => {
                handleSubmit();
                handleOpen();
              }}
            >
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    );
  };

  const renderInputFields = () => {
    if (selectedOption === "option1") {
      return (
        <>
          <form className="flex flex-wrap">
            <div className="mb-3">
              <input
                value={eventCapacity}
                type="number"
                name="eventCapacity"
                placeholder="Enter capacity for event"
                className="input-field mr-3"
                onChange={(e) => {
                  setEventCapacity(e.target.value);
                }}
              />
              {error && <p className="text-red-600">enter valid inputs</p>}
            </div>

            <div className="mb-3 mr-2">
              <input
                value={ticketPrice}
                type="text"
                name="ticketPrice"
                placeholder="Free of cost"
                readOnly
                // defaultValue='0'
                className="input-field"
              />
              {/* {error && <p className="text-red-600">enter valid inputs</p>} */}
            </div>
            <SubmitModal />
          </form>
        </>
      );
    } else if (selectedOption === "option2") {
      return (
        <>
          <form className="flex flex-wrap">
            <div className="mb-3">
              <input
                value={eventCapacity}
                type="number"
                name="eventCapacity"
                placeholder="Enter capacity for event"
                className="input-field mr-3"
                onChange={(e) => {
                  setEventCapacity(e.target.value);
                }}
              />
              {error && <p className="text-red-600">enter valid inputs</p>}
            </div>
            <div className="mb-3 mr-2">
              <input
                value={ticketPrice}
                type="text"
                name="ticketPrice"
                placeholder="Attendees can pay what they want"
                readOnly
                className="input-field"
              />
              {/* {error && <p className="text-red-600">enter valid inputs</p>} */}
            </div>
            <SubmitModal />
          </form>
        </>
      );
    } else if (selectedOption === "option3") {
      return (
        <>
          <form className="flex flex-wrap">
            <div className="mb-3">
              <input
                value={eventCapacity}
                type="number"
                name="eventCapacity"
                placeholder="Enter capacity for event"
                className="input-field mr-3"
                onChange={(e) => {
                  setEventCapacity(e.target.value);
                }}
              />
              {error && <p className="text-red-600">enter valid inputs</p>}
            </div>

            <div className="mb-3 mr-2">
              <input
                value={ticketPrice}
                type="number"
                name="ticketPrice"
                placeholder="Enter ticket price"
                className="input-field"
                onChange={(e) => {
                  setTicketPrice(e.target.value);
                }}
              />
              {error && <p className="text-red-600">enter valid inputs</p>}
            </div>
            <SubmitModal />
          </form>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {submitted && (
        <div className="mb-6">
          <div className="flex flex-wrap mb-3 ">
            <div className="mr-2">
              <p>Choose a method for ticketing : </p>
            </div>
            <div className="flex">
              <div className=" mr-2">
                <Button
                  size="sm"
                  color={ticketValue == "free" ? "red" : "blue"}
                  onClick={() => {
                    setSelectedOption("option1");
                    setTicketValue("free");
                    setEventCapacity("");
                    setTicketPrice("0");
                  }}
                >
                  Free
                </Button>
              </div>
              <div className="mr-2">
                <Button
                  size="sm"
                  color={ticketValue == "donation" ? "red" : "blue"}
                  onClick={() => {
                    setSelectedOption("option2");
                    setTicketValue("donation");
                    setEventCapacity("");
                    setTicketPrice("1");
                  }}
                >
                  Donation
                </Button>
              </div>
              <div className="mr-2">
                <Button
                  className="h-8 w-max"
                  size="sm"
                  color={ticketValue == "charged" ? "red" : "blue"}
                  onClick={() => {
                    setSelectedOption("option3");
                    setTicketValue("charged");
                    setEventCapacity("");
                    setTicketPrice("");
                  }}
                >
                  Charge price
                </Button>
              </div>
            </div>
          </div>
          {renderInputFields()}
        </div>
      )}
    </>
  );
};

export default PublishFormComponent;
