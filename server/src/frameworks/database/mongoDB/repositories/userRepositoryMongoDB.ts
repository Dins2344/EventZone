import { UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import { CreateUserInterface } from "../../../../types/userInterface";
import { ObjectId } from "mongodb";
import Event from "../models/eventModel";

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

  const getApprovedEvents = async()=>{
    const data = await Event.find({status:'approved'})
    return data
  }

  return {
    addUser,
    getUserByEmail,
    addOrganization,
    getApprovedEvents
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
