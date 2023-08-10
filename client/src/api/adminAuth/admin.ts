import adminApi from "../interceptors/interceptors";
import { editEventCategoriesInterface } from "../../components/admin_components/editEventCategory";
import { CityInterface } from "../../types/adminInterface";
import config from "../../config/envConfig";

interface eventCategory {
  categoryName: string;
  subCategoryName: string;
  description: string;
}

export const eventCategoryFormSubmit = async (data: eventCategory) => {
  try {
    const response = await adminApi.post(
      `${config.BASE_URL}/admin/add-event-category`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const orgCategoryFormSubmit = async(data:eventCategory)=>{
    try {
        const response = await adminApi.post(
          `${config.BASE_URL}/admin/add-org-category`,
          data
        );
        return response;
      } catch (error) {
        console.log(error);
      }
}

export const getAllEventCategories = async () => {
  try {
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-all-event-categories`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllOrgCategories = async () => {
  try {
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-all-org-categories`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEventCategories = async (id: string | undefined) => {
  try {
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-single-event-categories/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const eventCategoryEditFormSubmit = async (
  data: editEventCategoriesInterface
) => {
  try {
    console.log(data);
    const response = await adminApi.post(
      `${config.BASE_URL}/admin/edit-event-category`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteEventCategory = async(
  id:string
)=>{
  try{
    const response = await adminApi.get(
      `${config.BASE_URL}/admin/delete-event-category/${id}`
    );
    return response
  }catch(error){
    console.log(error)
  }
}

export const deleteOrgCategory = async(
  id:string
)=>{
  try{
    const response = await adminApi.get(
      `${config.BASE_URL}/admin/delete-org-category/${id}`
    );
    return response
  }catch(error){
    console.log(error)
  }
}

export const getAllEvents = async()=>{
  try{
    const data = await adminApi.get(`${config.BASE_URL}/admin/get-all-events`);
    return data
  }catch(error){
    console.log(error)
  }
}

export const approveEvent = async (id:string)=>{
  try{
    const res = await adminApi.get(
      `${config.BASE_URL}/admin/approve-event/${id}`
    );
    return res
  }catch(error){
    console.log(error)
  }
}

export const rejectEvent = async(id:string)=>{
  try{
    const res = await adminApi.get(
      `${config.BASE_URL}/admin/reject-event/${id}`
    );
    return res
  }catch(error){
    console.log(error)
  }
}

export const getTotalUsers = async()=>{
  try{
    const data = await adminApi.get(`${config.BASE_URL}/admin/getTotalUsers`);
    return data
  }catch(error){
    console.log(error)
  }
}

export const getTotalEvents = async()=>{
  try{
    const data = await adminApi.get(`${config.BASE_URL}/admin/getTotalEvents`);
    return data
  }catch(error){
    console.log(error)
  }
}

export const getTotalOrganizers = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/getTotalOrganizers`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const getTotalTicketsSold = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/getTotalTicketsSold`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const getMonthlySales = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-monthly-sales`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const getMonthlyTicketSales = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-monthly-ticket-sales`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const getMonthlyTicketTypeSales = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-monthly-ticket-type-sales`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const getMostSoldEvents = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-most-sold-events`
    );
    return data
  }catch(error){
    console.log(error)
  }
}


export const getAllBookings = async()=>{
  try{
    const data = await adminApi.get(
      `${config.BASE_URL}/admin/get-all-bookings`
    );
    return data
  }catch(error){
    console.log(error)
  }
}

export const addCities = async(data:CityInterface)=>{
  try{
    const res = await adminApi.post(
      `${config.BASE_URL}/admin/city-manage`,
      data
    );
    return res
  }catch(error){
    console.log(error)
  }
}

export const getAllCities = async()=>{
  try{
    const data = await adminApi.get(`${config.BASE_URL}/admin/city-manage`);
    return data
  }catch(error){
    console.log(error)
  }
}

export const deleteCity = async(id:string)=>{
  try{
    const res = await adminApi.delete(
      `${config.BASE_URL}/admin/city-manage/${id}`
    );
    return res
  }catch(error){
    console.log(error)
  }
}

export const promoteEvent = async (eventId: string) => {
  try {
    const res = await adminApi.get(
      `${config.BASE_URL}/admin/update-promoted-events/${eventId}`
    );
    return res
  } catch (error) {
    console.log(error)
  }
}

export const removeFromPromote = async (eventId: string) => {
  try {
    const res = await adminApi.delete(
      `${config.BASE_URL}/admin/update-promoted-events/${eventId}`
    );
    return res
  } catch (error) {
    console.log(error)
  }
}

export const blockUser = async(userId: string) => {
  try {
    const res = await adminApi.get(
      `${config.BASE_URL}/admin/update-user-status/${userId}`
    );
    return res
  } catch (error) {
    console.log(error)
  }
}

export const unBlockUser = async (userId: string) => {
  try {
    const res = await adminApi.put(
      `${config.BASE_URL}/admin/update-user-status/${userId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};