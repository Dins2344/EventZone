import { Request, Response } from "express";
import { UserRegisterInterface } from "../../types/user";
import {
  userRegister,
  userLogin,
  emailVerify,
  tokenGenerator,
} from "../../application/usecases/user/userAuth";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/service/authService";
import adminLogin from "../../application/usecases/auth/adminAuth";
import { AdminDbInterface } from "../../application/repositories/adminDBRepository";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/adminRepositoryMongoDB";
import { SendEmailServiceInterface } from "../../application/services/sendMail";
import { SendEmailService } from "../../frameworks/service/sendMailService";
import asyncHandler from "express-async-handler";

const authController = (
  userDbRepository: UserDBInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB,
  emailServiceInterface: SendEmailServiceInterface,
  emailServiceImpl: SendEmailService
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
  const emailService = emailServiceInterface(emailServiceImpl());

  const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const token = await adminLogin(
      email,
      password,
      dbRepositoryAdmin,
      authService
    );
    res.json({
      status: "success",
      message: "admin verified",
      token,
    });
  });

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: UserRegisterInterface = req.body;
    const token = await userRegister(user, dbRepositoryUser, authService);
    res.json({
      status: "success",
      message: "new user registered",
      token,
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { token, userData } = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
      userData,
    });
  });
  const OTPLogin = asyncHandler(async (req: Request, res: Response) => {
    const email: string = req.params.email;
    const mode:string = req.params.mode
    if(mode === 'emailVerification'){
      const user = await emailVerify(email, dbRepositoryUser);
      if(user){
        res.json({error:'user exist'})
      }else{
        emailService.sendEmail(email)
        res.json({message:'OTP has send',ok:true})
      }
    }else if(mode === 'OTPLogin'){
      const user = await emailVerify(email, dbRepositoryUser);
      if (user) {
        console.log(user);
        emailService.sendEmail(email);
        res.json({ status: true });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });

  const OTPVerify = asyncHandler(async (req: Request, res: Response) => {
    const OTP: string = req.params.OTP;
    const email: string = req.params.email;
    const mode :string = req.params.mode
    console.log(OTP, email);
    const { message } = emailService.verifyOTP(OTP);
    console.log(message);
    if (message == "OTP verified") {
      if(mode == 'signUpOTP'){
        res.json({ OTPValidation: true, })
      }
      const token = await tokenGenerator(email, dbRepositoryUser, authService);
      res.json({ OTPValidation: true, token });
    } else {
      res.json({ message });
    }
  });
  return {
    registerUser,
    loginUser,
    loginAdmin,
    OTPLogin,
    OTPVerify,
  };
};

export default authController;
