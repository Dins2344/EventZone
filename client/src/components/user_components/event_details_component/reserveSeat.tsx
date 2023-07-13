import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCompleteEventDetails } from "../../../api/userAuth/userApis";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

type ReserveSeatProps = {
  ticketValue: string;
  eventId: string;
};

const ReserveSeatComponent: React.FC<ReserveSeatProps> = ({
  ticketValue,
  eventId,
}) => {
  const [eventDetail, setEventDetails] = useState();
  const [ticketPass, setTicketPass] = useState(1);

  const [size, setSize] = useState<null | string>(null);
  const fetchEventDetails = async () => {
    const data = await getCompleteEventDetails(eventId);
    const details = data?.data.data[0];
    details && setEventDetails(details);
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const handleOpen = (value: string | null) => setSize(value);
  const handleIncrement = () => {
    setTicketPass(ticketPass + 1);
  };
  const handleDecrement = () => {
    setTicketPass(ticketPass - 1);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      agreeTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  return (
    <>
      <div className=" w-full p-5  sticky md:top-0 bg-white">
        <div className="flex flex-col border-2 p-5 rounded-md ">
          <div className="flex mb-3">
            <label className="mr-2">entry pass : </label>
            <Button
              size="sm"
              variant="text"
              className="w-6 h-6 p-0 "
              onClick={handleDecrement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 12H6"
                />
              </svg>
            </Button>
            <input className="w-1/12 p-0 m=0" type="text" value={ticketPass} />
            <Button
              size="sm"
              variant="text"
              className="w-6 h-6 p-0"
              onClick={handleIncrement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </Button>
          </div>

          <label className="mb-3">Ticket type : {ticketValue}</label>

          <Button onClick={() => handleOpen("xl")} color="deep-orange">
            Reserve a spot
          </Button>
        </div>
      </div>
      <div className="mb-3 flex gap-3"></div>
      <Dialog open={size === "xl"} size={size} handler={handleOpen}>
        <DialogHeader>
          <div className="flex justify-end w-full">
            <button onClick={() => handleOpen(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <div className="w-full flex">
            <div className="w-full md:w-8/12 md:px-14">
              <div className="flex justify-center w-11/12 mb-5">
                <h3 className="text-3xl font-bold text-black">Checkout</h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                  <div className="px-3">
                    <h3 className="text-3xl font-bold dark:text-white mt-2 mb-5">
                      Contact Information
                    </h3>
                  </div>
                  <div className="flex px-2 mb-4">
                    <div className="flex flex-col w-1/2  px-2">
                      {/* <Input variant="outlined" label="First name" /> */}
                      <Input
                        variant="outlined"
                        label="First name"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.firstName && formik.touched.firstName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.errors.firstName && formik.touched.firstName && (
                        <div className="text-red-500">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/2  px-2 ">
                      {/* <Input variant="outlined" label="Last name" /> */}
                      <Input
                        variant="outlined"
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.lastName && formik.touched.lastName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.errors.lastName && formik.touched.lastName && (
                        <div className="text-red-500">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex px-2 mb-4">
                    <div className="flex flex-col w-1/2 gap-6 px-2">
                      <Input variant="outlined" label="email address" />
                    </div>
                    <div className="flex flex-col w-1/2 px-2">
                      {/* <Input variant="outlined" label="phone number" /> */}
                      <Input
                        variant="outlined"
                        label="phone number"
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.phoneNumber &&
                          formik.touched.phoneNumber
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <div className="text-red-500">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="px-4 mb-3">
                    <label>
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formik.values.agreeTerms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {' '}I agree with the
                      <a
                        href="#"
                        className="font-medium hover:text-blue-700 transition-colors"
                      >
                        &nbsp;terms and conditions
                      </a>
                      .
                    </label>
                    {formik.errors.agreeTerms && formik.touched.agreeTerms && (
                      <div className="text-red-500">
                        {formik.errors.agreeTerms}
                      </div>
                    )}
                  </div>
                  <div className="px-3">
                    <Button
                      type="submit"
                      size="md"
                      color="deep-orange"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="md:w-4/12 hidden md:block">
              <div className="flex flex-col">
                <img
                  className="h-full w-full rounded-lg shadow-xl shadow-blue-gray-900/50 mb-8"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <h5 className="text-xl font-bold dark:text-white mt-1 mb-5">
                  Order summary
                </h5>
                <div className="flex justify-between px-2 mt-1 mb-5 border-b-2">
                  <p className="flex">
                    1{"  "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {"  "}
                    {eventDetail && eventDetail.eventName}
                  </p>
                  <p>{eventDetail && eventDetail.ticketPrice}</p>
                </div>
                <div className="flex justify-between px-2 mb-5 border-b-2">
                  <p className="flex">
                    {ticketPass}
                    {"  "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {"  "}e-ticket
                  </p>
                  <p>{eventDetail && ticketPass * eventDetail.ticketPrice}</p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">
                    {eventDetail && ticketPass * eventDetail.ticketPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ReserveSeatComponent;
