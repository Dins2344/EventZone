const baseURL = "http://localhost:4000";
import { ticketBooking } from "../../api/userAuth/userApis";
import {
  RegisteredBookingInterface,
  ticketBookingCreationInterface,
} from "../../types/userInterface";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



type paypalPaymentProps = {
  total: number;
  eventName: string;
  registerInfo: ticketBookingCreationInterface;
  setBookingRes: React.Dispatch<
    React.SetStateAction<RegisteredBookingInterface | undefined>
  >;
};

const PaypalPayment: React.FC<paypalPaymentProps> = ({
  // total,
  eventName,
  registerInfo,
  setBookingRes,
}): JSX.Element => {
  // const totalString = total.toString()
  const createOrder = (data: any): Promise<string> => {
    console.log(data)
    // Order is created on the server and the order id is returned
    return fetch(`${baseURL}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: {
          sku: { eventName },
          quantity: "500",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data: any): Promise<any> => {
    // Order is captured on the server and the response is returned to the browser
    const res = fetch(`${baseURL}/my-server/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => {
      if (response.ok) {
        ticketBooking(registerInfo).then((response: any) => {
          if (response) {
            notify();
            setBookingRes(response.data.response);
          }
          return response;
        });
      }
      return response;
    });
    return res;
  };
  const notify = () => {
    toast.success("Successfully booked tickets!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <PayPalButtons
        createOrder={(data) => createOrder(data)}
        onApprove={(data) => onApprove(data)}
      />
      <ToastContainer
      className='z-50'
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default PaypalPayment;
