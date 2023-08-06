import express from "express";
import organizationController from "../../../adapters/controllers/user_side/organization";
import { organizationDbRepository } from "../../../application/repositories/organizationDBRepository";
import { organizationRepositoryMongoDB } from "../../database/mongoDB/repositories/organizationRepository";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import { upload } from "../middlewares/cloudinary";
import { sendNotificationMails } from "../../../application/services/sendNotificaton";
import { sendNotificationMail } from "../../service/sendNotificationMail";
// import { uploadMiddleware } from "../middlewares/cloudinary";

const organizationRouter = () => {
  const router = express.Router();
  const orgController = organizationController(
    organizationDbRepository,
    organizationRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB,
    sendNotificationMails,
    sendNotificationMail
  );

  router.get(
    "/get-all-event-categories",
    orgController.getAllEventCategoriesController
  );
  router.get(
    "/get-user-organizations",
    orgController.getUsersOrganizationsController
  );

  router.get('/get-all-cities',orgController.getOrgAllCitiesController)

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

  router.get('/get-all-organization-categories',orgController.getAllOrganizationCategoriesController)
  
  router.post('/update-organization-info',upload,orgController.updateOrganizationInfoController)

  router.get('/get-monthly-sales',orgController.getMonthlySalesController)

  router.get('/get-monthly-ticket-sales',orgController.getMonthlyTicketSalesController)

  router.get('/get-ticket-type-sold',orgController.getTicketTypeSoldController)

  router.get('/get-tickets-sold-by-events', orgController.getTicketsSoldByEventsController)
  router.put("/update-event-info",orgController.updateEventInfoController);

  return router;
};

export default organizationRouter;
