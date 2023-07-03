import adminApi from "../itercepters/adminIterceptors";
import { eventCategoryInterface } from "../../types/adminInterface";
import { editEventCategoriesInterface } from "../../components/admin_components/editEventCategory";

interface eventCategory {
  categoryName: string;
  subCategoryName: string;
  description: string;
}

export const eventCategoryFormSubmit = async (data: eventCategory) => {
  try {
    const response = await adminApi.post(
      "http://localhost:4000/admin/add-event-category",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const orgCategoryFormSubmit = async(data:eventCategory)=>{
    try {
        const response = await adminApi.post(
          "http://localhost:4000/admin/add-org-category",
          data
        );
        return response;
      } catch (error) {
        console.log(error);
      }
}

export const getAllEventCategories = async () => {
  try {
    const data = await adminApi.get(
      "http://localhost:4000/admin/get-all-event-categories"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllOrgCategories = async () => {
  try {
    const data = await adminApi.get(
      "http://localhost:4000/admin/get-all-org-categories"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEventCategories = async (id: string | undefined) => {
  try {
    const data = await adminApi.get(
      `http://localhost:4000/admin/get-single-event-categories/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const eventCategoryEditFormSubmit = async (
  data: editEventCategoriesInterface
) => {
  try {
    console.log(data);
    const response = await adminApi.post(
      "http://localhost:4000/admin/edit-event-category",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteEventCategory = async(
  id:string
)=>{
  try{
    const response = await adminApi.get(`http://localhost:4000/admin/delete-event-category/${id}`)
    return response
  }catch(error){
    console.log(error)
  }
}

export const deleteOrgCategory = async(
  id:string
)=>{
  try{
    const response = await adminApi.get(`http://localhost:4000/admin/delete-org-category/${id}`)
    return response
  }catch(error){
    console.log(error)
  }
}
