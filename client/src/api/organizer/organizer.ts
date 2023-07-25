import api from "../interceptors/userInterceptor";
import { BasicFormInterface } from "../../types/organizerInterface";
import { PublishFormDataInterface } from "../../types/organizerInterface";

export const getUsersOrganizations = async () => {
  const data = await api.get(
    "http://localhost:4000/organization/get-user-organizations"
  );
  return data;
};

export const getOrganizationDetails = async (id: string) => {
  const data = await api.get(
    `http://localhost:4000/organization/get-organization-details/${id}`
  );
  return data;
};

export const getEventCategories = async () => {
  const data = await api.get(
    "http://localhost:4000/organization/get-all-event-categories"
  );
  return data;
};

export const addBasicEventInfo = async (data: BasicFormInterface) => {
  const res = await api.post(
    "http://localhost:4000/organization/add-event-basic-info",
    data
  );
  return res;
};

export const addMediaEventInfo = async (data: FormData) => {
  console.log(data);
  try {
    const res = await api.post(
      "http://localhost:4000/organization/add-event-media-info",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addPublishEventInfo = async (data: PublishFormDataInterface) => {
  try {
    const res = await api.post(
      "http://localhost:4000/organization/add-event-publish-info",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getEventDetails = async (id: string) => {
  try {
    const res = await api.get(
      `http://localhost:4000/organization/get-event-details/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const publishEvent = async (id: string) => {
  console.log("publish called");
  try {
    const res = await api.get(
      `http://localhost:4000/organization/publish-event/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersAllEvents = async () => {
  try {
    const data = await api.get(
      "http://localhost:4000/organization/get-users-all-events"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganizersAllEvents = async(id:string)=>{
  try{
    const data = await api.get(`http://localhost:4000/organization/get-organizers-all-events/${id}`)
    return data
  }catch(error){
    console.log(error)
  }
}

export const getOrganizationBookings = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-organizers-all-bookings')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getOwnerDetails = async(ownerId:string)=>{
  try{
    const data = await api.get(`http://localhost:4000/organization/get-organization-owner/${ownerId}`)
    return data
  }catch(error){
    console.log(error)
  }
}

export const getAllOrgCategories = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-all-organization-categories')
    return data
  }catch(error){
    console.log(error)
  }
}
export const updateOrganizationInfo = async(data:FormData)=>{
  try{
    const res = await api.post('http://localhost:4000/organization/update-organization-info',data)
    return res
  }catch(error){
    console.log(error)
  }
}

export const getMonthlySales = async ()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-monthly-sales')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getMonthlyTicketSales = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-monthly-ticket-sales')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getTicketTypeSold = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-ticket-type-sold')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getTicketsSoldByEvents = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-tickets-sold-by-events')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getAllCities = async()=>{
  try{
    const data = await api.get('http://localhost:4000/organization/get-all-cities')
    return data
  }catch(error){
    console.log(error)
  }
}