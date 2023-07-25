import { Outlet, useNavigate } from "react-router-dom";
import useIsOnline from "../hooks/useIsOnline";
import Header from "../components/user_components/headerComponents/header";
import HeaderWithSideBar from "../components/admin_components/headerWithsidebar";
import OrganizationHeader from "../components/organizer_components/header";
import Footer from "../components/user_components/headerComponents/footer";
import { useEffect, useState } from "react";

export const AdminHome: React.FC = () => {
  const online = useIsOnline();
  return online ? (
    <>
      <HeaderWithSideBar />
      <div className="px-4 py-8 sm:ml-64 mt-12 bg-blue-gray-50">
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
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setToken(token);
    if(!token){
      navigate('/')
    }
  }, []);

  const online = useIsOnline();
  return online ? (
    <>
    {token && 
        <>
          <OrganizationHeader />
          <div className="p-4 sm:ml-64 mt-12">
            <Outlet />
          </div>
          <Footer />
        </>
    }
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};
