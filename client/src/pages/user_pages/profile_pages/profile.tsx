import { useNavigate } from "react-router-dom";
import ProfileDetail from "../../../components/user_components/profile_components/profileDetail";
import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";

const ProfileActivities = lazy(
  () =>
    import(
      "../../../components/user_components/profile_components/userActivities"
    )
);

const ProfilePage: React.FC = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setToken(token);
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {token && (
        <div className="flex flex-wrap px-7 md:px-20 lg:px-32 xlg:px-44 mt-12 min-h-screen mb-10">
          <div className="w-full md:w-4/12">
            <ProfileDetail />
          </div>
          <div className=" w-full md:w-8/12">
            <Suspense>
              <ProfileActivities />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
