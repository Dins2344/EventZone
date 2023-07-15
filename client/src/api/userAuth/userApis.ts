import { ticketBookingCreationInterface } from "../../types/userInterface";
import api from "../itercepters/intercepter";

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