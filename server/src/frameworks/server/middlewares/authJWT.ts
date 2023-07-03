import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { authService } from "../../service/authService";


import { Request } from "express";

interface CustomRequest extends Request {
   user?:string;
}

const  jwtAuthMiddleware=(req:CustomRequest,res:Response,next:NextFunction)=>{
    let token:string | null='';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        throw new AppError("Token not found",HttpStatus.UNAUTHORIZED)
    }
    try{
    const {payload}:any=authService().verifyToken(token)
    req.user=payload
    next()
    }catch(err){
        throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
    }
}

export default jwtAuthMiddleware