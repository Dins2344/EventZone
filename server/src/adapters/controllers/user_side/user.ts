import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { Request,Response } from "express";
import asyncHandler from "express-async-handler"
import { CustomRequest } from "../../../types/userInterface";
import { getApprovedEvents } from "../../../application/usecases/user/userAuth";



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


    const getApprovedEventsController =asyncHandler(async(req:Request,res:Response)=>{
        const data = await getApprovedEvents(dbRepositoryUser) 
        if(data){
            res.json({message:'approved events fetched', data})
        }else{
            res.json({error:'approved events fetching failed'})
        }
    })


    return {
        getUserByEmail,
        getApprovedEventsController
    }
}


export default userController