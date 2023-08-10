import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";

const LoggedIn = lazy(() => import("./loggedIn"));
const LoggedOutHeader = lazy(() => import("./logout"));

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
      <Suspense>
        <LoggedIn />
      </Suspense>
    </>
  ) : (
    <>
      <Suspense>
        <LoggedOutHeader />
      </Suspense>
    </>
  );
};

export default Header;
