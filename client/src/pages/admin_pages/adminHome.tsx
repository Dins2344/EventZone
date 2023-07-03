
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLanding = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    const navigate = useNavigate()
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
           
            <p>Admin landing page</p>
          </>
        );
      } else {
        navigate("/admin/login");
        return null;
      }
}


export default AdminLanding