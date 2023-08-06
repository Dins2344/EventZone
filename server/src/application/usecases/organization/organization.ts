import { HttpStatus } from "../../../types/httpStatus";
import { OrganizationDBInterface } from "../../repositories/organizationDBRepository";
import { CreateOrganization } from "../../../types/userInterface";
import {
  BasicFormInterface,
  EditEventFormData,
  MediaFormInterface,
  PublishFormInterface,
  RegisteredOrganization,
} from "../../../types/organizerInterface";
import AppError from "../../../utils/appError";
import { getAllCities } from "../admin/adminUsecases";

export const organizationRegister = async (
  organization: CreateOrganization,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  if (!organization) {
    throw new AppError("data not found", HttpStatus.BAD_REQUEST);
  }
  const response = await organizationRepository.addOrganization(organization);
  return response;
};

export const getAllEventCategories = async (
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getAllEventCategories();
  if (!data) {
    throw new AppError("event category data not found", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const getUsersOrganizations = async (
  id: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getUsersOrganizations(id);
  if (!data) {
    throw new AppError(
      "organization data fetching failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const getOrgAllCities  = async(organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getAllCities()
  if(!data){
    throw new AppError('fetching cities failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getOrganizationDetails = async (
  orgId: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getOrganizationDetails(orgId);
  if (!data) {
    throw new AppError(
      "fetching organization detail failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const addBasicEventInfo = async (
  data: BasicFormInterface,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const res = await organizationRepository.addBasicEventInfo(data);
  if (!res) {
    throw new AppError("adding basic info failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const addMediaEventInfo = async (
  data: MediaFormInterface,
  media: Express.Multer.File[],
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const res = await organizationRepository.addMediaEventInfo(data, media);
  if (!res) {
    throw new AppError("adding media info failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const addPublishEventInfo = async (
  data: PublishFormInterface,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const res = await organizationRepository.addPublishEventInfo(data);
  if (!res) {
    throw new AppError("adding ticket details failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getEventDetails = async (
  id: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getEventDetails(id);
  if (!data) {
    throw new AppError("getting event data failed", HttpStatus.BAD_REQUEST);
  }
  return data;
};

export const publishEvent = async (
  id: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const time = new Date().toDateString();
  console.log(time);
  const res = await organizationRepository.publishEvent(id, time);
  if (!res) {
    throw new AppError("publishing event failed", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const getUsersAllEvents = async (
  userId: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getUsersAllEvents(userId);
  if (!data) {
    throw new AppError(
      "getting users all events failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const getOrganizersAllEvent = async (
  id: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  console.log(id);
  const data = await organizationRepository.getOrganizersAllEvent(id);
  if (!data) {
    throw new AppError(
      "getting organizers all events has failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};

export const getOrganizersAllBookings = async (
  userId: string,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  const data = await organizationRepository.getOrganizersAllBookings(userId);
  if (!data) {
    throw new AppError(
      "getting organizers all bookings failed",
      HttpStatus.BAD_REQUEST
    );
  }
  return data;
};


export const getOrgOwnerDetails = async(ownerId:string,organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getOrgOwnerDetails(ownerId)
  if(!data){
    throw new AppError('fetching orgOwner details failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getAllOrganizationCategories = async(organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getAllOrganizationCategories()
  if(!data){
    throw new AppError('organizationCategory fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const updateOrganizationInfo = async(data:RegisteredOrganization,organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const res = await organizationRepository.updateOrganizationInfo(data)
  if(!res){
    throw new AppError('updating organization info failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getMonthlySales = async(organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getMonthlySales()
  if(!data){
    throw new AppError('fetching monthly sales data done',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getMonthlyTicketSales = async(organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getMonthlyTicketSales()
  if(!data){
    throw new AppError('fetching monthly ticket sales data',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getTicketTypeSold = async(organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getTicketTypeSold()
  if(!data){
    throw new AppError('fetching ticket type sold data failed',HttpStatus.BAD_REQUEST)
  }
  return data
}


export const getTicketsSoldByEvents = async(userId:string,organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getTicketsSoldByEvents(userId)
  if(!data){
    throw new AppError("fetching ticket sold by events data done",HttpStatus.BAD_REQUEST)
  }
  return data
}

export const updateEventInfo = async (data: EditEventFormData, organizationRepository: ReturnType<OrganizationDBInterface>) => {
  const res = await organizationRepository.updateEventInfo(data)
  if (!res) {
    throw new AppError('updating event info failed',HttpStatus.BAD_REQUEST)
  }
  return res
}

export const getEventBookedUsers = async (eventId: string,organizationRepository:ReturnType<OrganizationDBInterface>) => {
  const data = await organizationRepository.getEventBookedUsers(eventId)
  if (!data) {
    throw new AppError('getting event booked users failed',HttpStatus.BAD_REQUEST)
  }
  let users:any = []
  data.forEach((item) => {
    users.push(item.userId)
  })
  return users
}