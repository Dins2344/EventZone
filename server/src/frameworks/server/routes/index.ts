import { Application } from "express";
import authRouter from "./auth";
import adminRouter from "./admin";
import userRouter from "./user";
import organizationRouter from "./organization";
import paypalRouter from "./paypal";
import jwtAuthMiddleware from "../middlewares/authJWT";
import { adminRoleChecking } from "../middlewares/roleChecking";
import { userRoleChecking } from "../middlewares/roleChecking";
import chatRouter from "./chat";




const routes = (app:Application)=>{
    app.use('/api/auth',authRouter())
    app.use('/api/admin',jwtAuthMiddleware,adminRoleChecking,adminRouter())
    app.use('/api/api/user',userRouter())
    app.use('/api/organization',jwtAuthMiddleware,userRoleChecking,organizationRouter())
    app.use('/api/my-server', paypalRouter())
    app.use('/api/user/chat',chatRouter())
}


export default routes