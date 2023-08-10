import { Outlet } from "react-router-dom";
import HeaderWithSideBar from "../../components/admin_components/headerWithsidebar";
import useIsOnline from "../../hooks/useIsOnline";
import Footer from "../../components/user_components/headerComponents/footer";

const AdminHome: React.FC = () => {
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

export default AdminHome
