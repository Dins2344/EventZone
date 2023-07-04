import { OrganizationRepositoryMongoDB} from "../../frameworks/database/mongoDB/repositories/organizationRepository";
import { CreateOrganization } from "../../types/userInterface";
import { BasicFormInterface,MediaFormInterface,PublishFormInterface } from "../../types/organizerInterface";
export const organizationDbRepository = (repository:ReturnType<OrganizationRepositoryMongoDB>)=>{
  
    const addOrganization = async(orgData:CreateOrganization)=>{
        const data = await repository.addOrganization(orgData)
        return data
    }

    const getAllEventCategories =async ()=>{
        const data = await repository.getAllEventCategories()
        return data
    }

    const getUsersOrganizations = async(id:string)=>{
        const data = await repository.getUsersOrganizations(id)
        return data
    }

    const addBasicEventInfo = async (data:BasicFormInterface)=>{
        const res = await repository.addBasicEventInfo(data)
        return res
    }

    const addMediaEventInfo = async(data:MediaFormInterface,media:Express.Multer.File[])=>{
        const res = await repository.addMediaEventInfo(data,media)
        return res
    }

    const addPublishEventInfo = async(data:PublishFormInterface)=>{
        const res = await repository.addPublishEventInfo(data)
        return res
    }

    const getEventDetails = async(id:string) =>{
        const data = await repository.getEventDetails(id)
        return data
    }

    return {
        addOrganization,
        getAllEventCategories,
        getUsersOrganizations,
        addBasicEventInfo,
        addMediaEventInfo,
        addPublishEventInfo,
        getEventDetails
    }
}

export type OrganizationDBInterface = typeof organizationDbRepository