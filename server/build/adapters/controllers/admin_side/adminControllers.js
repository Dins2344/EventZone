"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminUsecases_1 = require("./../../../application/usecases/admin/adminUsecases");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminUsecases_2 = require("../../../application/usecases/admin/adminUsecases");
const adminController = (adminDbRepository, adminDbRepositoryImpl) => {
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const addEventCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const eventData = req.body;
        const response = yield (0, adminUsecases_2.addEventCategory)(eventData, dbRepositoryAdmin);
        if (response) {
            res.json({ message: "added" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }));
    const deleteEventCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const response = yield (0, adminUsecases_2.deleteEventCategory)(id, dbRepositoryAdmin);
        if (response) {
            res.json({ message: "deleted" });
        }
        else {
            res.status(404).json({ error: "deletion failed" });
        }
    }));
    const getEventCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getEventCategories)(dbRepositoryAdmin);
        if (data) {
            res.json({ data });
        }
        else {
            res.status(404).json({ error: "data fetching failed" });
        }
    }));
    const getSingleEventCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, adminUsecases_2.getSingleEventCategory)(id, dbRepositoryAdmin);
        if (data) {
            res.json({ data });
        }
        else {
            res.status(404).json({ error: "data fetching failed" });
        }
    }));
    const editEventCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const response = yield (0, adminUsecases_2.editEventCategory)(data, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.status(404).json({ error: "data updating failed" });
        }
    }));
    const addOrgCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const response = yield (0, adminUsecases_2.addOrgCategory)(data, dbRepositoryAdmin);
        if (response) {
            res.json({ message: "added" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }));
    const deleteOrgCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const response = yield (0, adminUsecases_2.deleteOrgCategory)(id, dbRepositoryAdmin);
        if (response) {
            res.json({ message: "deleted" });
        }
        else {
            res.status(404).json({ error: "deletion failed" });
        }
    }));
    const editOrgCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const response = yield (0, adminUsecases_2.editOrgCategory)(data, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.status(404).json({ error: "data updating failed" });
        }
    }));
    const getSingleOrgCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params._id;
        const data = yield (0, adminUsecases_2.getSingleOrgCategory)(id, dbRepositoryAdmin);
        if (data) {
            res.json({ data });
        }
        else {
            res.status(404).json({ error: "data fetching failed" });
        }
    }));
    const getAllOrgCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAllOrgCategory)(dbRepositoryAdmin);
        if (data) {
            res.json({ data });
        }
        else {
            res.status(404).json({ error: "data fetching failed" });
        }
    }));
    const getAllEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAllEvents)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'getting all events done', data });
        }
        else {
            res.json({ error: 'getting all events failed' });
        }
    }));
    const approveEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const response = yield (0, adminUsecases_2.approveEvent)(id, dbRepositoryAdmin);
        if (response) {
            res.json({ message: 'approve status updated', response });
        }
        else {
            res.json({ error: 'approve status updating failed', response });
        }
    }));
    const rejectEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const response = yield (0, adminUsecases_2.rejectEvent)(id, dbRepositoryAdmin);
        if (response) {
            res.json({ message: 'reject status updated', response });
        }
        else {
            res.json({ error: 'reject status updating failed', response });
        }
    }));
    const getTotalEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getTotalEvents)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'total events fetching done', ok: true, data });
        }
        else {
            res.json({ error: 'total events fetching failed' });
        }
    }));
    const getTotalUsersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getTotalUsers)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'total users fetching done', ok: true, data });
        }
        else {
            res.json({ error: 'total users fetching failed' });
        }
    }));
    const getTotalOrganizationsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getTotalOrganization)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'total organization fetching done', ok: true, data });
        }
        else {
            res.json({ error: 'total organization fetching failed' });
        }
    }));
    const getTotalTicketsSoldController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getTotalTicketsSold)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'total ticket sold fetching done', ok: true, data });
        }
        else {
            res.json({ error: 'total ticket sold fetching failed' });
        }
    }));
    const getAdminMonthlySalesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAdminMonthlySales)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'monthly sales data fetched', ok: true, data });
        }
        else {
            res.json({ error: 'monthly sales data fetching failed', ok: false, });
        }
    }));
    const getAdminMonthlyTicketSalesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAdminMonthlyTicketSales)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'monthly ticket sales data fetched', ok: true, data });
        }
        else {
            res.json({ error: 'monthly ticket sales data failed' });
        }
    }));
    const getAdminTicketTypeSoldController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAdminTicketTypeSold)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'monthly ticket type sold data fetched', ok: true, data });
        }
        else {
            res.json({ error: 'monthly ticket type sold data fetching failed' });
        }
    }));
    const getMostSoldEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getMostSoldEvents)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'most sold events data fetched', ok: true, data });
        }
        else {
            res.json({ error: 'most sold events fetching failed' });
        }
    }));
    const getAllBookingsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAllBookings)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'getting booking data done', ok: true, data });
        }
        else {
            res.json({ error: 'fetching booking data failed' });
        }
    }));
    const addCitiesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        if (data) {
            const response = yield (0, adminUsecases_2.addCities)(data, dbRepositoryAdmin);
            if (response) {
                res.json({ message: 'adding city done', ok: true, response });
            }
            else {
                res.json({ error: 'adding city failed', ok: false });
            }
        }
    }));
    const getAllCitiesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, adminUsecases_2.getAllCities)(dbRepositoryAdmin);
        if (data) {
            res.json({ message: 'getting cities done', ok: true, data });
        }
        else {
            res.json({ error: 'getting cities failed', ok: false });
        }
    }));
    const deleteCityController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const response = yield (0, adminUsecases_2.deleteCity)(id, dbRepositoryAdmin);
        if (response) {
            res.json({ message: 'deleting city done', ok: true, response });
        }
        else {
            res.json({ error: 'deleting city failed' });
        }
    }));
    const addPromotedEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const eventId = req.params.id;
        const response = yield (0, adminUsecases_1.addPromotedEvent)(eventId, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.json({ error: 'adding promoted event failed' });
        }
    }));
    const deletePromotedEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const eventId = req.params.id;
        const response = yield (0, adminUsecases_1.deletePromotedEvent)(eventId, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.json({ error: 'deleting promoted event' });
        }
    }));
    const unBlockUserController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const response = yield (0, adminUsecases_1.unBlockUser)(userId, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.json({ error: 'unblocking user failed' });
        }
    }));
    const blockUserController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const response = yield (0, adminUsecases_1.blockUser)(userId, dbRepositoryAdmin);
        if (response) {
            res.json({ response });
        }
        else {
            res.json({ error: 'blocking user failed' });
        }
    }));
    return {
        addEventCategoryController,
        getEventCategoriesController,
        getSingleEventCategoryController,
        editEventCategoryController,
        addOrgCategoryController,
        deleteOrgCategoryController,
        deleteEventCategoryController,
        editOrgCategoryController,
        getSingleOrgCategoryController,
        getAllOrgCategoryController,
        getAllEventsController,
        approveEventController,
        rejectEventController,
        getTotalEventsController,
        getTotalUsersController,
        getTotalOrganizationsController,
        getTotalTicketsSoldController,
        getAdminMonthlySalesController,
        getAdminMonthlyTicketSalesController,
        getAdminTicketTypeSoldController,
        getMostSoldEventsController,
        getAllBookingsController,
        addCitiesController,
        getAllCitiesController,
        deleteCityController,
        addPromotedEventController,
        deletePromotedEventController,
        unBlockUserController,
        blockUserController,
    };
};
exports.default = adminController;
