import { getChat } from './../usecases/user/userAuth';
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { AddressFormDataCreateInterface, BookingCreationInterface, CreateChatInterface, CreateUserInterface, NewMessageInterface, ProfileContactInfo, searchDataInterface } from "../../types/userInterface";


export const userDbRepository = (repository:ReturnType<UserRepositoryMongoDB>)=>{
    const getUserByEmail = async(email:string)=>{
        return await repository.getUserByEmail(email)
    }
    const getUserById = async(userId:string)=>{
        return await repository.getUserById(userId)
    }
    const addUser = async(user:CreateUserInterface)=>{
       return await repository.addUser(user)
    }

    const addOrganization = async(orgId:string,userId:string)=>{
        return await repository.addOrganization(orgId,userId)
    }

    const getApprovedEvents = async()=>{
        return await repository.getApprovedEvents()
    }

    const getCompleteEventDetails = async(id:string)=>{
        return await repository.getCompleteEventDetails(id)
    }

    const createBooking = async(data:BookingCreationInterface)=>{
        const res = await repository.createBooking(data)
        return res
    }

    const getBookings = async(userId:string)=>{
        const data = await repository.getBookings(userId)
        return data
    }

    const getOneBookingDetails = async(bookingId:string)=>{
        const data = await repository.getOneBookingDetails(bookingId)
        return data
    }

    const cancelBooking = async(bookingId:string)=>{
        const res = await repository.cancelBooking(bookingId)
        return res
    }

    const getAllOrganizers = async()=>{
        const data = await repository.getAllOrganizers()
        return data
    }
    const addProfileContactInfo = async(data:ProfileContactInfo,userId:string)=>{
        const res = await repository.addProfileContactInfo(data,userId)
        return res
    }

    const addAddress = async(data:AddressFormDataCreateInterface)=>{
        const res = await repository.addAddress(data)
        return res
    }

    const updateEmail = async(email:string,userId:string)=>{
        const res = await repository.updateEmail(email,userId)
        return res
    }

    const getAddressInfo = async(userId:string)=>{
        const data = await repository.getAddressInfo(userId)
        return data
    }

    const searchEvents = async(searchQuery:searchDataInterface)=>{
        const data = await repository.searchEvents(searchQuery)
        return data
    }

    const searchOrganizer = async(searchText :string)=>{
        const data = await repository.searchOrganizer(searchText)
        return data
    }
    const getChat = async (userId: string, secondUser: string) => {
        const data = await repository.getChat(userId, secondUser)
        return data
    }

    const createChat = async (chatData: CreateChatInterface) => {
      const data = await repository.createChat(chatData);
      return data;
    };

    const getUsersChat = async (userId: string) => {
        const data = await repository.getUsersChat(userId)
        return data
    }

    const sendMessage = async (newMessage: NewMessageInterface) => {
        const data = await repository.sendMessage(newMessage)
        return data
    }

    const getAllMessage = async (chatId: string) => {
        const data = await repository.getAllMessage(chatId)
        return data
    }
    return {
      addUser,
      getUserByEmail,
      getUserById,
      addOrganization,
      getApprovedEvents,
      getCompleteEventDetails,
      createBooking,
      getBookings,
      getOneBookingDetails,
      cancelBooking,
      getAllOrganizers,
      addProfileContactInfo,
      addAddress,
      updateEmail,
      getAddressInfo,
      searchEvents,
      searchOrganizer,
      getChat,
      createChat,
      getUsersChat,
      sendMessage,
      getAllMessage,
    };
}

export type UserDBInterface = typeof userDbRepository