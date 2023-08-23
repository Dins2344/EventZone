import Admin from "../models/adminModel";
import EventCategory from "../models/eventCategory";
import OrganizationCategory from "../models/orgCategory";
import AdminInterface, {
  CityInterface,
} from "../../../../types/adminInterface";
import {
  EventCategoryInterface,
  EditEventCategoryInterface,
} from "../../../../types/adminInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";
import User from "../models/userModel";
import Organization from "../models/organizationModel";
import Bookings from "../models/bookings";
import Cities from "../models/Cities";

export const adminRepositoryMongoDB = () => {
  const getAdminByEmail = async (email: string) => {
    const admin: AdminInterface | null = await Admin.findOne({ email });
    return admin;
  };

  const addEventCategory = async (eventData: EventCategoryInterface) => {
    return await EventCategory.create(eventData);
  };

  const deleteEventCategory = async (id: string) => {
    return await EventCategory.deleteOne({ _id: new ObjectId(id) });
  };

  const getEventCategories = async () => {
    return await EventCategory.find({});
  };
  const getSingleEventCategory = async (id: string) => {
    return await EventCategory.findOne({ _id: new ObjectId(id) });
  };

  const editEventCategory = async (data: EditEventCategoryInterface) => {
    const { id, categoryName, subCategoryName, description } = data;
    return await EventCategory.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { categoryName, subCategoryName, description },
      { new: true }
    );
  };

  const addOrgCategory = async (data: EventCategoryInterface) => {
    return await OrganizationCategory.create(data);
  };

  const deleteOrgCategory = async (id: string) => {
    return await OrganizationCategory.deleteOne({ _id: new ObjectId(id) });
  };

  const editOrgCategory = async (data: EditEventCategoryInterface) => {
    const { id, categoryName, subCategoryName, description } = data;
    return await OrganizationCategory.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { categoryName, subCategoryName, description },
      { new: true }
    );
  };

  const getSingleOrgCategory = async (id: string) => {
    return await OrganizationCategory.findOne({ _id: new ObjectId(id) });
  };

  const getAllOrgCategory = async () => {
    return await OrganizationCategory.find({});
  };

  const getAllEvents = async () => {
    const data = await Event.find({});
    return data;
  };

  const approveEvent = async (id: string) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(id) },
      { status: "approved" }
    );
    return res;
  };

  const rejectEvent = async (id: string) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(id) },
      { status: "rejected" }
    );
    return res;
  };

  const getTotalUsers = async () => {
    const data = await User.find({});
    return data;
  };

  const getTotalOrganization = async () => {
    const data = await Organization.find({});
    return data;
  };

  const getTotalTicketsSold = async () => {
    const data = await Event.aggregate([
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
    return data;
  };

  const getTotalEvents = async () => {
    const data = await Event.find({});
    return data;
  };

  const getAdminMonthlySales = async () => {
    const data = await Bookings.aggregate([
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

  const getAdminMonthlyTicketSales = async () => {
    const data = await Bookings.aggregate([
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

  const getAdminTicketTypeSold = async () => {
    const data = await Bookings.aggregate([
      {
        $group: {
          _id: "$paymentType",
          totalTickets: { $sum: "$ticketCount" },
        },
      },
      {
        $project: {
          _id: 0,
          paymentType: "$_id", // Rename _id field to month
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

  const getMostSoldEvents = async () => {
    const data = await Event.aggregate([
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
      {
        $sort: {
          totalTickets: -1,
        },
      },
    ]);
    return data;
  };

  const getAllBookings = async () => {
    const data = await Bookings.aggregate([
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

  const addCities = async (data: CityInterface) => {
    const cityModel = new Cities(data);
    const res = await cityModel.save();
    return res;
  };

  const getAllCities = async () => {
    const data = await Cities.find({});
    return data;
  };

  const deleteCity = async (id: string) => {
    const res = await Cities.deleteOne({ _id: new ObjectId(id) });
    return res;
  };

  const addPromotedEvent = async (eventId: string) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(eventId) },
      { isPromoted: true }
    );
    if (res) {
      return { message: "adding event to promoted events done", ok: true };
    } else {
      return { error: "adding event to promoted events failed", ok: false };
    }
  };

  const deletePromotedEvent = async (eventId: string) => {
    const res = await Event.updateOne(
      { _id: new ObjectId(eventId) },
      { isPromoted: false }
    );
    if (res) {
      return { message: "deleting from promoted event done", ok: true };
    } else {
      return { error: "deleting from promoted event failed", ok: false };
    }
  };

  const blockUser = async (userId: string) => {
    const res = await User.updateOne({ _id: new ObjectId(userId) }, { status: 'blocked' })
    if (res) {
      return {message:'blocking user done',ok:true,res}
    } else {
      return { message: 'blocking user not done', ok:false}
    }
  }

  const unBlockUser = async (userId: string) => {
    const res = await User.updateOne({ _id: new ObjectId(userId) }, { status: 'active' })
      if (res) {
        return { message: 'unblocking user done', ok: true, res }
      } else {
        return {message:'unblocking user not done',ok:true}
      }
    }
  

  return {
    getAdminByEmail,
    addEventCategory,
    deleteEventCategory,
    getEventCategories,
    getSingleEventCategory,
    editEventCategory,
    addOrgCategory,
    deleteOrgCategory,
    editOrgCategory,
    getSingleOrgCategory,
    getAllOrgCategory,
    getAllEvents,
    approveEvent,
    rejectEvent,
    getTotalUsers,
    getTotalOrganization,
    getTotalTicketsSold,
    getTotalEvents,
    getAdminTicketTypeSold,
    getAdminMonthlyTicketSales,
    getAdminMonthlySales,
    getMostSoldEvents,
    getAllBookings,
    addCities,
    getAllCities,
    deleteCity,
    addPromotedEvent,
    deletePromotedEvent,
    blockUser,
    unBlockUser,
  };
};

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;
export type AdminRepositoryDBReturn = ReturnType<AdminRepositoryMongoDB>;
