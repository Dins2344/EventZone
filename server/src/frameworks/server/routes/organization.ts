import express from "express";
import organizationController from "../../../adapters/controllers/user_side/organization";
import { organizationDbRepository } from "../../../application/repositories/organizationDBRepository";
import { organizationRepositoryMongoDB } from "../../database/mongoDB/repositories/organizationRepository";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import { upload } from "../middlewares/cloudinary";
// import { uploadMiddleware } from "../middlewares/cloudinary";

const organizationRouter = () => {
  const router = express.Router();
  const orgController = organizationController(
    organizationDbRepository,
    organizationRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB
  );

  router.get(
    "/get-all-event-categories",
    orgController.getAllEventCategoriesController
  );
  router.get(
    "/get-user-organizations",
    orgController.getUsersOrganizationsController
  );

  router.get(
    "/get-organization-details/:id",
    orgController.getOrganizationDetailController
  );

  router.post(
    "/add-event-basic-info",
    orgController.addBasicEventInfoController
  );
  router.post(
    "/add-event-media-info",
    upload,
    orgController.addMediaEventInfoController
  );
  router.post(
    "/add-event-publish-info",
    orgController.addPublishEventInfoController
  );
  router.get("/get-event-details/:id", orgController.getEventDetailsController);

  router.get("/publish-event/:id", orgController.publishEventController);

  router.get(
    "/get-users-all-events",
    orgController.getUsersAllEventsController
  );

  router.get(
    "/get-organizers-all-events/:id",
    orgController.getOrganizersAllEventController
  );

  router.get(
    "/get-organizers-all-bookings",
    orgController.getOrganizersAllBookingsController
  );

  router.get('/get-organization-owner/:id',orgController.getOrgOwnerDetailsController)

  return router;
};

export default organizationRouter;
