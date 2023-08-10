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
exports.sendNotificationMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const sendNotificationMail = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.MAIL_ID,
            pass: config_1.default.MAIL_PASSWORD,
        },
    });
    const sendEmail = (email, message) => __awaiter(void 0, void 0, void 0, function* () {
        const mailOptions = {
            from: "dinson.cd@gmail.com",
            to: email,
            subject: "Notification from Event Zone",
            text: message,
        };
        yield transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            }
            else {
                console.log("Email sent:", info.response);
                return { message: 'mail send', ok: true };
            }
        });
    });
    return {
        sendEmail,
    };
};
exports.sendNotificationMail = sendNotificationMail;
