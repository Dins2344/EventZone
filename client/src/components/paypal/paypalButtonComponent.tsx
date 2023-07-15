const baseURL = 'http://localhost:4000'

import { PayPalButtons } from "@paypal/react-paypal-js";
type paypalPaymentProps = {
total:number,
eventName:string
}

const PaypalPayment :React.FC<paypalPaymentProps> = ({total,eventName}): JSX.Element  => {
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

  const onApprove = async (data: any): Promise<any> => {
    // Order is captured on the server and the response is returned to the browser
    const response = await fetch(`${baseURL}/my-server/capture-paypal-order`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              orderID: data.orderID,
          }),
      });
      console.log('payment successful', response.json());
      return response.json();
  };

  return (
    
    <PayPalButtons
      createOrder={(data,) => createOrder(data,)}
      onApprove={(data, ) => onApprove(data,)}
    />
    
  );
};

export default PaypalPayment;



