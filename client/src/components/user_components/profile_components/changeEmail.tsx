import {
  Button,
  Input,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { updateEmail, verifyPassword } from "../../../api/userAuth/userApis";
import { OTPRequestPost, OTPVerifyPost } from "../../../api/userAuth/signUp";

const ChangeEmail: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [OTP, setOTP] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handlePasswordVerify = async () => {
    const res = await verifyPassword(password);
    console.log(res);
    if (res?.data.ok) {
      setPasswordVerified(true);
    } else {
      setPasswordVerified(false);
    }
  };

  const handleSendOTP = async () => {
    const mode = "emailVerification";
    const res = await OTPRequestPost(email, mode);
    console.log(res);
    if (res?.data.ok) {
      setEmailVerified(true);
    }
  };

  const handleOTPVerify = async () => {
    const mode = "signUpOTP";
    const res = await OTPVerifyPost(OTP, email, mode);
    console.log(res);
    if (res?.data.OTPValidation) {
      handleOpen()
      const res = await updateEmail(email)
      console.log(res)
    }
  };
  return (
    <>
      <div className="px-5 md:px-10 lg:px-40 mt-5">
        <h3 className="font-semibold text-sm md:text-lg lg:text-xl">
          Change E-mail
        </h3>
        {emailVerified ? (
          <div className="mt-5">
            <div className="flex w-4/12">
              <Input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                label="enter your OTP"
              ></Input>
              <Button onClick={handleOTPVerify} className="ml-3">
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            {!passwordVerified ? (
              <div className="flex w-4/12">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="enter your password"
                ></Input>
                <Button onClick={handlePasswordVerify} className="ml-3">
                  Verify
                </Button>
              </div>
            ) : (
              <div className="flex w-4/12">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="enter your new E-mail"
                ></Input>
                <Button onClick={handleSendOTP} className="ml-3 px-3 w-32 h-10">
                  Send OTP
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <>
        <Dialog size="sm" open={open} handler={handleOpen}>
          <DialogBody>
            <TimerModal handleOpen = {handleOpen}/>
          </DialogBody>
        </Dialog>
      </>
    </>
  );
};

export default ChangeEmail;

interface TimerModalProp{
  handleOpen:()=>void
}

const TimerModal: React.FC <TimerModalProp>= ({handleOpen}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(5);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); 
    if(timeRemaining === 0){
      localStorage.removeItem('token')
      handleOpen()
      window.location.reload()
    }
    return () =>{
      clearTimeout(timerId);
    } 
  }, [timeRemaining]);
  return (
    <>
      <div className="flex flex-col items-center">
        <p>You will be logged out soon, so please re-login!</p>
        <h3 className="font-semibold text-sm md:text-lg lg:text-xl">{timeRemaining} Seconds</h3>
      </div>
    </>
  );
};
