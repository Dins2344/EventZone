import express from "express";
import organizationController from "../../../adapters/controllers/user_side/organization";
import userController from "../../../adapters/controllers/user_side/user";
import { organizationDbRepository } from "../../../application/repositories/organizationDBRepository";
import { organizationRepositoryMongoDB } from "../../database/mongoDB/repositories/organizationRepository";
import { userDbRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authService } from "../../service/authService";
import jwtAuthMiddleware from "../middlewares/authJWT";
import { userRoleChecking } from "../middlewares/roleChecking";
import { upload } from "../middlewares/cloudinary";
const userRouter = () => {
  const router = express.Router();
  const orgController = organizationController(
    organizationDbRepository,
    organizationRepositoryMongoDB,
    userDbRepository,
    userRepositoryMongoDB
  );
  const controller = userController(
    userDbRepository,
    userRepositoryMongoDB,
    authServiceInterface,
    authService
  );

  router.post(
    "/register-organization",
    jwtAuthMiddleware,
    orgController.registerOrganization
  );
  router.get(
    "/get-user-details",
    jwtAuthMiddleware,
    userRoleChecking,
    controller.getUserByEmail
  );
  router.get(
    "/get-user-details-by-Id",
    jwtAuthMiddleware,
    controller.getUserByIdController
  );
  router.get(
    "/get-all-approved-events",
    controller.getApprovedEventsController
  );
  router.get(
    "/get-complete-event-details/:id",
    controller.getCompleteEventDetailsController
  );
  router.post(
    "/ticket-booking",
    jwtAuthMiddleware,
    userRoleChecking,
    controller.createBookingController
  );
  router.get(
    "/get-booking-details",
    jwtAuthMiddleware,
    userRoleChecking,
    controller.getBookingsController
  );
  router.get(
    "/get-one-booking-details/:bookingId",
    jwtAuthMiddleware,
    userRoleChecking,
    controller.getOneBookingDetailsController
  );
  router.get(
    "/cancel-booking/:id",
    jwtAuthMiddleware,
    userRoleChecking,
    controller.cancelBookingController
  );
  router.get("/get-all-organizers", controller.getAllOrganizersController);
  router.post(
    "/add-profile-contact-info",
    upload,
    jwtAuthMiddleware,
    controller.addProfileContactInfoController
  );
  router.post(
    "/add-address",
    jwtAuthMiddleware,
    controller.addAddressController
  );
  router.get(
    "/get-address-info",
    jwtAuthMiddleware,
    controller.getAddressInfoController
  );
  router.post(
    "/verify-password",
    jwtAuthMiddleware,
    controller.verifyPasswordController
  );
  router.post(
    "/update-email",
    jwtAuthMiddleware,
    controller.updateEmailController
  );
  router.get("/search", jwtAuthMiddleware, controller.searchEventsController);
  router
    .route("/update-following/:id")
    .get(jwtAuthMiddleware, controller.addFollowController)
    .put(jwtAuthMiddleware, controller.unFollowController);

  router
    .route("/update-like-list/:id")
    .get(jwtAuthMiddleware, controller.likeEventController)
    .put(jwtAuthMiddleware, controller.unLikeEventController);
  router.get(
    "/get-all-liked-events",
    jwtAuthMiddleware,
    controller.getLikedEventsController
  );
  router.get(
    "/get-all-following-orgs",
    jwtAuthMiddleware,
    controller.getFollowingController
  );
  router.get(
    "/update-booking-attended/:id",
    jwtAuthMiddleware,
    controller.updateBookingsController
  );
  router
    .route("/add-review")
    .post(jwtAuthMiddleware, controller.addReviewController);
  router.get(
    "/get-reviews/:id",
    jwtAuthMiddleware,
    controller.getReviewsController
  );

  return router;
};

export default userRouter;
