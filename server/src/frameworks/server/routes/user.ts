import express from "express";
import organizationController from "../../../adapters/controllers/user_side/organization";
import userController from "../../../adapters/controllers/user_side/user";
import { organizationDbRepository } from "../../../application/repositories/organizationDBRepository";
import { organizationRepositoryMongoDB } from "../../database/mongoDB/repositories/organizationRepository";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
const userRouter = () => {
  const router = express.Router();
  const orgController = organizationController(
    organizationDbRepository,
    organizationRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB,
  );
  const controller = userController(
    userDbRepository,
    userRepositoryMongoDB,
  )

  router.post("/register-organization", orgController.registerOrganization);
  router.get('/get-user-details',controller.getUserByEmail)
  router.get('/get-all-approved-events',controller.getApprovedEventsController)
  router.get('/get-complete-event-details/:id',controller.getCompleteEventDetailsController)
  router.post('/ticket-booking',controller.createBookingController)
  router.get('/get-booking-details',controller.getBookingsController)
  router.get('/get-one-booking-details/:bookingId',controller.getOneBookingDetailsController)
  router.get('/cancel-booking/:id',controller.cancelBookingController)

  return router;
};

export default userRouter;
