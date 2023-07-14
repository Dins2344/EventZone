import dotenv from "dotenv";

dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.MONGO_DB_URL as string,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME as string,
  JWT_SECRET: process.env.JWT_SECRET_KEY as string,
  MAIL_ID: process.env.SENDING_MAIL_ID as string,
  MAIL_PASSWORD: process.env.SENDING_MAIL_PASSWORD as string,
  // cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  API_KEY: process.env.API_KEY as string,
  API_SECRET_KEY: process.env.API_SECRET_KEY as string,

  // paypal
  CLIENT_ID: process.env.CLIENT_ID,
  APP_SECRET: process.env.APP_SECRET,
};

export default configKeys;
