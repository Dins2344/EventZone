import Admin from "../models/adminModel"
import EventCategory from "../models/eventCategory"
import OrganizationCategory from "../models/orgCategory"
import AdminInterface from "../../../../types/adminInterface"
import { EventCategoryInterface,EditEventCategoryInterface } from "../../../../types/adminInterface"
import {ObjectId} from 'mongodb'
import Event from "../models/eventModel"

export const adminRepositoryMongoDB = ()=>{
    const getAdminByEmail = async(email:string)=>{
        const admin:AdminInterface | null = await Admin.findOne({email})
        return admin
    }

    const addEventCategory = async(eventData:EventCategoryInterface)=>{
        return await EventCategory.create(eventData)
    }

    const deleteEventCategory = async(id:string)=>{
        return await EventCategory.deleteOne({_id:new ObjectId(id)})
    }

    const getEventCategories = async()=>{
        return await EventCategory.find({})
    }
    const getSingleEventCategory = async(id:string)=>{
        return await EventCategory.findOne({_id: new ObjectId(id)})
    }

    const editEventCategory = async(data:EditEventCategoryInterface)=>{
        const {id,categoryName,subCategoryName,description} = data
        return await EventCategory.findOneAndUpdate(
            {_id:new ObjectId(id)},
            { categoryName, subCategoryName, description },
            { new: true })
    }

    const addOrgCategory = async(data :EventCategoryInterface)=>{
        return await OrganizationCategory.create(data)
    }

    const deleteOrgCategory = async(id:string)=>{
        return await OrganizationCategory.deleteOne({_id:new ObjectId(id)})
    }

    const editOrgCategory = async(data:EditEventCategoryInterface)=>{
        const {id,categoryName,subCategoryName,description} = data
        return await OrganizationCategory.findOneAndUpdate({_id:new ObjectId(id)},
        { categoryName, subCategoryName, description },
        { new: true })
    }

    const getSingleOrgCategory = async(id:string)=>{
        return await OrganizationCategory.findOne({_id:new ObjectId(id)})
    }

    const getAllOrgCategory = async()=>{
        return await OrganizationCategory.find({})
    }

    const getAllEvents = async()=>{
        const data = await Event.find({})
        return data
    }

    const approveEvent = async(id:string)=>{
        const res = await Event.updateOne({_id: new ObjectId(id)},{status:'approved'})
        return res
    }

    const rejectEvent = async(id:string)=>{
        const res = await Event.updateOne({_id:new ObjectId(id)},{status:'rejected'})
        return res
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
        getAllOrgCategory,
        getAllEvents,
        approveEvent,
        rejectEvent
    }
}

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB
export type AdminRepositoryDBReturn = ReturnType<AdminRepositoryMongoDB>