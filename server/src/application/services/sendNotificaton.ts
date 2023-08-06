import { SendNotificationMail } from "../../frameworks/service/sendNotificationMail";

export const sendNotificationMails = (
  service: ReturnType<SendNotificationMail>
) => {
  const sendEmail = async (email: string,message:string) => {
   return await service.sendEmail(email,message);
  };

  return {
    sendEmail
  };
};

export type SendNotificationMails = typeof sendNotificationMails;
