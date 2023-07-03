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
  addBasicEventInfo
} from "../../../application/usecases/organizatioin/organization";

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
      console.log(response)
      if(response){
        res.json({message:'adding basicInfo done',response})
      }else{
        res.status(404).json({error:'adding basicInfo failed'})
      }
    }
  )

  const addMediaEventInfoController = asyncHandler(async(req:Request,res:Response)=>{
    const data = req.body
    console.log(req.files)
    // const uploadedImages=req?.files.map(file => file.path)
  })

  return {
    registerOrganization,
    getAllEventCategoriesController,
    getUsersOrganizations,
    getUsersOrganizationsController,
    addBasicEventInfoController,
    addMediaEventInfoController
  };
};

export default organizationController;
