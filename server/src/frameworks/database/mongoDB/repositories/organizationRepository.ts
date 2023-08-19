import Organization from "../models/organizationModel";
import EventCategory from "../models/eventCategory";
import Event from "../models/eventModel";
import { CreateOrganization } from "../../../../types/userInterface";
import { OrganizationInterface } from "../../../../types/userInterface";
import {
  BasicFormInterface,
  EditEventFormData,
  MediaFormInterface,
  PublishFormInterface,
  RegisteredOrganization,
} from "../../../../types/organizerInterface";
import { ObjectId } from "mongodb";
import Bookings from "../models/bookings";
import User from "../models/userModel";
import OrganizationCategory from "../models/orgCategory";
import Cities from "../models/Cities";

export const organizationRepositoryMongoDB = () => {
  const addOrganization = async (orgData: CreateOrganization) => {
    const newOrganization = new Organization(orgData);
    return await newOrganization.save();
  };

  const getAllEventCategories = async () => {
    const data = await EventCategory.find({});
    return data;
  };

  const getUsersOrganizations = async (id: string) => {
    const data = await Organization.find({ userId: id });
    return data;
  };

  const getAllCities = async () => {
    const data = await Cities.find({});
    return data;
  };

  const getOrganizationDetails = async (orgId: string) => {
    const data = await Organization.findOne({ _id: new ObjectId(orgId) });
    return data;
  };

  const addBasicEventInfo = async (data: BasicFormInterface) => {
    data.status = "draft";
    const organization = await Organization.findOne({
      _id: new ObjectId(data.organizer),
    });
    const ownerId = organization?.ownerId;
    const orgName = organization?.orgName;
    if (ownerId && orgName) {
      data.orgOwnerId = ownerId;
      data.orgName = orgName;
    }

    const res = await Event.create(data);
    return res;
  };

  const addMediaEventInfo = async (
    data: MediaFormInterface,
    media: Express.Multer.File[]
  ) => {
    const imageURL: Array<string> = media.map((file) => file.path);
    const res = await Event.updateOne(
      { _id: new ObjectId(data.eventId) },
      {
        videoURL: data.videoURL,
        description: data.description,
        imageURL: imageURL,
      }
    );
    return res;
  };

  const addPublishEventInfo = async (data: PublishFormInterface) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(data.eventId) },
      {
        eventCapacity: data.eventCapacity,
        ticketPrice: data.ticketPrice,
        ticketValue: data.ticketValue,
        ticketSold: 0,
      }
    );
    return res;
  };

  const getEventDetails = async (id: string) => {
    const data = await Event.findOne({ _id: new ObjectId(id) });
    return data;
  };

  const publishEvent = async (id: string, registeredTime: string) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(id) },
      { status: "requested", registeredTime: registeredTime }
    );
    return res;
  };
  const getUsersAllEvents = async (id: string) => {
    const data = await Event.find({ orgOwnerId: id });
    return data;
  };

  const getOrganizersAllEvent = async (orgId: string) => {
    const data = await Event.find({ organizer: orgId });
    return data;
  };

  const getOrganizersAllBookings = async (userId: string) => {
    const data = await Bookings.aggregate([
      // Match bookings for the specified user
      {
        $match: { orgOwnerId: userId },
      },
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
        },
      },
      // Lookup to join with the Event collection
      {
        $lookup: {
          from: "users", // Name of the Event collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      // Unwind the event array
      {
        $unwind: "$user",
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
          user: {
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            email: "$user.email",
            profileImage: "$user.profileImage",
            // Include other event fields as needed
          },
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
      {
        $sort: { _id: -1 },
      },
    ]).exec();
    return data;
  };

  const getOrgOwnerDetails = async (ownerId: string) => {
    const data = await User.findOne({ _id: new ObjectId(ownerId) });
    return data;
  };

  const getAllOrganizationCategories = async () => {
    const data = await OrganizationCategory.find({});
    return data;
  };

  const updateOrganizationInfo = async (data: RegisteredOrganization) => {
    console.log(data);
    try {
      const res = await Organization.updateOne(
        { _id: new ObjectId(data._id) },
        {
          orgName: data.orgName,
          orgType: data.orgType,
          country: data.country,
          logo: data.logo,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlySales = async (userId: string) => {
    const data = await Bookings.aggregate([
      {
        $match: { orgOwnerId: userId },
      },
      {
        $addFields: {
          // Convert the bookingTime string into a date object
          bookingDate: { $dateFromString: { dateString: "$bookingTime" } },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$bookingDate" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id", // Rename _id field to month
          totalSales: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    return data;
  };

  const getMonthlyTicketSales = async (userId: string) => {
    const data = await Bookings.aggregate([
      {
        $match: { orgOwnerId: userId },
      },
      {
        $addFields: {
          // Convert the bookingTime string into a date object
          bookingDate: { $dateFromString: { dateString: "$bookingTime" } },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$bookingDate" } },
          totalTickets: { $sum: "$ticketCount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id", // Rename _id field to month
          totalTickets: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    return data;
  };

  const getTicketTypeSold = async (userId: string) => {
    const data = await Bookings.aggregate([
      {
        $match: { orgOwnerId: userId },
      },

      {
        $group: {
          _id: "$paymentType",
          totalTickets: { $sum: "$ticketCount" },
        },
      },
      {
        $project: {
          _id: 0,
          paymentType: "$_id",
          totalTickets: 1,
        },
      },
    ]);
    return data;
  };

  const getTicketsSoldByEvents = async (userId: string) => {
    const data = await Event.aggregate([
      {
        $match: { orgOwnerId: userId },
      },

      {
        $group: {
          _id: "$eventName",
          totalTickets: { $sum: "$ticketSold" },
        },
      },
      {
        $project: {
          _id: 0,
          eventName: "$_id", // Rename _id field to month
          totalTickets: 1,
        },
      },
    ]);
    console.log(data);
    return data;
  };

  const updateEventInfo = async (data: EditEventFormData) => {
    const res = await Event.updateOne(
      { _id: data.eventId },
      {
        eventName: data.eventName,
        category: data.category,
        description: data.description,
        agenda: data.agenda,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        state: data.state,
        city: data.city,
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
      }
    );
    return res;
  };

  const getEventBookedUsers = async (eventId: string) => {
    const data = Bookings.find({ eventId: eventId }).populate({
      path: "userId",
      select: "email",
    });

    return data;
  };

  return {
    addOrganization,
    getAllEventCategories,
    getUsersOrganizations,
    getOrganizationDetails,
    addBasicEventInfo,
    addMediaEventInfo,
    addPublishEventInfo,
    getEventDetails,
    publishEvent,
    getUsersAllEvents,
    getOrganizersAllEvent,
    getOrganizersAllBookings,
    getOrgOwnerDetails,
    getAllOrganizationCategories,
    updateOrganizationInfo,
    getMonthlySales,
    getMonthlyTicketSales,
    getTicketTypeSold,
    getTicketsSoldByEvents,
    getAllCities,
    updateEventInfo,
    getEventBookedUsers,
  };
};

export type OrganizationRepositoryMongoDB =
  typeof organizationRepositoryMongoDB;
