import { AdminRepositoryDBReturn } from "../../frameworks/database/mongoDB/repositories/adminRepositoryMongoDB"
import { EventCategoryInterface,EditEventCategoryInterface, CityInterface } from "../../types/adminInterface"

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

    const getAllEvents = async()=>{
        return await repository.getAllEvents()
    }

    const approveEvent = async(id:string)=>{
        return await repository.approveEvent(id)
    }

    const rejectEvent = async (id:string)=>{
        return await repository.rejectEvent(id)
    }

    const getTotalEvents = async()=>{
        return await repository.getTotalEvents()
    }
    const getTotalOrganization = async()=>{
        return await repository.getTotalOrganization()
    }
    const getTotalUsers = async()=>{
        return await repository.getTotalUsers()
    }

    const getTotalTicketsSold = async()=>{
        return await repository.getTotalTicketsSold()
    }

    const getAdminMonthlySales = async()=>{
        return await repository.getAdminMonthlySales()
    }

    const getAdminMonthlyTicketSales = async()=>{
        return await repository.getAdminMonthlyTicketSales()
    }

    const getAdminTicketTypeSold = async()=>{
        return await repository.getAdminTicketTypeSold()
    }

    const getMostSoldEvents = async()=>{
        return await repository.getMostSoldEvents()
    }

    const getAllBookings = async()=>{
        return await repository.getAllBookings()
    }

    const addCities = async(data:CityInterface)=>{
        return await repository.addCities(data)
    }
    const getAllCities = async()=>{
        return await repository.getAllCities()
    }

    const deleteCity = async(id:string)=>{
        return await repository.deleteCity(id)
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
        rejectEvent,
        getTotalEvents,
        getTotalOrganization,
        getTotalUsers,
        getTotalTicketsSold,
        getAdminMonthlySales,
        getAdminMonthlyTicketSales,
        getAdminTicketTypeSold,
        getMostSoldEvents,
        getAllBookings,
        addCities,
        getAllCities,
        deleteCity
    }
}

export type AdminDbInterface = typeof adminDbRepository