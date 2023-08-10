"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../../adapters/controllers/user_side/user"));
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../service/authService");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, user_1.default)(userDBRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, authServiceInterface_1.authServiceInterface, authService_1.authService);
    router.post("/", authJWT_1.default, controller.accessChatController);
    router.get('/get-chats', authJWT_1.default, controller.getUsersChatController);
    router.post('/send-message', authJWT_1.default, controller.sendMessageController);
    router.get('/get-chat-messages/:id', authJWT_1.default, controller.getAllMessageController);
    return router;
};
exports.default = chatRouter;
