"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../service/authService");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const adminDBRepository_1 = require("../../../application/repositories/adminDBRepository");
const adminRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/adminRepositoryMongoDB");
const sendMailService_1 = require("../../service/sendMailService");
const sendMail_1 = require("../../../application/services/sendMail");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(userDBRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, authServiceInterface_1.authServiceInterface, authService_1.authService, adminDBRepository_1.adminDbRepository, adminRepositoryMongoDB_1.adminRepositoryMongoDB, sendMail_1.sendEmailServiceInterface, sendMailService_1.sendEmailService);
    router.post("/register-user", controller.registerUser);
    router.post('/user-login', controller.loginUser);
    router.get('/user-email-verify/:email/:mode', controller.OTPLogin);
    router.get('/user-OTP-verify/:OTP/:email/:mode', controller.OTPVerify);
    router.post('/admin-login', controller.loginAdmin);
    router.get('/user-google-login/:id', controller.googleLoginController);
    router.post('/forgot-password', controller.forgotPasswordController);
    return router;
};
exports.default = authRouter;
