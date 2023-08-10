"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailServiceInterface = void 0;
const sendEmailServiceInterface = (service) => {
    const sendEmail = (email) => {
        service.sendEmail(email);
    };
    const verifyOTP = (OTP) => {
        const response = service.verifyOTP(OTP);
        return response;
    };
    return {
        sendEmail, verifyOTP
    };
};
exports.sendEmailServiceInterface = sendEmailServiceInterface;
