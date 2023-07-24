import { Await } from "react-router-dom";
import {
  EventCategoryInterface,
  EditEventCategoryInterface,
} from "../../../types/adminInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { AdminDbInterface } from "../../repositories/adminDBRepository";
import { adminRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/adminRepositoryMongoDB";

export const addEventCategory = async (
  eventData: EventCategoryInterface,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const res = await adminRepository.addEventCategory(eventData);
  if (!res) {
    throw new AppError("category adding failed", HttpStatus.BAD_GATEWAY);
  } else {
    return res;
  }
};

export const deleteEventCategory = async(id:string,adminRepository:ReturnType<AdminDbInterface>)=>{
  const res = await adminRepository.deleteEventCategory(id)
  if (!res) {
    throw new AppError("organization category deleting failed", HttpStatus.BAD_GATEWAY);
  } else {
    return res;
  }
}

export const getEventCategories = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const data = await adminRepository.getEventCategories();
  if (!data) {
    throw new AppError("categories fetching failed", HttpStatus.BAD_REQUEST);
  } else {
    return data;
  }
};

export const getSingleEventCategory = async (
  id: string,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const data = await adminRepository.getSingleEventCategory(id);
  if (data) {
    return data;
  } else {
    throw new AppError("category fetching failed", HttpStatus.BAD_REQUEST);
  }
};

export const editEventCategory = async (
  data: EditEventCategoryInterface,
  adminRepositoy: ReturnType<AdminDbInterface>
) => {
  const response = adminRepositoy.editEventCategory(data);
  if (!response) {
    throw new AppError("event category editing failed", HttpStatus.BAD_REQUEST);
  }
  return response;
};

export const addOrgCategory = async (
  data: EventCategoryInterface,
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const res = await adminRepository.addOrgCategory(data);
  if (!res) {
    throw new AppError("organization category added", HttpStatus.BAD_REQUEST);
  }
  return res;
};

export const deleteOrgCategory = async(
    id:string, adminRepository:ReturnType<AdminDbInterface>
)=>{
    const res = await adminRepository.deleteOrgCategory(id)
    if (!res) {
        throw new AppError("organization category deletion failed", HttpStatus.BAD_REQUEST);
      }
      return res;
}
export const editOrgCategory = async(
  data:EditEventCategoryInterface,adminRepository:ReturnType<AdminDbInterface>
)=>{
  const response = await adminRepository.editOrgCategory(data)
  if (!response) {
    throw new AppError("organization category editing failed", HttpStatus.BAD_REQUEST);
  }
  return response;
}

export const getSingleOrgCategory = async(id:string,adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getSingleOrgCategory(id)
  if (data) {
    return data;
  } else {
    throw new AppError("category fetching failed", HttpStatus.BAD_REQUEST);
  }

}

export const getAllOrgCategory = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getAllOrgCategory()
  if (data) {
    return data;
  } else {
    throw new AppError("all categories fetching failed", HttpStatus.BAD_REQUEST);
  }
}

export const getAllEvents = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getAllEvents()
  if(data){
    return data
  }else{
    throw new AppError('getting all events failed',HttpStatus.BAD_REQUEST)
  }
}

export const approveEvent =async(id:string,adminRepository:ReturnType<AdminDbInterface>)=>{
  const res = await adminRepository.approveEvent(id)
  if(!res){
    throw new AppError('approve status updating failed',HttpStatus.BAD_REQUEST)
  }
  return res
}

export const rejectEvent = async(id:string,adminRepository:ReturnType<AdminDbInterface>)=>{
  const res = await adminRepository.rejectEvent(id)
  if(!res){
    throw new AppError('reject status updating failed',HttpStatus.BAD_REQUEST)
  }
  return res
}


export const getTotalEvents = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getTotalEvents()
  if(!data){
    throw new AppError('total events fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getTotalOrganization = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getTotalOrganization()
  if(!data){
    throw new AppError('total organization fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getTotalUsers = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getTotalUsers()
  if(!data){
    throw new AppError('total users fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getTotalTicketsSold = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getTotalTicketsSold()
  if(!data){
    throw new AppError('total tickets sold fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getAdminMonthlySales = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getAdminMonthlySales()
  if(!data){
    throw new AppError('monthly sales data failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getAdminMonthlyTicketSales = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getAdminMonthlyTicketSales()
  if(!data){
    throw new AppError('monthly ticket sold data fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getAdminTicketTypeSold = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getAdminTicketTypeSold()
  if(!data){
    throw new AppError('monthly ticket type sold data fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}

export const getMostSoldEvents = async(adminRepository:ReturnType<AdminDbInterface>)=>{
  const data = await adminRepository.getMostSoldEvents()
  if(!data){
    throw new AppError('most sold events fetching failed',HttpStatus.BAD_REQUEST)
  }
  return data
}