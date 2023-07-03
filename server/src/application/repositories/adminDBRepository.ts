import { AdminRepositoryDBReturn } from "../../frameworks/database/mongoDB/repositories/adminRepositoryMongoDB"
import { EventCategoryInterface,EditEventCategoryInterface } from "../../types/adminInterface"

export const adminDbRepository = (repository:AdminRepositoryDBReturn) =>{
    const getAdminByEmail = async(email:string)=>{
        return await repository.getAdminByEmail(email)
    }

    const addEventCategory = async(eventData:EventCategoryInterface)=>{
        return await repository.addEventCategory(eventData)
    }

    const deleteEventCategory = async(id:string)=>{
        return await repository.deleteEventCategory(id)
    }

    const getEventCategories = async()=>{
        return await repository.getEventCategories()
    }

    const getSingleEventCategory = async(id:string)=>{
        return await repository.getSingleEventCategory(id)
    }

    const editEventCategory = async(data:EditEventCategoryInterface)=>{
        return await repository.editEventCategory(data)
    }

    const addOrgCategory = async(data:EventCategoryInterface)=>{
        return await repository.addOrgCategory(data)
    }

    const deleteOrgCategory = async(id:string)=>{
        return await repository.deleteOrgCategory(id)
    }

    const editOrgCategory = async(data:EditEventCategoryInterface)=>{
        return await repository.editOrgCategory(data)
    }

    const getSingleOrgCategory = async(id:string)=>{
        return await repository.getSingleOrgCategory(id)
    }

    const getAllOrgCategory = async()=>{
        return await repository.getAllOrgCategory()
    }

    return {
        getAdminByEmail,
        addEventCategory,
        deleteEventCategory,
        getEventCategories,
        getSingleEventCategory,
        editEventCategory,
        addOrgCategory,
        deleteOrgCategory,
        editOrgCategory,
        getSingleOrgCategory,
        getAllOrgCategory
    }
}

export type AdminDbInterface = typeof adminDbRepository