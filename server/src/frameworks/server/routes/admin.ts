import express from "express";
import adminController from "../../../adapters/controllers/admin_side/adminControllers";
import { adminDbRepository } from "../../../application/repositories/adminDBRepository";
import { adminRepositoryMongoDB } from "../../database/mongoDB/repositories/adminRepositoryMongoDB";

const adminRouter = () => {
  const router = express.Router();
  const controller = adminController(adminDbRepository, adminRepositoryMongoDB);

  router.post("/add-event-category", controller.addEventCategoryController);
  router.get('/delete-event-category/:id',controller.deleteEventCategoryController)
  router.get('/get-all-event-categories',controller.getEventCategoriesController)
  router.get('/get-single-event-categories/:id',controller.getSingleEventCategoryController)
  router.post('/edit-event-category',controller.editEventCategoryController)
  router.post('/add-org-category',controller.addOrgCategoryController)
  router.get ('/delete-org-category/:id',controller.deleteOrgCategoryController)
  router.post('/edit-org-category',controller.editOrgCategoryController)
  router.get('/get-single-org-category/:id',controller.getSingleOrgCategoryController)
  router.get('/get-all-org-categories',controller.getAllOrgCategoryController)
  router.get('/get-all-events',controller.getAllEventsController)
  router.get('/approve-event/:id',controller.approveEventController)
  router.get('/reject-event/:id',controller.rejectEventController)

  return router;
};

export default adminRouter;
