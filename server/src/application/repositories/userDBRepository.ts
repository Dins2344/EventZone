import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { BookingCreationInterface, CreateUserInterface } from "../../types/userInterface";


export const userDbRepository = (repository:ReturnType<UserRepositoryMongoDB>)=>{
    const getUserByEmail = async(email:string)=>{
        return await repository.getUserByEmail(email)
    }
    const addUser = async(user:CreateUserInterface)=>{
       return await repository.addUser(user)
    }

    const addOrganization = async(orgId:string,userId:string)=>{
        return await repository.addOrganization(orgId,userId)
    }

    const getApprovedEvents = async()=>{
        return await repository.getApprovedEvents()
    }

    const getCompleteEventDetails = async(id:string)=>{
        return await repository.getCompleteEventDetails(id)
    }

    const createBooking = async(data:BookingCreationInterface)=>{
        const res = await repository.createBooking(data)
        return res
    }

    const getBookings = async(userId:string)=>{
        const data = await repository.getBookings(userId)
        return data
    }

    const getOneBookingDetails = async(bookingId:string)=>{
        const data = await repository.getOneBookingDetails(bookingId)
        return data
    }

    const cancelBooking = async(bookingId:string)=>{
        const res = await repository.cancelBooking(bookingId)
        return res
    }

    return {
        addUser,
        getUserByEmail,
        addOrganization,
        getApprovedEvents,
        getCompleteEventDetails,
        createBooking,
        getBookings,
        getOneBookingDetails,
        cancelBooking

    }
}

export type UserDBInterface = typeof userDbRepository