import { OrganizationRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/organizationRepository";
import { CreateOrganization } from "../../types/userInterface";
import {
  BasicFormInterface,
  MediaFormInterface,
  PublishFormInterface,
  RegisteredOrganization,
} from "../../types/organizerInterface";
export const organizationDbRepository = (
  repository: ReturnType<OrganizationRepositoryMongoDB>
) => {
  const addOrganization = async (orgData: CreateOrganization) => {
    const data = await repository.addOrganization(orgData);
    return data;
  };

  const getAllEventCategories = async () => {
    const data = await repository.getAllEventCategories();
    return data;
  };

  const getUsersOrganizations = async (id: string) => {
    const data = await repository.getUsersOrganizations(id);
    return data;
  };

  const getOrganizationDetails = async (orgId: string) => {
    const data = await repository.getOrganizationDetails(orgId);
    return data;
  };

  const addBasicEventInfo = async (data: BasicFormInterface) => {
    const res = await repository.addBasicEventInfo(data);
    return res;
  };

  const addMediaEventInfo = async (
    data: MediaFormInterface,
    media: Express.Multer.File[]
  ) => {
    const res = await repository.addMediaEventInfo(data, media);
    return res;
  };

  const addPublishEventInfo = async (data: PublishFormInterface) => {
    const res = await repository.addPublishEventInfo(data);
    return res;
  };

  const getEventDetails = async (id: string) => {
    const data = await repository.getEventDetails(id);
    return data;
  };

  const publishEvent = async (id: string, registeredTime: string) => {
    const res = await repository.publishEvent(id, registeredTime);
    return res;
  };

  const getUsersAllEvents = async (userId: string) => {
    const data = await repository.getUsersAllEvents(userId);
    return data;
  };

  const getOrganizersAllEvent = async (id: string) => {
    const data = await repository.getOrganizersAllEvent(id);
    return data;
  };

  const getOrganizersAllBookings = async (userId: string) => {
    const data = await repository.getOrganizersAllBookings(userId);
    return data;
  };

  const getOrgOwnerDetails = async (ownerId: string) => {
    const data = await repository.getOrgOwnerDetails(ownerId);
    return data;
  };

  const getAllOrganizationCategories = async () => {
    const data = await repository.getAllOrganizationCategories();
    return data;
  };

  const updateOrganizationInfo = async(data:RegisteredOrganization)=>{
    const res = await repository.updateOrganizationInfo(data)
    return res
  }

  const getMonthlySales = async()=>{
    const data = await repository.getMonthlySales()
    return data
  }

  const getMonthlyTicketSales = async()=>{
    const data = await repository.getMonthlyTicketSales()
    return data
  }

  const getTicketTypeSold = async()=>{
    const data = await repository.getTicketTypeSold()
    return data
  }

  const getTicketsSoldByEvents = async(userId:string)=>{
    const data = await repository.getTicketsSoldByEvents(userId)
    return data
  }


  return {
    addOrganization,
    getAllEventCategories,
    getUsersOrganizations,
    getOrganizationDetails,
    addBasicEventInfo,
    addMediaEventInfo,
    addPublishEventInfo,
    getEventDetails,
    publishEvent,
    getUsersAllEvents,
    getOrganizersAllEvent,
    getOrganizersAllBookings,
    getOrgOwnerDetails,
    getAllOrganizationCategories,
    updateOrganizationInfo,
    getMonthlySales,
    getMonthlyTicketSales,
    getTicketTypeSold,
    getTicketsSoldByEvents
  };
};

export type OrganizationDBInterface = typeof organizationDbRepository;
