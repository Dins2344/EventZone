import { Application } from "express";
import authRouter from "./auth";
import adminRouter from "./admin";
import userRouter from "./user";
import organizationRouter from "./organization";
import paypalRouter from "./paypal";
import jwtAuthMiddleware from "../middlewares/authJWT";
import { adminRoleChecking } from "../middlewares/roleChecking";
import { userRoleChecking } from "../middlewares/roleChecking";




const routes = (app:Application)=>{
    app.use('/auth',authRouter())
    app.use('/admin',jwtAuthMiddleware,adminRoleChecking,adminRouter())
    app.use('/user',userRouter())
    app.use('/organization',jwtAuthMiddleware,userRoleChecking,organizationRouter())
    app.use('/my-server',paypalRouter())
}


export default routes