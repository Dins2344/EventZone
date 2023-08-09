import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// import DashboardComponents from "../../components/admin_components/dashboardComponents";
const DashboardComponents = lazy(
  () => import("../../components/admin_components/dashboardComponents")
);

const AdminLanding = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const loginCheck = (): void => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
  useEffect(() => {
    loginCheck();
  });
  if (isLoggedIn) {
    return (
      <>
        <div className="min-h-screen px-4">
          <Suspense>
            <DashboardComponents />
          </Suspense>
        </div>
      </>
    );
  } else {
    navigate("/admin/login");
    return null;
  }
};

export default AdminLanding;
