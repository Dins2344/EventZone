"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    MAIL_ID: process.env.SENDING_MAIL_ID,
    MAIL_PASSWORD: process.env.SENDING_MAIL_PASSWORD,
    // cloudinary
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    // paypal
    CLIENT_ID: process.env.CLIENT_ID,
    APP_SECRET: process.env.APP_SECRET,
};
exports.default = configKeys;
