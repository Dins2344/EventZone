import api from "../itercepters/intercepter";
import { BasicFormInterface } from "../../types/organizerInterface";
import { PublishFormDataInterface } from "../../types/organizerInterface";

export const getUsersOrganizations = async () => {
  const data = await api.get(
    "http://localhost:4000/organization/get-user-organizations"
  );
  return data;
};

export const getOrganizationDetails = async (id: string) => {
  const data = await api.get(
    `http://localhost:4000/organization/get-organization-details/${id}`
  );
  return data;
};

export const getEventCategories = async () => {
  const data = await api.get(
    "http://localhost:4000/organization/get-all-event-categories"
  );
  return data;
};

export const addBasicEventInfo = async (data: BasicFormInterface) => {
  const res = await api.post(
    "http://localhost:4000/organization/add-event-basic-info",
    data
  );
  return res;
};

export const addMediaEventInfo = async (data: FormData) => {
  console.log(data);
  try {
    const res = await api.post(
      "http://localhost:4000/organization/add-event-media-info",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addPublishEventInfo = async (data: PublishFormDataInterface) => {
  try {
    const res = await api.post(
      "http://localhost:4000/organization/add-event-publish-info",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getEventDetails = async (id: string) => {
  try {
    const res = await api.get(
      `http://localhost:4000/organization/get-event-details/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const publishEvent = async (id: string) => {
  console.log("publish called");
  try {
    const res = await api.get(
      `http://localhost:4000/organization/publish-event/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersAllEvents = async () => {
  try {
    const data = await api.get(
      "http://localhost:4000/organization/get-users-all-events"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
