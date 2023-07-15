import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { Request,Response } from "express";
import asyncHandler from "express-async-handler"
import { CustomRequest, ticketBookingCreationInterface } from "../../../types/userInterface";
import { cancelBooking, createBooking, getApprovedEvents,getBookings,getCompleteEventDetails, getOneBookingDetails } from "../../../application/usecases/user/userAuth";



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

    const getCompleteEventDetailsController = asyncHandler(async(req:Request,res:Response)=>{
        const id : string = req.params.id
        const data = await getCompleteEventDetails(id,dbRepositoryUser)
        if(data){
            res.json({message:'event details fetch done',data})
        }else{
            res.json({error:'event fetching failed'})
        }
    })

    const createBookingController = asyncHandler(async(req:Request,res:Response)=>{
        const data:ticketBookingCreationInterface = req.body
        const response = await createBooking(data,dbRepositoryUser)
        if(response){
            res.json({message:'booking confirmed', response})
        }else{
            res.json({error:'booking failed'})
        }
    })

    const getBookingsController = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId=req.user?.Id
        if(userId){
            const data = await getBookings(userId,dbRepositoryUser)
            if(data){
                res.json({message:'fetching booking details done',data})
            }else{
                res.json({error:'fetching booking details failed'})
            }
        }
    })

    const getOneBookingDetailsController = asyncHandler(async(req:Request,res:Response)=>{
        const bookingId:string = req.params.bookingId
        const data = await getOneBookingDetails(bookingId,dbRepositoryUser)
        if(data){
            res.json({message:'fetching booking details done',data})
        }else{
            res.json({error:'fetching details failed'})
        }
    })

    const cancelBookingController = asyncHandler(async(req:Request,res:Response)=>{
        const bookingId:string = req.params.id
        console.log(bookingId)
        const response = await cancelBooking(bookingId,dbRepositoryUser)
        if(response){
            res.json({message:'canceling order done',response})
        }else{
            res.json({error:'canceling order failed'})
        }
    })

    return {
        getUserByEmail,
        getApprovedEventsController,
        getCompleteEventDetailsController,
        createBookingController,
        getBookingsController,
        getOneBookingDetailsController,
        cancelBookingController
    }
}


export default userController