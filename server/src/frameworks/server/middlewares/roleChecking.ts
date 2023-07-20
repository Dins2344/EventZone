import { CustomRequest } from "../../../types/userInterface"
import { Response,NextFunction } from "express"
import AppError from "../../../utils/appError"
import { HttpStatus } from "../../../types/httpStatus"

export const adminRoleChecking = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const role = req?.user?.role
    if(role === 'admin'){
        next()
    }else{
        throw new AppError('unauthorized admin role',HttpStatus.UNAUTHORIZED)
    }
}


export const userRoleChecking = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const role = req?.user?.role
    if(role === 'user'){
        next()
    }else{
        throw new AppError('unauthorized user role',HttpStatus.UNAUTHORIZED)
    }
}