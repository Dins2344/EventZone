import { Outlet } from "react-router-dom";
import useIsOnline from "../hooks/useIsOnline";
import Header from "../components/user_components/headerComponents/header";
import HeaderWithSideBar from "../components/admin_components/headerWithsidebar";
import OrganizationHeader from "../components/organizer_components/header";
import Footer from "../components/user_components/headerComponents/footer";



export const AdminHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <HeaderWithSideBar />
      <div className="p-4 sm:ml-64 mt-12">
        <Outlet />
      </div>
      <Footer />
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
        <Header />
        <Outlet />
     
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
        <Header />
        <Outlet />
        <Footer />
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
        <OrganizationHeader />
        <div className="p-4 sm:ml-64 mt-12">
          <Outlet />
        </div>
        <Footer />
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};
