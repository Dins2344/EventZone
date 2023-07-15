const baseURL = 'http://localhost:4000'
import { ticketBooking } from "../../api/userAuth/userApis";
import { RegisteredBookingInterface, ticketBookingCreationInterface } from "../../types/userInterface";
import { PayPalButtons } from "@paypal/react-paypal-js";

type paypalPaymentProps = {
total:number,
eventName:string
registerInfo:ticketBookingCreationInterface
setBookingRes: React.Dispatch<React.SetStateAction<RegisteredBookingInterface | undefined>>;
}

const PaypalPayment :React.FC<paypalPaymentProps> = ({total,eventName,registerInfo,setBookingRes}): JSX.Element  => {
  const totalString = total.toString()
  const createOrder = (data: any): Promise<string> => {
    // Order is created on the server and the order id is returned
    return fetch(`${baseURL}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: 
          {
            sku: {eventName},
            quantity:'500'
          },
        
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove =  (data: any): Promise<any> => {
    // Order is captured on the server and the response is returned to the browser
    const res = fetch(`${baseURL}/my-server/capture-paypal-order`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              orderID: data.orderID,
          }),
      }).then((response)=>{
        if(response.ok){
          ticketBooking(registerInfo).then((response:any)=>{
            if(response){
              setBookingRes(response.data.response)
            }
            return response
          })
        }
        return response
      })
      return res
     
  };

  return (
    
    <PayPalButtons
      createOrder={(data,) => createOrder(data,)}
      onApprove={(data, ) => onApprove(data,)}
    />
    
  );
};

export default PaypalPayment;



