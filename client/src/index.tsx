import ReactDOM from "react-dom/client";
import appRouter from "./main";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={appRouter} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </>
);
