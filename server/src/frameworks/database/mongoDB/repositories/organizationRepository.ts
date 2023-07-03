import Organization from "../models/organizationModel";
import EventCategory from "../models/eventCategory";
import Event from "../models/eventModel";
import { CreateOrganization } from "../../../../types/userInterface";
import { OrganizationInterface } from "../../../../types/userInterface";
import { BasicFormInterface } from "../../../../types/organizerInterface";
export const organizationRepositoryMongoDB = () => {

    const addOrganization = async(orgData:CreateOrganization)=>{
        const newOrganization = new Organization(orgData)
        return await newOrganization.save()
    }

    const getAllEventCategories = async ()=>{
      const data = await EventCategory.find({})
      return data
    }

    const getUsersOrganizations = async(id:string)=>{
      const data = await Organization.find({userId:id})
      return data
    }

    const addBasicEventInfo = async(data:BasicFormInterface)=>{
      const res = await Event.create(data)
      return res
    }

  return {addOrganization,
    getAllEventCategories,
    getUsersOrganizations,
    addBasicEventInfo
  };
};

export type OrganizationRepositoryMongoDB =
  typeof organizationRepositoryMongoDB;
