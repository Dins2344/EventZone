import { Application } from "express";
import authRouter from "./auth";
import adminRouter from "./admin";
import userRouter from "./user";
import organizationRouter from "./organization";
import paypalRouter from "./paypal";
import jwtAuthMiddleware from "../middlewares/authJWT";




const routes = (app:Application)=>{
    app.use('/auth',authRouter())
    app.use('/admin',jwtAuthMiddleware,adminRouter())
    app.use('/user',jwtAuthMiddleware,userRouter())
    app.use('/organization',jwtAuthMiddleware,organizationRouter())
    app.use('/my-server',paypalRouter())
}


export default routes