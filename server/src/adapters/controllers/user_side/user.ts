import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { Request,Response } from "express";
import asyncHandler from "express-async-handler"
import { CustomRequest } from "../../../types/userInterface";



const userController  = (
    userDbRepository: UserDBInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB,
)=>{

    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());

    const getUserByEmail = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const email = req.user?.email
        if(email){
            const data = await dbRepositoryUser.getUserByEmail(email)
            if(data){
                res.json({data})
            }else{
                res.json({error:'user data fetching failed'})
            }
        }else{
            res.json({error:'fetching id from api bearer failed'})
        }
    })



    return {
        getUserByEmail
    }
}


export default userController