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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const organization_1 = require("../../../application/usecases/organization/organization");
const userAuth_1 = require("../../../application/usecases/user/userAuth");
const organization_2 = require("../../../application/usecases/organization/organization");
const organizationController = (organizationDbRepository, organizationDbRepositoryImpl, userDbRepository, userDbRepositoryImpl, emailServiceInterface, emailServiceImpl) => {
    const dbRepositoryOrganization = organizationDbRepository(organizationDbRepositoryImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const emailService = emailServiceInterface(emailServiceImpl());
    const registerOrganization = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const organization = req.body;
        if (req.user) {
            const { Id, email } = req.user;
            organization.userId = Id;
            organization.ownerId = Id;
        }
        const response = yield (0, organization_1.organizationRegister)(organization, dbRepositoryOrganization);
        let added;
        if (response) {
            added = yield (0, userAuth_1.addOrganization)(response._id.toString(), (_a = response.userId) !== null && _a !== void 0 ? _a : "", dbRepositoryUser);
        }
        res.json({
            status: "success",
            message: "organization created",
            response,
            added,
        });
    }));
    const getAllEventCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_2.getAllEventCategories)(dbRepositoryOrganization);
        if (data) {
            res.json({ message: "data received", data });
        }
        else {
            res.status(404).json({ error: "data fetching failed" });
        }
    }));
    const getUsersOrganizationsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            const { Id } = req.user;
            const data = yield (0, organization_2.getUsersOrganizations)(Id, dbRepositoryOrganization);
            if (data) {
                res.json({ message: "data fetched", data });
            }
            else {
                res.status(404).json({ error: "fetching failed" });
            }
        }
    }));
    const getOrgAllCitiesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_1.getOrgAllCities)(dbRepositoryOrganization);
        if (data) {
            res.json({ message: "fetching cities done", ok: true, data });
        }
        else {
            res.json({ error: "fetching cities failed", ok: false });
        }
    }));
    const getOrganizationDetailController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.params.id);
        const orgId = req.params.id;
        const data = yield (0, organization_1.getOrganizationDetails)(orgId, dbRepositoryOrganization);
        if (data) {
            res.json({ message: "organization data fetched", ok: true, data });
        }
        else {
            res.json({ error: "fetching organization data failed" });
        }
    }));
    const addBasicEventInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        data.status = "draft";
        const response = yield (0, organization_2.addBasicEventInfo)(data, dbRepositoryOrganization);
        if (response) {
            res.json({ message: "adding basicInfo done", response });
        }
        else {
            res.status(404).json({ error: "adding basicInfo failed" });
        }
    }));
    const addMediaEventInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const medias = req.files;
        const response = yield (0, organization_2.addMediaEventInfo)(data, medias, dbRepositoryOrganization);
        if (response) {
            res.json({ message: "adding media info done", response });
        }
        else {
            res.json({ error: "adding media info failed" });
        }
    }));
    const addPublishEventInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        console.log(data);
        const response = yield (0, organization_2.addPublishEventInfo)(data, dbRepositoryOrganization);
        if (response) {
            res.json({ message: "adding ticket details done", response });
        }
        else {
            res.json({ error: "adding ticket info failed" });
        }
    }));
    const getEventDetailsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, organization_2.getEventDetails)(id, dbRepositoryOrganization);
        if (data) {
            res.json({ message: "getting event data done", data });
        }
        else {
            res.json({ error: "event data fetching failed" });
        }
    }));
    const publishEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id);
        const response = yield (0, organization_2.publishEvent)(id, dbRepositoryOrganization);
        if (response) {
            res.json({ message: "publishing request sent", response });
        }
        else {
            res.json({ error: "publishing event failed" });
        }
    }));
    const getUsersAllEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (user) {
            const { Id } = user;
            const data = yield (0, organization_2.getUsersAllEvents)(Id, dbRepositoryOrganization);
            if (data) {
                res.json({ message: "users events getting done", data });
            }
            else {
                res.json({ error: "users events fetching failed" });
            }
        }
    }));
    const getOrganizersAllEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const orgId = req.params.id;
        console.log(orgId);
        const data = yield (0, organization_2.getOrganizersAllEvent)(orgId, dbRepositoryOrganization);
        if (data) {
            res.json({ message: "events fetching done", data });
        }
        else {
            res.json({ error: "event fetching failed" });
        }
    }));
    const getOrganizersAllBookingsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (user) {
            console.log(user);
            const { Id } = user;
            const data = yield (0, organization_1.getOrganizersAllBookings)(Id, dbRepositoryOrganization);
            if (data) {
                res.json({ message: "getting organizers all booking done", data });
            }
            else {
                res.json({ error: "getting organizers all booking failed" });
            }
        }
    }));
    const getOrgOwnerDetailsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ownerId = req.params.id;
        const data = yield (0, organization_1.getOrgOwnerDetails)(ownerId, dbRepositoryOrganization);
        if (data) {
            res.json({ message: "owner details fetched", ok: true, data });
        }
        else {
            res.json({ error: "owner details fetching failed" });
        }
    }));
    const getAllOrganizationCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_1.getAllOrganizationCategories)(dbRepositoryOrganization);
        if (data) {
            res.json({ message: "orgCategory fetching done", ok: true, data });
        }
        else {
            res.json({ error: "orgCategory fetching failed" });
        }
    }));
    const updateOrganizationInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const logo = req.files;
        if (logo === null || logo === void 0 ? void 0 : logo.length) {
            data.logo = logo[0].path;
        }
        const response = yield (0, organization_1.updateOrganizationInfo)(data, dbRepositoryOrganization);
        if (response) {
            res.json({ message: "updating orgInfo done", ok: true, response });
        }
        else {
            res.json({ error: "updating failed" });
        }
    }));
    const getMonthlySalesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_1.getMonthlySales)(dbRepositoryOrganization);
        if (data) {
            res.json({ message: "fetching data done ", ok: true, data });
        }
        else {
            res.json({ error: "monthly data fetching failed" });
        }
    }));
    const getMonthlyTicketSalesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_1.getMonthlyTicketSales)(dbRepositoryOrganization);
        if (data) {
            res.json({
                message: "ticket sales data fetching done",
                ok: true,
                data,
            });
        }
        else {
            res.json({ error: "ticket sales data fetching error" });
        }
    }));
    const getTicketTypeSoldController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, organization_1.getTicketTypeSold)(dbRepositoryOrganization);
        if (data) {
            res.json({ message: "fetching ticket type sold done", ok: true, data });
        }
        else {
            res.json({ error: "fetching ticket type sold failed ", ok: false });
        }
    }));
    const getTicketsSoldByEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (user) {
            const data = yield (0, organization_1.getTicketsSoldByEvents)(user.Id, dbRepositoryOrganization);
            if (data) {
                res.json({ message: "fetching data done", ok: true, data });
            }
            else {
                res.json({ error: "fetching data failed" });
            }
        }
        else {
            res.json({ error: "invalid token" });
        }
    }));
    const updateEventInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const response = yield (0, organization_1.updateEventInfo)(data, dbRepositoryOrganization);
        if (!response) {
            res.json({ error: 'updating event info failed', ok: false });
        }
        if (response.modifiedCount >= 1) {
            const message = "We kindly request your cooperation as there have been some updates made to the event you have booked in the event zone. Your attention and understanding regarding these changes are highly appreciated. Thank you for your cooperation.";
            const users = yield (0, organization_1.getEventBookedUsers)(data.eventId, dbRepositoryOrganization);
            console.log(users);
            const response = users.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(item.email);
                return yield emailService.sendEmail(item === null || item === void 0 ? void 0 : item.email, message);
            }));
            if (response) {
                res.json({ message: 'mail send to all the customers', ok: true });
            }
        }
        else {
            res.json({ message: 'there is no changes happened' });
        }
    }));
    return {
        registerOrganization,
        getAllEventCategoriesController,
        getUsersOrganizations: organization_2.getUsersOrganizations,
        getOrganizationDetailController,
        getUsersOrganizationsController,
        addBasicEventInfoController,
        addMediaEventInfoController,
        addPublishEventInfoController,
        getEventDetailsController,
        publishEventController,
        getUsersAllEventsController,
        getOrganizersAllEventController,
        getOrganizersAllBookingsController,
        getOrgOwnerDetailsController,
        getAllOrganizationCategoriesController,
        updateOrganizationInfoController,
        getMonthlySalesController,
        getMonthlyTicketSalesController,
        getTicketTypeSoldController,
        getTicketsSoldByEventsController,
        getOrgAllCitiesController,
        updateEventInfoController,
    };
};
exports.default = organizationController;
