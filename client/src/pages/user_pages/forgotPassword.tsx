import ForgotPasswordComponents from "../../components/user_components/forgotPasswordComponents";
import { LoginImage } from "../../components/user_components/loginForm";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex w-full h-screen justify-center overflow-hidden items-center">
        <div className="lg:w-1/2 w-full">
      <ForgotPasswordComponents />
        </div>
        <LoginImage/>
      </div>
    </>
  );
};

export default ForgotPassword;
