import api from "../itercepters/intercepter";

interface createOrganizerInterface {
  orgName: string;
  orgType: string;
}

export const createOrganizer = async (OrgData: createOrganizerInterface) => {
  try {
    const response = await api.post(
      "http://localhost:4000/user/register-organization",
      OrgData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error in fetching", error);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(
      `http://localhost:4000/user/get-user-details`
    );
   
    return response
  } catch (error) {
    console.log(error);
  }
};
