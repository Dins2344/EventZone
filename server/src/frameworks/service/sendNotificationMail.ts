import nodemailer, { Transporter } from "nodemailer";
import configKeys from "../../config";

export const sendNotificationMail = () => {
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: configKeys.MAIL_ID,
      pass: configKeys.MAIL_PASSWORD,
    },
  });


  const sendEmail = async (email: string , message:string) => {
    
    const mailOptions = {
      from: "dinson.cd@gmail.com",
      to: email,
      subject: "Notification from Event Zone",
      text: message,
    };
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
        return {message:'mail send' ,ok:true}
      }
   });
  };

  return {
    sendEmail,
  };
};

export type SendNotificationMail = typeof sendNotificationMail;
