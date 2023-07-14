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
        const res = repository.createBooking(data)
        return res
    }
    return {
        addUser,
        getUserByEmail,
        addOrganization,
        getApprovedEvents,
        getCompleteEventDetails,
        createBooking

    }
}

export type UserDBInterface = typeof userDbRepository