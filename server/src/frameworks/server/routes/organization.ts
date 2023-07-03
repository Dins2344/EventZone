import express from "express";
import organizationController from "../../../adapters/controllers/user_side/organization";
import { organizationDbRepository } from "../../../application/repositories/organizationDBRepository";
import { organizationRepositoryMongoDB } from "../../database/mongoDB/repositories/organizationRepository";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import {upload} from "../middlewares/cloudinary";
// import { uploadMiddleware } from "../middlewares/cloudinary";


const organizationRouter = () => {
  const router = express.Router();
  const orgController = organizationController(
    organizationDbRepository,
    organizationRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB
  );

  router.get("/get-all-event-categories",
    orgController.getAllEventCategoriesController
  );
  router.get("/get-user-organizations",
  orgController.getUsersOrganizationsController);

  router.post('/add-event-basic-info',orgController.addBasicEventInfoController)
  router.post('/add-event-media-info',upload,orgController.addMediaEventInfoController)
  return router;
};

export default organizationRouter;
