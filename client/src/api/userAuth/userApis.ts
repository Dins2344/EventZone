import {
  
  ReviewData,
  ticketBookingCreationInterface,
} from "../../types/userInterface";
import api from "../interceptors/userInterceptor";
import { AddressFormData } from "../../components/user_components/profile_components/contactInfo";
import config from "../../config/envConfig";

interface createOrganizerInterface {
  orgName: string;
  orgType: string;
}
export const updateEmail = async (email: string) => {
  try {
    const data = { email };
    const res = api.post(`${config.BASE_URL}/user/update-email`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createOrganizer = async (OrgData: createOrganizerInterface) => {
  try {
    const response = await api.post(
      `${config.BASE_URL}/user/register-organization`,
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
    const response = await api.get(`${config.BASE_URL}/user/get-user-details`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetailsById = async () => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-user-details-by-Id`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllApprovedEvents = async () => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-all-approved-events`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEventsFromFollowingOrganizers = async () => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-all-events-from-following-organizers`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompleteEventDetails = async (id: string) => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-complete-event-details/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ticketBooking = async (data: ticketBookingCreationInterface) => {
  try {
    const res = await api.post(`${config.BASE_URL}/user/ticket-booking`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBookingDetails = async () => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/get-booking-details`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneBookingDetails = async (bookingId: string) => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-one-booking-details/${bookingId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const res = await api.get(
      `${config.BASE_URL}/user/cancel-booking/${bookingId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrganizers = async () => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/get-all-organizers`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProfileContactInfo = async (data: FormData) => {
  console.log(data);
  try {
    const res = await api.post(
      `${config.BASE_URL}/user/add-profile-contact-info`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = async (data: AddressFormData) => {
  try {
    const res = await api.post(`${config.BASE_URL}/user/add-address`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAddressInfo = async () => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/get-address-info`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyPassword = async (password: string) => {
  try {
    const data = { password };
    const res = await api.post(`${config.BASE_URL}/user/verify-password`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchData = async (
  searchFor: string,
  searchText: string,
  city: string,
  price: string,
  category: string
) => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/search`, {
      params: { searchFor, searchText, city, price, category },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const accessChat = async (
  secondUserId: string,
  orgName: string,
  logo: string
) => {
  const data = { secondUserId, orgName, logo };
  try {
    const res = await api.post(`${config.BASE_URL}/user/chat`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersChat = async () => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/chat/get-chats`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (chatId: string, content: string) => {
  const data = { chatId, content };
  try {
    const res = await api.post(
      `${config.BASE_URL}/user/chat/send-message`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/chat/get-chat-messages/${chatId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = async (orgId: string) => {
  try {
    const res = await api.put(
      `${config.BASE_URL}/user/update-following/${orgId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addFollowing = async (orgId: string) => {
  try {
    const res = await api.get(
      `${config.BASE_URL}/user/update-following/${orgId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likeEvent = async (eventId: string) => {
  try {
    const res = await api.get(
      `${config.BASE_URL}/user/update-like-list/${eventId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const unLikeEvent = async (eventId: string) => {
  try {
    const res = await api.put(
      `${config.BASE_URL}/user/update-like-list/${eventId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLikedEvents = async () => {
  try {
    const data = await api.get(`${config.BASE_URL}/user/get-all-liked-events`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingOrgs = async () => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-all-following-orgs`

    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBooking = async (bookingId: string) => {
  try {
    await api.get(
      `${config.BASE_URL}/user/update-booking-attended/${bookingId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const addReview = async (data: ReviewData) => {
  try {
    const res = await api.post(`${config.BASE_URL}/user/add-review`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (eventId: string) => {
  try {
    const data = await api.get(
      `${config.BASE_URL}/user/get-reviews/${eventId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (
  newPassword: string,
) => {
  const data = { newPassword };
  try {
    const res = await api.post(`${config.BASE_URL}/user/change-password`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

