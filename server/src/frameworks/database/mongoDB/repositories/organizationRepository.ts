import Organization from "../models/organizationModel";
import EventCategory from "../models/eventCategory";
import Event from "../models/eventModel";
import { CreateOrganization } from "../../../../types/userInterface";
import { OrganizationInterface } from "../../../../types/userInterface";
import {
  BasicFormInterface,
  MediaFormInterface,
  PublishFormInterface,
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
    data.status = "draft";
    const organization = await Organization.findOne({
      orgName: data.organizer,
    });
    const ownerId = organization?.ownerId;
    if (ownerId) {
      data.orgOwnerId = ownerId;
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

  return {
    addOrganization,
    getAllEventCategories,
    getUsersOrganizations,
    addBasicEventInfo,
    addMediaEventInfo,
    addPublishEventInfo,
    getEventDetails,
    publishEvent,
    getUsersAllEvents,
  };
};

export type OrganizationRepositoryMongoDB =
  typeof organizationRepositoryMongoDB;
