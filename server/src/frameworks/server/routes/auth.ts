import express from "express";
import authController from "../../../adapters/controllers/authController";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import { authService } from "../../service/authService";
import { adminDbRepository } from "../../../application/repositories/adminDBRepository";
import { adminRepositoryMongoDB } from "../../database/mongoDB/repositories/adminRepositoryMongoDB";
import { sendEmailService } from "../../service/sendMailService";
import { sendEmailServiceInterface } from "../../../application/services/sendMail";


const authRouter = () => {
  const router = express.Router();
  const controller = authController(
    userDbRepository,
    userRepositoryMongoDB,
    authServiceInterface,
    authService,
    adminDbRepository,
    adminRepositoryMongoDB,
    sendEmailServiceInterface,
    sendEmailService
  );

  router.post("/register-user", controller.registerUser);
  router.post('/user-login',controller.loginUser)
  router.get('/user-email-verify/:id' ,controller.OTPLogin)
  router.get('/user-OTP-verify/:OTP/:email',controller.OTPVerify)
  router.post ('/admin-login',controller.loginAdmin)

  return router;
};

export default authRouter;
