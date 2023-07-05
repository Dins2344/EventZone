import { HttpStatus } from "../../../types/httpStatus";
import { OrganizationDBInterface } from "../../repositories/organizationDBRepository";
import { CreateOrganization } from "../../../types/userInterface";
import {
  BasicFormInterface,
  MediaFormInterface,
  PublishFormInterface,
} from "../../../types/organizerInterface";
import AppError from "../../../utils/appError";

export const organizationRegister = async (
  organization: CreateOrganization,
  organizationRepository: ReturnType<OrganizationDBInterface>
) => {
  if (!organization) {
    throw new AppError("data not found", HttpStatus.BAD_REQUEST);
  }
  const response = await organizationRepository.addOrganization(organization);
  console.log(response);
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


export const getEventDetails = async(
  id:string,
  organizationRepository:ReturnType<OrganizationDBInterface>
)=>{
  const data = await organizationRepository.getEventDetails(id)
  if(!data){
    throw new AppError('getting event data failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const publishEvent = async(
  id:string,
  organizationRepository:ReturnType<OrganizationDBInterface>
)=>{
  const time = new Date().toDateString()
  console.log(time)
  const res = await organizationRepository.publishEvent(id,time)
  if(!res){
    throw new AppError('publishing event failed',HttpStatus.BAD_REQUEST)
  }
  return res
}


export const getUsersAllEvents = async(userId:string,organizationRepository:ReturnType<OrganizationDBInterface>)=>{
  const data = await organizationRepository.getUsersAllEvents(userId)
  if(!data){
    throw new AppError('getting users all events failed',HttpStatus.BAD_REQUEST)
  }
  return data
}