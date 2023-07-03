import { Outlet } from "react-router-dom";
import useIsOnline from "../hooks/useIsOnline";
import Header from "../components/user_components/headerComponents/header";
import HeaderWithSideBar from "../components/admin_components/headerWithsidebar";
import store from "../redux/store";
import { Provider } from "react-redux";
import OrganizationHeader from "../components/organizer_components/header";

export const AdminHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <HeaderWithSideBar />
      <div className="p-4 sm:ml-64 mt-12">
        <Outlet />
      </div>
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};
export const RegisterHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};
export const UserHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};

export const OrganizerHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <Provider store={store}>
        <OrganizationHeader />
        <div className="p-4 sm:ml-64 mt-12">
          <Outlet />
        </div>
      </Provider>
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};
