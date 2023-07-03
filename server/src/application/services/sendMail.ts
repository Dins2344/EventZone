import { SendEmailService } from "../../frameworks/service/sendMailService";

export const sendEmailServiceInterface = (
  service: ReturnType<SendEmailService>
) => {
  const sendEmail = (email: string, ) =>{
    service.sendEmail(email);
  }

  const verifyOTP = (OTP:string)=>{
    const response = service.verifyOTP(OTP)
    return response
  }

  return {
    sendEmail,verifyOTP
  };
};

export type SendEmailServiceInterface = typeof sendEmailServiceInterface