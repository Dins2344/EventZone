import { ticketBookingCreationInterface } from "../../types/userInterface";
import api from "../itercepters/intercepter";
import { ProfileContactInfo } from "../../types/userInterface";
import { AddressFormData } from "../../components/user_components/profile_components/contactInfo";

interface createOrganizerInterface {
  orgName: string;
  orgType: string;
}

export const createOrganizer = async (OrgData: createOrganizerInterface) => {
  try {
    const response = await api.post(
      "http://localhost:4000/user/register-organization",
      OrgData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error in fetching", error);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(
      `http://localhost:4000/user/get-user-details`
    );
   
    return response
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetailsById = async ()=>{
  try{
    const data = await api.get('http://localhost:4000/user/get-user-details-by-Id')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getAllApprovedEvents =async ()=>{
  try{
    const data = await api.get(`http://localhost:4000/user/get-all-approved-events`)
    return data
  }catch(error){
    console.log(error)
  }
}


export const getCompleteEventDetails = async(id:string)=>{
  try{
    const data = await api.get(`http://localhost:4000/user/get-complete-event-details/${id}`)
    return data
  }catch(error){
    console.log(error)
  }
}

export const ticketBooking = async(data :ticketBookingCreationInterface)=>{
  try{
    const res = await api.post('http://localhost:4000/user/ticket-booking',data)
    return res
  }catch(error){
    console.log(error)
  }
}

export const getBookingDetails = async() =>{
  try{
    const data = await api.get('http://localhost:4000/user/get-booking-details')
    return data
  }catch(error){
    console.log(error)
  }
}

export const getOneBookingDetails = async(bookingId:string)=>{
  try{
    const data = await api.get(`http://localhost:4000/user/get-one-booking-details/${bookingId}`)
    return data
  }catch(error){
    console.log(error)
  }
}

export const cancelBooking = async(bookingId:string)=>{
  try{
    const res = await api.get(`http://localhost:4000/user/cancel-booking/${bookingId}`)
    return res
  }catch(error){
    console.log(error)
  }
}


export const getAllOrganizers = async ()=>{
  try{
    const data = await api.get('http://localhost:4000/user/get-all-organizers')
    return data
  }catch(error){
    console.log(error)
  }
}


export const addProfileContactInfo = async(data:FormData)=>{
  console.log(data)
  try{
    const res = await api.post('http://localhost:4000/user/add-profile-contact-info',data)
    return res
  }catch(error){
    console.log(error)
  }
}

export const addAddress = async(data:AddressFormData)=>{
  try{
    const res = await api.post('http://localhost:4000/user/add-address',data)
    return res
  }catch(error){
    console.log(error)
  }
}

export const getAddressInfo = async()=>{
  try{
    const data = await api.get('http://localhost:4000/user/get-address-info')
    return data
  }catch(error){
    console.log(error)
  }
}

export const verifyPassword = async()=>{
  try{
    const res = await api.get('http://localhost:4000/user/verify-password')
    return res
  }catch(error){
    console.log(error)
  }
}