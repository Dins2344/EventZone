import { BookingCreationInterface, UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import { CreateUserInterface } from "../../../../types/userInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";
import Organization from "../models/organizationModel";
import Bookings from "../models/bookings";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
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
                $expr: { $eq: ["$_id", "$$organizerId"] }
              }
            }
          ],
          as: "organizerInfo"
        }
      },
      {
        $unwind: "$organizerInfo",
      },
    ]);
    return data;
  };

  const createBooking = async(data:BookingCreationInterface)=>{
    const res = await Bookings.create(data)
    return res
  }
  return {
    addUser,
    getUserByEmail,
    addOrganization,
    getApprovedEvents,
    getCompleteEventDetails,
    createBooking
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
