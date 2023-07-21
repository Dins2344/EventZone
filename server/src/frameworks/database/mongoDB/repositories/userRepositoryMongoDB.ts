import {
  AddressFormDataCreateInterface,
  BookingCreationInterface,
  ProfileContactInfo,
  UserInterface,
} from "../../../../types/userInterface";
import User from "../models/userModel";
import { CreateUserInterface } from "../../../../types/userInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";
import Organization from "../models/organizationModel";
import Bookings from "../models/bookings";
import Address from "../models/address";

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
    console.log(data);
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

  const updateEmail = async(email:string,userId:string)=>{
    const res = await User.updateOne({_id: new ObjectId(userId)},{email:email})
    return res
  }

  const getAddressInfo = async (userId:string)=>{
   const data = await Address.findOne({userId:userId})
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
    getAddressInfo
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
