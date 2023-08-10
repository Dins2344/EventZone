import { Outlet } from "react-router-dom";
import Header from "../../components/user_components/headerComponents/header";
import useIsOnline from "../../hooks/useIsOnline";

 const RegisterHome: React.FC = () => {
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
export default RegisterHome