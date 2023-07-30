import express from "express";

import userController from "../../../adapters/controllers/user_side/user";
import jwtAuthMiddleware from "../middlewares/authJWT";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authService } from "../../service/authService";

const chatRouter = () => {
    const router = express.Router();
     const controller = userController(
       userDbRepository,
       userRepositoryMongoDB,
       authServiceInterface,
       authService
     );

    router.post("/", jwtAuthMiddleware, controller.accessChatController);
    router.get('/get-chats', jwtAuthMiddleware, controller.getUsersChatController)
    router.post('/send-message', jwtAuthMiddleware, controller.sendMessageController)
    router.get('/get-chat-messages/:id',jwtAuthMiddleware,controller.getAllMessageController)

  

  return router;
};

export default chatRouter;
