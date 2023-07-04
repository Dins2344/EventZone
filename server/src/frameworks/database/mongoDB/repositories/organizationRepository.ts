import Organization from "../models/organizationModel";
import EventCategory from "../models/eventCategory";
import Event from "../models/eventModel";
import { CreateOrganization } from "../../../../types/userInterface";
import { OrganizationInterface } from "../../../../types/userInterface";
import {
  BasicFormInterface,
  MediaFormInterface,
} from "../../../../types/organizerInterface";
import { ObjectId } from "mongodb";
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

  const addBasicEventInfo = async (data: BasicFormInterface) => {
    const res = await Event.create(data);
    return res;
  };

  const addMediaEventInfo = async (
    data: MediaFormInterface,
    media: Express.Multer.File[]
  ) => {
    const imageURL :Array<string> = media.map((file) => file.path);

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

  return {
    addOrganization,
    getAllEventCategories,
    getUsersOrganizations,
    addBasicEventInfo,
    addMediaEventInfo,
  };
};

export type OrganizationRepositoryMongoDB =
  typeof organizationRepositoryMongoDB;
