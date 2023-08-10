"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = __importDefault(require("../../../adapters/controllers/admin_side/adminControllers"));
const adminDBRepository_1 = require("../../../application/repositories/adminDBRepository");
const adminRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/adminRepositoryMongoDB");
const adminRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminControllers_1.default)(adminDBRepository_1.adminDbRepository, adminRepositoryMongoDB_1.adminRepositoryMongoDB);
    router.post("/add-event-category", controller.addEventCategoryController);
    router.get("/delete-event-category/:id", controller.deleteEventCategoryController);
    router.get("/get-all-event-categories", controller.getEventCategoriesController);
    router.get("/get-single-event-categories/:id", controller.getSingleEventCategoryController);
    router.post("/edit-event-category", controller.editEventCategoryController);
    router.post("/add-org-category", controller.addOrgCategoryController);
    router.get("/delete-org-category/:id", controller.deleteOrgCategoryController);
    router.post("/edit-org-category", controller.editOrgCategoryController);
    router.get("/get-single-org-category/:id", controller.getSingleOrgCategoryController);
    router.get("/get-all-org-categories", controller.getAllOrgCategoryController);
    router.get("/get-all-events", controller.getAllEventsController);
    router.get("/approve-event/:id", controller.approveEventController);
    router.get("/reject-event/:id", controller.rejectEventController);
    router.get("/getTotalUsers", controller.getTotalUsersController);
    router.get("/getTotalEvents", controller.getTotalEventsController);
    router.get("/getTotalOrganizers", controller.getTotalOrganizationsController);
    router.get("/getTotalTicketsSold", controller.getTotalTicketsSoldController);
    router.get("/get-monthly-sales", controller.getAdminMonthlySalesController);
    router.get("/get-monthly-ticket-sales", controller.getAdminMonthlyTicketSalesController);
    router.get("/get-monthly-ticket-type-sales", controller.getAdminTicketTypeSoldController);
    router.get("/get-most-sold-events", controller.getMostSoldEventsController);
    router.get("/get-all-bookings", controller.getAllBookingsController);
    router
        .route("/city-manage")
        .post(controller.addCitiesController)
        .get(controller.getAllCitiesController);
    router.delete("/city-manage/:id", controller.deleteCityController);
    router
        .route("/update-promoted-events/:id")
        .get(controller.addPromotedEventController)
        .delete(controller.deletePromotedEventController);
    router
        .route("/update-user-status/:id")
        .get(controller.blockUserController)
        .put(controller.unBlockUserController);
    return router;
};
exports.default = adminRouter;
