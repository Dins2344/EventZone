"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organization_1 = __importDefault(require("../../../adapters/controllers/user_side/organization"));
const user_1 = __importDefault(require("../../../adapters/controllers/user_side/user"));
const organizationDBRepository_1 = require("../../../application/repositories/organizationDBRepository");
const organizationRepository_1 = require("../../database/mongoDB/repositories/organizationRepository");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../service/authService");
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const roleChecking_1 = require("../middlewares/roleChecking");
const cloudinary_1 = require("../middlewares/cloudinary");
const sendNotificaton_1 = require("../../../application/services/sendNotificaton");
const sendNotificationMail_1 = require("../../service/sendNotificationMail");
const userRouter = () => {
    const router = express_1.default.Router();
    const orgController = (0, organization_1.default)(organizationDBRepository_1.organizationDbRepository, organizationRepository_1.organizationRepositoryMongoDB, userDBRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, sendNotificaton_1.sendNotificationMails, sendNotificationMail_1.sendNotificationMail);
    const controller = (0, user_1.default)(userDBRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, authServiceInterface_1.authServiceInterface, authService_1.authService);
    router.post('/change-password', authJWT_1.default, controller.changePasswordController);
    router.post("/register-organization", authJWT_1.default, orgController.registerOrganization);
    router.get("/get-user-details", authJWT_1.default, roleChecking_1.userRoleChecking, controller.getUserByEmail);
    router.get("/get-user-details-by-Id", authJWT_1.default, controller.getUserByIdController);
    router.get("/get-all-approved-events", controller.getApprovedEventsController);
    router.get("/get-complete-event-details/:id", controller.getCompleteEventDetailsController);
    router.post("/ticket-booking", authJWT_1.default, roleChecking_1.userRoleChecking, controller.createBookingController);
    router.get("/get-booking-details", authJWT_1.default, roleChecking_1.userRoleChecking, controller.getBookingsController);
    router.get("/get-one-booking-details/:bookingId", authJWT_1.default, roleChecking_1.userRoleChecking, controller.getOneBookingDetailsController);
    router.get("/cancel-booking/:id", authJWT_1.default, roleChecking_1.userRoleChecking, controller.cancelBookingController);
    router.get("/get-all-organizers", controller.getAllOrganizersController);
    router.post("/add-profile-contact-info", cloudinary_1.upload, authJWT_1.default, controller.addProfileContactInfoController);
    router.post("/add-address", authJWT_1.default, controller.addAddressController);
    router.get("/get-address-info", authJWT_1.default, controller.getAddressInfoController);
    router.post("/verify-password", authJWT_1.default, controller.verifyPasswordController);
    router.post("/update-email", authJWT_1.default, controller.updateEmailController);
    router.get("/search", authJWT_1.default, controller.searchEventsController);
    router
        .route("/update-following/:id")
        .get(authJWT_1.default, controller.addFollowController)
        .put(authJWT_1.default, controller.unFollowController);
    router
        .route("/update-like-list/:id")
        .get(authJWT_1.default, controller.likeEventController)
        .put(authJWT_1.default, controller.unLikeEventController);
    router.get("/get-all-liked-events", authJWT_1.default, controller.getLikedEventsController);
    router.get("/get-all-following-orgs", authJWT_1.default, controller.getFollowingController);
    router.get("/update-booking-attended/:id", authJWT_1.default, controller.updateBookingsController);
    router
        .route("/add-review")
        .post(authJWT_1.default, controller.addReviewController);
    router.get("/get-reviews/:id", authJWT_1.default, controller.getReviewsController);
    router.get("/get-all-events-from-following-organizers", authJWT_1.default, controller.getEventsFromFollowingOrganizersController);
    return router;
};
exports.default = userRouter;
