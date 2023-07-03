import { useNavigate } from "react-router-dom";
import OTPVerifyForm from "../../components/user_components/OTPVerify";
import { useEffect, useState } from "react";

const OTPVerifyPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const loginCheck = (): void => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
  useEffect(() => {
    loginCheck();
  });

  if (isLoggedIn) {
    navigate("/");
  } else {
    return (
      <>
        <OTPVerifyForm />
      </>
    );
  }
};

export default OTPVerifyPage;
