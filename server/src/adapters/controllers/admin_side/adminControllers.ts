import { Response, Request, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  addEventCategory,
  deleteEventCategory,
  getEventCategories,
  getSingleEventCategory,
  editEventCategory,
  addOrgCategory,
  deleteOrgCategory,
  editOrgCategory,
  getSingleOrgCategory,
  getAllOrgCategory
} from "../../../application/usecases/admin/adminUsecases";
import { AdminDbInterface } from "../../../application/repositories/adminDBRepository";
import { AdminRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/adminRepositoryMongoDB";

const adminController = (
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB
) => {
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());

  const addEventCategoryController = asyncHandler(
    async (req: Request, res: Response) => {
      const eventData = req.body;
      const response = await addEventCategory(eventData, dbRepositoryAdmin);
      if (response) {
        res.json({ message: "added" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );

  const deleteEventCategoryController = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id
    const response = await deleteEventCategory(id,dbRepositoryAdmin)
    if (response) {
      res.json({ message: "deleted" });
    } else {
      res.status(404).json({ error: "deletion failed" });
    }
  })

  const getEventCategoriesController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await getEventCategories(dbRepositoryAdmin);
      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "data fetching failed" });
      }
    }
  );

  const getSingleEventCategoryController = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const data = await getSingleEventCategory(id, dbRepositoryAdmin);
      if (data) {
        res.json({ data });
      } else {
        res.status(404).json({ error: "data fetching failed" });
      }
    }
  );

  const editEventCategoryController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      const response = await editEventCategory(data, dbRepositoryAdmin);
      if (response) {
        res.json({ response });
      } else {
        res.status(404).json({ error: "data updating failed" });
      }
    }
  );

  const addOrgCategoryController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      const response = await addOrgCategory(data, dbRepositoryAdmin);
      if (response) {
        res.json({ message: "added" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );

  const deleteOrgCategoryController = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      console.log(id)
      const response = await deleteOrgCategory(id, dbRepositoryAdmin);
      if (response) {
        res.json({ message: "deleted" });
      } else {
        res.status(404).json({ error: "deletion failed" });
      }
    }
  );

  const editOrgCategoryController = asyncHandler(async(req:Request,res:Response)=>{
    const data = req.body
    const response = await editOrgCategory(data,dbRepositoryAdmin)
    if (response) {
      res.json({ response });
    } else {
      res.status(404).json({ error: "data updating failed" });
    }
  })

  const getSingleOrgCategoryController = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params._id
    const data = await getSingleOrgCategory(id,dbRepositoryAdmin)
    if (data) {
      res.json({ data });
    } else {
      res.status(404).json({ error: "data fetching failed" });
    }
    
  })

  const getAllOrgCategoryController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAllOrgCategory(dbRepositoryAdmin)
    if (data) {
      res.json({ data });
    } else {
      res.status(404).json({ error: "data fetching failed" });
    }
  })

  return {
    addEventCategoryController,
    getEventCategoriesController,
    getSingleEventCategoryController,
    editEventCategoryController,
    addOrgCategoryController,
    deleteOrgCategoryController,
    deleteEventCategoryController,
    editOrgCategoryController,
    getSingleOrgCategoryController,
    getAllOrgCategoryController
  };
};

export default adminController;
