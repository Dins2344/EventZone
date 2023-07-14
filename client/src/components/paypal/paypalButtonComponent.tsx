const baseURL = 'http://localhost:4000'

import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = (): JSX.Element  => {
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
            sku: 'new event',
            quantity: "1000",
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
      console.log('payment succfull', response);
      response.json();
  };

  return (
    
    <PayPalButtons
      createOrder={(data,) => createOrder(data,)}
      onApprove={(data, ) => onApprove(data,)}
    />
    
  );
};

export default PaypalPayment;



