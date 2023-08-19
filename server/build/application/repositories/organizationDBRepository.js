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
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationDbRepository = void 0;
const organizationDbRepository = (repository) => {
    const addOrganization = (orgData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.addOrganization(orgData);
        return data;
    });
    const getAllEventCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAllEventCategories();
        return data;
    });
    const getUsersOrganizations = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getUsersOrganizations(id);
        return data;
    });
    const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAllCities();
        return data;
    });
    const getOrganizationDetails = (orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getOrganizationDetails(orgId);
        return data;
    });
    const addBasicEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addBasicEventInfo(data);
        return res;
    });
    const addMediaEventInfo = (data, media) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addMediaEventInfo(data, media);
        return res;
    });
    const addPublishEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addPublishEventInfo(data);
        return res;
    });
    const getEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getEventDetails(id);
        return data;
    });
    const publishEvent = (id, registeredTime) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.publishEvent(id, registeredTime);
        return res;
    });
    const getUsersAllEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getUsersAllEvents(userId);
        return data;
    });
    const getOrganizersAllEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getOrganizersAllEvent(id);
        return data;
    });
    const getOrganizersAllBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getOrganizersAllBookings(userId);
        return data;
    });
    const getOrgOwnerDetails = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getOrgOwnerDetails(ownerId);
        return data;
    });
    const getAllOrganizationCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAllOrganizationCategories();
        return data;
    });
    const updateOrganizationInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.updateOrganizationInfo(data);
        return res;
    });
    const getMonthlySales = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getMonthlySales(userId);
        return data;
    });
    const getMonthlyTicketSales = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getMonthlyTicketSales(userId);
        return data;
    });
    const getTicketTypeSold = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getTicketTypeSold(userId);
        return data;
    });
    const getTicketsSoldByEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getTicketsSoldByEvents(userId);
        return data;
    });
    const updateEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.updateEventInfo(data);
    });
    const getEventBookedUsers = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getEventBookedUsers(eventId);
    });
    return {
        addOrganization,
        getAllEventCategories,
        getUsersOrganizations,
        getOrganizationDetails,
        addBasicEventInfo,
        addMediaEventInfo,
        addPublishEventInfo,
        getEventDetails,
        publishEvent,
        getUsersAllEvents,
        getOrganizersAllEvent,
        getOrganizersAllBookings,
        getOrgOwnerDetails,
        getAllOrganizationCategories,
        updateOrganizationInfo,
        getMonthlySales,
        getMonthlyTicketSales,
        getTicketTypeSold,
        getTicketsSoldByEvents,
        getAllCities,
        updateEventInfo,
        getEventBookedUsers,
    };
};
exports.organizationDbRepository = organizationDbRepository;
