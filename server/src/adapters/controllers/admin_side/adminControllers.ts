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
  getAllOrgCategory,
  getAllEvents,
  approveEvent,
  rejectEvent,
  getTotalEvents,
  getTotalUsers,
  getTotalOrganization,
  getTotalTicketsSold,
  getAdminMonthlySales,
  getAdminMonthlyTicketSales,
  getAdminTicketTypeSold,
  getMostSoldEvents
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

  const getAllEventsController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAllEvents(dbRepositoryAdmin)
    if(data){
      res.json({message:'getting all events done',data})
    }else{
      res.json({error:'getting all events failed'})
    }
  })

  const approveEventController = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id
    const response = await approveEvent (id,dbRepositoryAdmin)
    if(response){
      res.json({message:'approve status updated',response})
    }else{
      res.json({error:'approve status updating failed',response})
    }
  })

  const rejectEventController = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id
    const response = await rejectEvent(id,dbRepositoryAdmin)
    if(response){
      res.json({message:'reject status updated',response})
    }else{
      res.json({error:'reject status updating failed',response})
    }
  })

  const getTotalEventsController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getTotalEvents(dbRepositoryAdmin)
    if(data){
      res.json({message:'total events fetching done',ok:true,data})
    }else{
      res.json({error:'total events fetching failed'})
    }
  })

  const getTotalUsersController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getTotalUsers(dbRepositoryAdmin)
    if(data){
      res.json({message:'total users fetching done',ok:true,data})
    }else{
      res.json({error:'total users fetching failed'})
    }
  })

  const getTotalOrganizationsController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getTotalOrganization(dbRepositoryAdmin)
    if(data){
      res.json({message:'total organization fetching done',ok:true,data})
    }else{
      res.json({error:'total organization fetching failed'})
    }
  })

  const getTotalTicketsSoldController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getTotalTicketsSold(dbRepositoryAdmin)
    if(data){
      res.json({message:'total ticket sold fetching done',ok:true,data})
    }else{
      res.json({error:'total ticket sold fetching failed'})
    }
  })

  const getAdminMonthlySalesController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAdminMonthlySales(dbRepositoryAdmin)
    if(data){
      res.json({message:'monthly sales data fetched',ok:true,data})
    }else{
      res.json({error:'monthly sales data fetching failed',ok:false,})
    }
  })

  const getAdminMonthlyTicketSalesController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAdminMonthlyTicketSales(dbRepositoryAdmin)
    if(data){
      res.json({message:'monthly ticket sales data fetched',ok:true,data})
    }else{
      res.json({error:'monthly ticket sales data failed'})
    }
  })

  const getAdminTicketTypeSoldController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAdminTicketTypeSold(dbRepositoryAdmin)
    if(data){
      res.json({message:'monthly ticket type sold data fetched',ok:true,data})
    }else{
      res.json({error:'monthly ticket type sold data fetching failed'})
    }
  })

  const getMostSoldEventsController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getMostSoldEvents(dbRepositoryAdmin)
    if(data){
      res.json({message:'most sold events data fetched',ok:true,data})
    }else{
      res.json({error:'most sold events fetching failed'})
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
    getAllOrgCategoryController,
    getAllEventsController,
    approveEventController,
    rejectEventController,
    getTotalEventsController,
    getTotalUsersController,
    getTotalOrganizationsController,
    getTotalTicketsSoldController,
    getAdminMonthlySalesController,
    getAdminMonthlyTicketSalesController,
    getAdminTicketTypeSoldController,
    getMostSoldEventsController
  };
};

export default adminController;
