import { Request, Response } from "express";
import { OrganizationDBInterface } from "../../../application/repositories/organizationDBRepository";
import { OrganizationRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/organizationRepository";
import asyncHandler from "express-async-handler";
import { CreateOrganization } from "../../../types/userInterface";
import {
  getAllOrganizationCategories,
  getMonthlySales,
  getMonthlyTicketSales,
  getOrgOwnerDetails,
  getOrganizationDetails,
  getOrganizersAllBookings,
  getTicketTypeSold,
  getTicketsSoldByEvents,
  organizationRegister,
  updateOrganizationInfo,
} from "../../../application/usecases/organization/organization";
import { CustomRequest } from "../../../types/userInterface";
import { addOrganization } from "../../../application/usecases/user/userAuth";
import { UserDBInterface } from "../../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import {
  getAllEventCategories,
  getUsersOrganizations,
  addBasicEventInfo,
  addMediaEventInfo,
  addPublishEventInfo,
  getEventDetails,
  publishEvent,
  getUsersAllEvents,
  getOrganizersAllEvent,
} from "../../../application/usecases/organization/organization";
import { MediaFormInterface } from "../../../types/organizerInterface";

const organizationController = (
  organizationDbRepository: OrganizationDBInterface,
  organizationDbRepositoryImpl: OrganizationRepositoryMongoDB,
  userDbRepository: UserDBInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryOrganization = organizationDbRepository(
    organizationDbRepositoryImpl()
  );
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());

  const registerOrganization = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const organization: CreateOrganization = req.body;
      if (req.user) {
        const { Id, email } = req.user;
        organization.userId = Id;
        organization.ownerId = Id;
      }
      const response = await organizationRegister(
        organization,
        dbRepositoryOrganization
      );
      let added;
      if (response) {
        added = await addOrganization(
          response._id.toString(),
          response.userId ?? "",
          dbRepositoryUser
        );
      }

      res.json({
        status: "success",
        message: "organization created",
        response,
        added,
      });
    }
  );

  const getAllEventCategoriesController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await getAllEventCategories(dbRepositoryOrganization);
      console.log(data);
      if (data) {
        res.json({ message: "data received", data });
      } else {
        res.status(404).json({ error: "data fetching failed" });
      }
    }
  );
  const getUsersOrganizationsController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      if (req.user) {
        const { Id }: { Id: string } = req.user;
        const data = await getUsersOrganizations(Id, dbRepositoryOrganization);
        if (data) {
          res.json({ message: "data fetched", data });
        } else {
          res.status(404).json({ error: "fetching failed" });
        }
      }
    }
  );

  const getOrganizationDetailController = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.params.id);
      const orgId = req.params.id;
      const data = await getOrganizationDetails(
        orgId,
        dbRepositoryOrganization
      );
      if (data) {
        res.json({ message: "organization data fetched", ok: true, data });
      } else {
        res.json({ error: "fetching organization data failed" });
      }
    }
  );

  const addBasicEventInfoController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      data.status = "draft";
      const response = await addBasicEventInfo(data, dbRepositoryOrganization);
      if (response) {
        res.json({ message: "adding basicInfo done", response });
      } else {
        res.status(404).json({ error: "adding basicInfo failed" });
      }
    }
  );

  const addMediaEventInfoController = asyncHandler(
    async (req: Request, res: Response) => {
      const data: MediaFormInterface = req.body;
      const medias = req.files as Express.Multer.File[];
      const response = await addMediaEventInfo(
        data,
        medias,
        dbRepositoryOrganization
      );
      if (response) {
        res.json({ message: "adding media info done", response });
      } else {
        res.json({ error: "adding media info failed" });
      }
    }
  );

  const addPublishEventInfoController = asyncHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      console.log(data);
      const response = await addPublishEventInfo(
        data,
        dbRepositoryOrganization
      );
      if (response) {
        res.json({ message: "adding ticket details done", response });
      } else {
        res.json({ error: "adding ticket info failed" });
      }
    }
  );

  const getEventDetailsController = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const data = await getEventDetails(id, dbRepositoryOrganization);
      if (data) {
        res.json({ message: "getting event data done", data });
      } else {
        res.json({ error: "event data fetching failed" });
      }
    }
  );

  const publishEventController = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      console.log(id);
      const response = await publishEvent(id, dbRepositoryOrganization);
      if (response) {
        res.json({ message: "publishing request sent", response });
      } else {
        res.json({ error: "publishing event failed" });
      }
    }
  );

  const getUsersAllEventsController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const user = req.user;
      if (user) {
        const { Id } = user;
        const data = await getUsersAllEvents(Id, dbRepositoryOrganization);
        if (data) {
          res.json({ message: "users events getting done", data });
        } else {
          res.json({ error: "users events fetching failed" });
        }
      }
    }
  );

  const getOrganizersAllEventController = asyncHandler(
    async (req: Request, res: Response) => {
      const orgId = req.params.id;
      console.log(orgId);
      const data = await getOrganizersAllEvent(orgId, dbRepositoryOrganization);
      if (data) {
        res.json({ message: "events fetching done", data });
      } else {
        res.json({ error: "event fetching failed" });
      }
    }
  );

  const getOrganizersAllBookingsController = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const user = req.user;
      if (user) {
        console.log(user);
        const { Id } = user;
        const data = await getOrganizersAllBookings(
          Id,
          dbRepositoryOrganization
        );
        if (data) {
          res.json({ message: "getting organizers all booking done", data });
        } else {
          res.json({ error: "getting organizers all booking failed" });
        }
      }
    }
  );

  const getOrgOwnerDetailsController = asyncHandler(async(req:Request,res:Response)=>{
    const ownerId = req.params.id
    const data = await getOrgOwnerDetails(ownerId,dbRepositoryOrganization)
    if(data){
      res.json({message:'owner details fetched',ok:true,data})
    }else{
      res.json({error:'owner details fetching failed'})
    }
  })

  const getAllOrganizationCategoriesController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAllOrganizationCategories(dbRepositoryOrganization)
    if(data){
      res.json({message:'orgCategory fetching done',ok:true,data})
    }else{
      res.json({error:'orgCategory fetching failed'})
    }
  })

  const updateOrganizationInfoController = asyncHandler(async(req:Request,res:Response)=>{
    const data = req.body
    const logo = req.files  as Express.Multer.File[];
    if(logo?.length){
      data.logo = logo[0].path
    }
    const response = await updateOrganizationInfo(data,dbRepositoryOrganization)
    if(response){
      res.json({message:'updating orgInfo done',ok:true,response})
    }else{
      res.json({error:'updating failed'})
    }
  })

  const getMonthlySalesController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getMonthlySales(dbRepositoryOrganization)
    if(data){
      res.json({message:'fetching data done ',ok:true,data})
    }else{
      res.json({error:'monthly data fetching failed'})
    }
  })

  const getMonthlyTicketSalesController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getMonthlyTicketSales(dbRepositoryOrganization)
    if(data){
      res.json({message:'ticket sales data fetching done',ok:true,data})
    }else{
      res.json({error:'ticket sales data fetching error'})
    }
  })

  const getTicketTypeSoldController = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getTicketTypeSold(dbRepositoryOrganization)
    if(data){
      res.json({message:'fetching ticket type sold done',ok:true,data})
    }else{
      res.json({error:'fetching ticket type sold failed ',ok:false})
    }
  })

  const getTicketsSoldByEventsController = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const user = req?.user
    if(user){
      const data = await getTicketsSoldByEvents(user.Id,dbRepositoryOrganization)
      if(data){
        res.json({message:'fetching data done',ok:true,data})
      }else{
        res.json({error:'fetching data failed'})
      }
    }else{
      res.json({error:'invalid token'})
    }
  })

  return {
    registerOrganization,
    getAllEventCategoriesController,
    getUsersOrganizations,
    getOrganizationDetailController,
    getUsersOrganizationsController,
    addBasicEventInfoController,
    addMediaEventInfoController,
    addPublishEventInfoController,
    getEventDetailsController,
    publishEventController,
    getUsersAllEventsController,
    getOrganizersAllEventController,
    getOrganizersAllBookingsController,
    getOrgOwnerDetailsController,
    getAllOrganizationCategoriesController,
    updateOrganizationInfoController,
    getMonthlySalesController,
    getMonthlyTicketSalesController,
    getTicketTypeSoldController,
    getTicketsSoldByEventsController
  };
};

export default organizationController;
