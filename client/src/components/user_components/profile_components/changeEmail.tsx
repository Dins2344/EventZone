import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const ChangeEmail: React.FC = () => {
    const [password,setPassword] = useState('')
    const handlePasswordVerify = ()=>{
        const res = verifyPassword()
        console.log(res)
    }
  return (
    <>
      <div className="px-5 md:px-10 lg:px-40 mt-5">
        <h3 className="font-semibold text-sm md:text-lg lg:text-xl">
          Change E-mail
        </h3>

        <form className="mt-5">
          <div className="flex w-4/12">
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} label="enter your password"></Input>
            <Button onClick={handlePasswordVerify} className="ml-3">verify</Button>
          </div>
          {/* <Input label="enter new email"></Input> */}
        </form>
      </div>
    </>
  );
};

export default ChangeEmail;
