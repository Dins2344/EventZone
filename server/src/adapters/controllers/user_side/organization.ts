import { Request, Response } from "express";
import { OrganizationDBInterface } from "../../../application/repositories/organizationDBRepository";
import { OrganizationRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/organizationRepository";
import asyncHandler from "express-async-handler";
import { CreateOrganization } from "../../../types/userInterface";
import { organizationRegister } from "../../../application/usecases/organizatioin/organization";
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
  getEventDetails
} from "../../../application/usecases/organizatioin/organization";
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
      console.log(response);
      if (response) {
        added = await addOrganization(
          response._id.toString(),
          response.userId ?? "",
          dbRepositoryUser
        );
        console.log(added);
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

  const addBasicEventInfoController = asyncHandler(
    async(req:Request,res:Response)=>{
      const data = req.body
      data.status = 'draft'
      const response =await addBasicEventInfo(data,dbRepositoryOrganization)
      if(response){
        res.json({message:'adding basicInfo done',response})
      }else{
        res.status(404).json({error:'adding basicInfo failed'})
      }
    }
  )

  const addMediaEventInfoController = asyncHandler(async(req:Request,res:Response)=>{
    const data:MediaFormInterface = req.body
    const medias = req.files as Express.Multer.File[];
    const response = await addMediaEventInfo(data,medias,dbRepositoryOrganization)
    if(response){
      res.json({message:'adding media info done',response})
    }else{
      res.json({error:'adding media info failed'})
    }
  })

  const addPublishEventInfoController = asyncHandler(async(req:Request,res:Response)=>{
    const data = req.body
    console.log(data)
    const response = await addPublishEventInfo(data,dbRepositoryOrganization)
    if(response){
      res.json({message:'adding ticket details done',response})
    }else{
      res.json({error:'adding ticket info failed'})
    }
  })

  const getEventDetailsController = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id
    console.log(id)
    const data = await getEventDetails(id,dbRepositoryOrganization)
    if(data){
      res.json({message:'getting event data done',data})
    }else{
      res.json({error:'event data fetching failed'})
    }
  })

  return {
    registerOrganization,
    getAllEventCategoriesController,
    getUsersOrganizations,
    getUsersOrganizationsController,
    addBasicEventInfoController,
    addMediaEventInfoController,
    addPublishEventInfoController,
    getEventDetailsController
  };
};

export default organizationController;
