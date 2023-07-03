import { useState, useEffect } from "react";
import LoggedIn from "./loggedIn";
import LoggedOutHeader from "./logout";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const token = localStorage.getItem("token");
  const loginCheck = (): void => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
  useEffect(() => {
    loginCheck();
  });

  return isLoggedIn ? (
    <>
      <LoggedIn />
    </>
  ) : (
    <>
      <LoggedOutHeader />
    </>
  );
};

export default Header;
