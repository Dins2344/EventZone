import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useIsOnline from "../../hooks/useIsOnline";
import OrganizationHeader from "../../components/organizer_components/header";
import Footer from "../../components/user_components/headerComponents/footer";

const OrganizerHome: React.FC = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setToken(token);
    if (!token) {
      navigate("/");
    }
  }, []);

  const online = useIsOnline();
  return online ? (
    <>
      {token && (
        <>
          <OrganizationHeader />
          <div className="p-4 sm:ml-64 mt-12">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  ) : (
    <>
      <p>your offline</p>
    </>
  );
};

export default OrganizerHome
