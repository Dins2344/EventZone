import { Outlet } from "react-router-dom";
import Footer from "../../components/user_components/headerComponents/footer";
import Header from "../../components/user_components/headerComponents/header";
import useIsOnline from "../../hooks/useIsOnline";

const UserHome: React.FC = () => {
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

export default UserHome