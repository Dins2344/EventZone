import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { Request,Response } from "express";
import asyncHandler from "express-async-handler"



const userController  = (
    userDbRepository: UserDBInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB,
)=>{

    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());

    const getUserByEmail = asyncHandler(async(req:Request,res:Response)=>{
        const email = req.params.id
        const data = await dbRepositoryUser.getUserByEmail(email)
        if(data){
            res.json({data})
        }else{
            res.status(404).json({error:'user data fetching failed'})
        }
    })
  

    return {
        getUserByEmail
    }
}


export default userController