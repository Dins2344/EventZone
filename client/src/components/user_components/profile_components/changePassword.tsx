import { Button, Input } from "@material-tailwind/react";
import  { useState } from "react";
import { changePassword, verifyPassword } from "../../../api/userAuth/userApis";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordOk, setPasswordOk] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePassword = async () => {
    const res = await verifyPassword(password);
    if (res?.data.ok) {
      setError("");
      setPasswordOk(true);
    } else {
      setError("Entered password is not correct");
    }
  };
  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      const res = await changePassword(newPassword);
      if (res?.data.ok) {
        setError("");
      }
    } else {
      setError("confirm password does not match with new password you entered");
    }
  };
  return (
    <div className="px-5 md:px-10 lg:px-40 mt-5">
      <h3 className="font-semibold text-sm md:text-lg lg:text-xl">
        Change password
      </h3>

      <div className="mt-5">
        {error.length > 0 && <p className="text-red-500 my-2">{error}</p>}
        {passwordOk ? (
          <div className="flex flex-col items-end w-4/12">
            <div className="my-2 w-full">
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="enter your new password"
              ></Input>
            </div>
            <div className="my-2 w-full">
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="confirm your password"
              ></Input>
            </div>
            <Button size="sm" onClick={handleChangePassword} className="ml-3">
              Submit
            </Button>
          </div>
        ) : (
          <div className="flex w-4/12">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="enter your current password"
            ></Input>
            <Button
              size="sm"
              onClick={handlePassword}
              className="ml-3 px-3 w-32 h-10"
            >
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
