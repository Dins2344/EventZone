"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuth_1 = require("../../application/usecases/user/userAuth");
const adminAuth_1 = __importDefault(require("../../application/usecases/auth/adminAuth"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const authController = (userDbRepository, userDbRepositoryImpl, authServiceInterface, authServiceImpl, adminDbRepository, adminDbRepositoryImpl, emailServiceInterface, emailServiceImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const emailService = emailServiceInterface(emailServiceImpl());
    const loginAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const token = yield (0, adminAuth_1.default)(email, password, dbRepositoryAdmin, authService);
        res.json({
            status: "success",
            message: "admin verified",
            token,
        });
    }));
    const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const token = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "new user registered",
            token,
        });
    }));
    const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { token, userData } = yield (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
            userData,
        });
    }));
    const OTPLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.params.email;
        const mode = req.params.mode;
        if (mode === "emailVerification") {
            const user = yield (0, userAuth_1.emailVerify)(email, dbRepositoryUser);
            if (user) {
                res.json({ error: "user exist" });
            }
            else {
                emailService.sendEmail(email);
                res.json({ message: "OTP has send", ok: true });
            }
        }
        else if (mode === "OTPLogin") {
            const user = yield (0, userAuth_1.emailVerify)(email, dbRepositoryUser);
            if (user) {
                console.log(user);
                emailService.sendEmail(email);
                res.json({ status: true });
            }
            else {
                res.json({ error: "User not found" });
            }
        }
    }));
    const OTPVerify = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const OTP = req.params.OTP;
        const email = req.params.email;
        const mode = req.params.mode;
        console.log(OTP, email);
        const { message } = emailService.verifyOTP(OTP);
        console.log(message);
        if (message == "OTP verified") {
            if (mode == "signUpOTP") {
                res.json({ OTPValidation: true });
            }
            const token = yield (0, userAuth_1.tokenGenerator)(email, dbRepositoryUser, authService);
            res.json({ OTPValidation: true, token });
        }
        else {
            res.json({ message });
        }
    }));
    const googleLoginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.params.id;
        const decodedData = (0, jwt_decode_1.default)(token);
        console.log(decodedData);
        const user = {
            firstName: decodedData.given_name,
            lastName: decodedData.family_name,
            email: decodedData.email,
            profileImage: decodedData.picture,
            status: "active",
        };
        const isUser = yield (0, userAuth_1.emailVerify)(user.email, dbRepositoryUser);
        if (isUser) {
            const token = yield (0, userAuth_1.googleLogin)(isUser, dbRepositoryUser, authService);
            res.json({ message: "login done", ok: true, token, isUser });
        }
        else {
            const { token, registeredUser: isUser } = yield (0, userAuth_1.googleSignup)(user, dbRepositoryUser, authService);
            res.json({ message: "user sign up done", token, isUser, ok: true });
        }
    }));
    const forgotPasswordController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const user = yield (0, userAuth_1.getUserByEmail)(data.email, dbRepositoryUser);
        const response = yield (0, userAuth_1.changePassword)(data.newPassword, user._id, dbRepositoryUser, authService);
        console.log(response);
        if (response) {
            res.json({ message: "password changed", ok: true });
        }
        else {
            res.json({
                error: "changing password failed",
            });
        }
    }));
    return {
        registerUser,
        loginUser,
        loginAdmin,
        OTPLogin,
        OTPVerify,
        googleLoginController,
        forgotPasswordController,
    };
};
exports.default = authController;
