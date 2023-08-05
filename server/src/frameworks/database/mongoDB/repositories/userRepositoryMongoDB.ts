import { getChat } from "./../../../../application/usecases/user/userAuth";
import {
  AddressFormDataCreateInterface,
  BookingCreationInterface,
  CreateChatInterface,
  NewMessageInterface,
  ProfileContactInfo,
  ReviewData,
  SearchQueryInterface,
  UserInterface,
  searchDataInterface,
} from "../../../../types/userInterface";
import User from "../models/userModel";
import { CreateUserInterface } from "../../../../types/userInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";
import Organization from "../models/organizationModel";
import Bookings from "../models/bookings";
import Address from "../models/address";
import Chat from "../models/chats";
import Message from "../models/message";
import { Types } from "mongoose";
// import {ObjectId as objectId} from 'mongoose/Schema/Types/ObjectId'
// import { ObjectId as objectId } from "mongoose";
// const objectId = mongoose.Schema.Types.ObjectId




export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };
  const getUserById = async (Id: string) => {
    const data = await User.findById(Id);
    return data;
  };
  const addUser = async (user: CreateUserInterface) => {
    return await User.create(user);
  };
  const addOrganization = async (orgId: string, userId: string) => {
    return await User.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { organizations: orgId } }
    );
  };

  const getApprovedEvents = async () => {
    const data = await Event.find({ status: "approved" });
    return data;
  };

  const getCompleteEventDetails = async (id: string) => {
    const data = await Event.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "organizations",
          let: { organizerId: { $toObjectId: "$organizer" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$organizerId"] },
              },
            },
          ],
          as: "organizerInfo",
        },
      },
      {
        $unwind: "$organizerInfo",
      },
    ]);
    return data;
  };

  const createBooking = async (data: BookingCreationInterface) => {
    await Event.updateOne(
      { _id: new ObjectId(data.eventId) },
      { $inc: { ticketSold: data.ticketCount } }
    );
    const newData = new Bookings(data);
    const res = await newData.save();
    console.log(res);
    return res;
  };

  const getBookings = async (userId: string) => {
    const data = await Bookings.aggregate([
      // Match bookings for the specified user
      {
        $match: { userId: userId },
      },
      {
        $addFields: {
          eventId: { $toObjectId: "$eventId" },
        },
      },
      // Lookup to join with the Event collection
      {
        $lookup: {
          from: "events", // Name of the Event collection
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      // Unwind the event array
      {
        $unwind: "$event",
      },
      // Project the desired fields
      {
        $project: {
          _id: 1,
          eventId: 1,
          userId: 1,
          bookingTime: 1,
          contactInfo: 1,
          ticketCount: 1,
          status: 1,
          QRCodeLink: 1,
          paymentType: 1,
          totalAmount: 1,
          event: {
            eventName: "$event.eventName",
            organizer: "$event.organizer",
            imageURL: "$event.imageURL",
            startDate: "$event.startDate",
            startTime: "$event.startTime",
            ticketValue: "$event.ticketValue",
            city: "$event.city",
            state: "$event.state",
            // Include other event fields as needed
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])
      .exec()
      .catch((error: any) => {
        console.error("Error retrieving user bookings:", error);
      });
    return data;
  };

  const getOneBookingDetails = async (bookingId: string) => {
    const data = await Bookings.aggregate([
      // Match bookings for the specified user
      {
        $match: { _id: new ObjectId(bookingId) },
      },
      {
        $addFields: {
          eventId: { $toObjectId: "$eventId" },
        },
      },
      // Lookup to join with the Event collection
      {
        $lookup: {
          from: "events", // Name of the Event collection
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      // Unwind the event array
      {
        $unwind: "$event",
      },
      // Project the desired fields
      {
        $project: {
          _id: 1,
          eventId: 1,
          userId: 1,
          bookingTime: 1,
          contactInfo: 1,
          ticketCount: 1,
          status: 1,
          QRCodeLink: 1,
          paymentType: 1,
          totalAmount: 1,
          event: {
            eventName: "$event.eventName",
            organizer: "$event.organizer",
            imageURL: "$event.imageURL",
            startDate: "$event.startDate",
            startTime: "$event.startTime",
            ticketValue: "$event.ticketValue",
            endDate: "$event.endDate",
            endTime: "$event.endTime",
            category: "$event.category",
            addressLine1: "$event.addressLine1",
            addressLine2: "$event.addressLine2",
            addressLine3: "$event.addressLine3",
            orgName: "$event.orgName",
            avgRating: '$event.avgRating',
            numOfReviews: '$event.numOfReviews',
            reviews:'$event.reviews'
            // Include other event fields as needed
          },
        },
      },
    ]).exec();
    return data;
  };

  const cancelBooking = async (bookingId: string) => {
    console.log(bookingId);
    const res = await Bookings.updateOne(
      { _id: new ObjectId(bookingId) },
      { status: "canceled" }
    );
    return res;
  };

  const getAllOrganizers = async () => {
    const data = await Organization.find({});
    return data;
  };

  const addProfileContactInfo = async (
    data: ProfileContactInfo,
    userId: string
  ) => {
    const res = await User.updateOne(
      { _id: new ObjectId(userId) },
      {
        website: data.website,
        phoneNumber: data.phoneNumber,
        profileImage: data.imageURL,
        firstName: data.firstName,
        lastName: data.lastName,
      }
    );
    return res;
  };

  const addAddress = async (data: AddressFormDataCreateInterface) => {
    try {
      const address = await Address.findOne({ userId: data.userId });
      if (address) {
        const res = await Address.updateOne(
          { userId: data.userId },
          {
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            country: data.country,
            pin: data.pin,
            state: data.state,
            wAddressLine1: data.wAddressLine1,
            wAddressLine2: data.wAddressLine2,
            wCity: data.wCity,
            wCountry: data.wCountry,
            wPin: data.wPin,
            wState: data.wState,
          }
        );
        return res;
      } else {
        const res = await Address.create(data);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmail = async (email: string, userId: string) => {
    const res = await User.updateOne(
      { _id: new ObjectId(userId) },
      { email: email }
    );
    return res;
  };

  const getAddressInfo = async (userId: string) => {
    const data = await Address.findOne({ userId: userId });
    return data;
  };

  const searchEvents = async (searchQuery: searchDataInterface) => {
    const { searchText, city, price, category } = searchQuery;
    try {
      // Build the search query using Mongoose
      const query: any = { status: "approved" };

      if (searchText) {
        query.eventName = { $regex: new RegExp(searchText as string, "i") };
      }

      // Apply filters for location and category
      if (city) {
        query.city = { $regex: new RegExp(city as string, "i") };
      }
      if (price) {
        query.ticketValue = { $regex: new RegExp(price as string, "i") };
      }
      if (category) {
        query.category = { $regex: new RegExp(category as string, "i") };
      }

      // Perform the search using the constructed query
      const events = await Event.find(query);

      // Return the search results
      return events;
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  const searchOrganizer = async (searchText: string) => {
    const query: any = {};
    if (searchText) {
      query.orgName = { $regex: new RegExp(searchText as string, "i") };
    }

    const data = await Organization.find(query);
    return data;
  };

  const getChat = async (userId: string, secondUser: string) => {
    let data = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: secondUser } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessages");

    const fullChat = await User.populate(data, {
      path: "latestMessages.sender",
      select: "firsName email profileImage",
    });
    return fullChat;
  };

  const createChat = async (chatData: CreateChatInterface) => {
    console.log(chatData);
    const res = await Chat.create(chatData);
    const fullChat = await Chat.find({ _id: res._id }).populate(
      "users",
      "-password"
    );
    return fullChat;
  };

  const getUsersChat = async (userId: string) => {
    try {
      const data = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
        .populate("users", "-password")
        .populate("latestMessages")
        .sort({ updatedAt: -1 });
      const result = await User.populate(data, {
        path: "latestMessages.sender",
        select: "firstName email profileImage",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (newMessage: NewMessageInterface) => {
    const res = await Message.create(newMessage);
    const resSender = await res.populate(
      "sender",
      "firstName email profileImage"
    );
    const resChat = await resSender.populate("chat");
    const resUser = await User.populate(resSender, {
      path: "chat.users",
      select: "firstName email profileImage",
    });
    await Chat.findByIdAndUpdate(newMessage.chat, { latestMessages: resUser });
    return resChat;
  };

  const getAllMessage = async (chatId: string) => {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "firstName email profileImage")
      .populate("chat");
    return messages;
  };

  const addFollow = async (userId: string, orgId: string) => {
    const user = await User.findById(userId)
    const orgId_id =new Types.ObjectId(orgId)
    if (user?.following.includes(orgId_id)) {
      return {message:'this organizer is already in the list',ok:false}
    }
    const userAdded = await Organization.updateOne(
      { _id: new ObjectId(orgId) },
      { $push: { followers: userId } }
    );
    const organizationAdded = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { following: orgId } }
    );
    if (userAdded && organizationAdded) {
      return { message: "successfully added to following",ok:true };
    }
  };

  const unFollow = async (userId: string, orgId: string) => {
    const userRemoved = await Organization.updateOne(
      { _id: new ObjectId(orgId) },
      { $pull: { followers: userId } }
    );
    const organizationRemoved = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { following: orgId } }
    );
    if (userRemoved && organizationRemoved) {
      return { message: "successfully removed from following list", ok:true };
    }
  };

  const likeEvent = async (userId:string,eventId: string) => {
    const res = await User.updateOne({ _id: new ObjectId(userId) }, { $push: { likedEvents: eventId } })
    console.log(res)
    if (res) {
      return {message:'successfully added to like list',ok:true}
    } else {
      return {error:'adding like list failed',ok:false}
    }
  }

  const unLikeEvent = async (userId: string, eventId: string) => {
    const res = await User.updateOne({ _id: new ObjectId(userId) }, { $pull: { likedEvents: eventId } })
    if (res) {
      return {message:'successfully removed event form like list',ok:true}
    } else {
      return {error:'removing event from liked list failed',ok:false}
    }
  }

  const getLikedEvents = async (userId: string) => {
    try {
      const data = await User.findById({ _id: userId }).populate('likedEvents')
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const getFollowingOrgs = async (userId: string) => {
    const data = await User.findById({ _id: userId }).populate("following");
    console.log(data)
    return data
  }

  const updateBookings = async (bookingId: string) => {
    const res = await Bookings.updateOne({ _id: bookingId }, { isAttended: true,status:'attended' })
    return res
  }

  const addReview = async (review: ReviewData, eventId: string) => {
    const event = await Event.findById(eventId)
    
    if (event) {
    const isReviewed = event?.reviews.find((item) => {
      return item.userId?.toString() == review.userId.toString()
    })
    if (isReviewed) {
      event?.reviews.forEach((item) => {
        if (item.userId?.toString() == review.userId.toString()) {
          item.rating = review.rating
          item.comment = review.comment
        }
      })
    } else {
      const dataToPush = {
        userId:new Types.ObjectId(review.userId),
        rating: review.rating,
        comment:review.comment
      }
        event?.reviews.push(dataToPush)
      }
      event.numOfReviews = event?.reviews.length
      event.avgRating =
        event.reviews.reduce((acc, item) => item.rating + acc, 0) /
        event.numOfReviews;
      console.log(event.avgRating)
      const res = await event.save({validateBeforeSave:false})
      if (res) {
        return {message:"reviews updated",ok:true}
      } else {
        return {message:'review updating failed',ok:false}
      }
    } else {
      return {message:"event not found",ok:false}
    }
  }

  const getReview = async (eventId: string) => {
    const data = await Event.findById(eventId).populate('reviews.userId')
    console.log(data)
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
    addFollow,
    unFollow,
    likeEvent,
    unLikeEvent,
    getLikedEvents,
    getFollowingOrgs,
    addReview,
    updateBookings,
    getReview,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
