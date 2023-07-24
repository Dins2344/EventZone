import Admin from "../models/adminModel";
import EventCategory from "../models/eventCategory";
import OrganizationCategory from "../models/orgCategory";
import AdminInterface from "../../../../types/adminInterface";
import {
  EventCategoryInterface,
  EditEventCategoryInterface,
} from "../../../../types/adminInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";
import User from "../models/userModel";
import Organization from "../models/organizationModel";
import Bookings from "../models/bookings";

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

  const getAdminMonthlySales = async()=>{
    const data = await Bookings.aggregate([
      {
        $addFields: {
          // Convert the bookingTime string into a date object
          bookingDate: { $dateFromString: { dateString: '$bookingTime' } }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$bookingDate' } },
          totalSales: { $sum: '$totalAmount' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id', // Rename _id field to month
          totalSales: 1
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ])
    return data
  }

  const getAdminMonthlyTicketSales = async()=>{
    const data = await Bookings.aggregate([
      {
        $addFields: {
          // Convert the bookingTime string into a date object
          bookingDate: { $dateFromString: { dateString: '$bookingTime' } }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$bookingDate' } },
          totalTickets: { $sum: '$ticketCount' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id', // Rename _id field to month
          totalTickets: 1
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ])
    return data
  }

  const getAdminTicketTypeSold = async()=>{
    const data = await Bookings.aggregate([
    
      {
        $group: {
          _id: '$paymentType',
          totalTickets: { $sum: '$ticketCount' }
        }
      },
      {
        $project: {
          _id: 0,
          paymentType: '$_id', // Rename _id field to month
          totalTickets: 1
        }
      },
      {
        $sort: {
          month: 1
        }
      }
    ])
    return data
  }

  const getMostSoldEvents = async()=>{
    const data = await Event.aggregate([
      {
        $group: {
          _id: '$eventName',
          totalTickets: { $sum: '$ticketSold' },
        }
      },
      {
        $project: {
          _id: 0,
          eventName: '$_id', // Rename _id field to month
          totalTickets: 1,
          imageURL:1,
          category:1
        }
      },
      {
        $sort: {
          totalTickets: -1
        }
      }
     
    ])
    console.log(data)
    return data
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
    getMostSoldEvents
  };
};

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;
export type AdminRepositoryDBReturn = ReturnType<AdminRepositoryMongoDB>;
