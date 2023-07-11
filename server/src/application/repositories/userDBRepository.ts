import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { CreateUserInterface } from "../../types/userInterface";


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
    return {
        addUser,
        getUserByEmail,
        addOrganization,
        getApprovedEvents,
        getCompleteEventDetails

    }
}

export type UserDBInterface = typeof userDbRepository