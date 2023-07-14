import ReactDOM from "react-dom/client";
import appRouter from "./main";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import { PayPalScriptProvider, } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "AbFRCW1C4URGHswVD8LvdiZYhdV2h8LvKxEgXvJ-padQl5K3GxPk8uwFrkqdW8VZvjOIuSSuNU7lCE2g",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <React.StrictMode>
      <ThemeProvider>
        <PayPalScriptProvider options={initialOptions}>
          <Provider store={store}>
            <RouterProvider router={appRouter} />
          </Provider>
        </PayPalScriptProvider>
      </ThemeProvider>
    </React.StrictMode>
  </>
);
