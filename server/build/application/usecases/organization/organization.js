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
exports.getEventBookedUsers = exports.updateEventInfo = exports.getTicketsSoldByEvents = exports.getTicketTypeSold = exports.getMonthlyTicketSales = exports.getMonthlySales = exports.updateOrganizationInfo = exports.getAllOrganizationCategories = exports.getOrgOwnerDetails = exports.getOrganizersAllBookings = exports.getOrganizersAllEvent = exports.getUsersAllEvents = exports.publishEvent = exports.getEventDetails = exports.addPublishEventInfo = exports.addMediaEventInfo = exports.addBasicEventInfo = exports.getOrganizationDetails = exports.getOrgAllCities = exports.getUsersOrganizations = exports.getAllEventCategories = exports.organizationRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const organizationRegister = (organization, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!organization) {
        throw new appError_1.default("data not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const response = yield organizationRepository.addOrganization(organization);
    return response;
});
exports.organizationRegister = organizationRegister;
const getAllEventCategories = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getAllEventCategories();
    if (!data) {
        throw new appError_1.default("event category data not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllEventCategories = getAllEventCategories;
const getUsersOrganizations = (id, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getUsersOrganizations(id);
    if (!data) {
        throw new appError_1.default("organization data fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getUsersOrganizations = getUsersOrganizations;
const getOrgAllCities = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getAllCities();
    if (!data) {
        throw new appError_1.default('fetching cities failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOrgAllCities = getOrgAllCities;
const getOrganizationDetails = (orgId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getOrganizationDetails(orgId);
    if (!data) {
        throw new appError_1.default("fetching organization detail failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOrganizationDetails = getOrganizationDetails;
const addBasicEventInfo = (data, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield organizationRepository.addBasicEventInfo(data);
    if (!res) {
        throw new appError_1.default("adding basic info failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addBasicEventInfo = addBasicEventInfo;
const addMediaEventInfo = (data, media, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield organizationRepository.addMediaEventInfo(data, media);
    if (!res) {
        throw new appError_1.default("adding media info failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addMediaEventInfo = addMediaEventInfo;
const addPublishEventInfo = (data, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield organizationRepository.addPublishEventInfo(data);
    if (!res) {
        throw new appError_1.default("adding ticket details failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addPublishEventInfo = addPublishEventInfo;
const getEventDetails = (id, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getEventDetails(id);
    if (!data) {
        throw new appError_1.default("getting event data failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getEventDetails = getEventDetails;
const publishEvent = (id, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const time = new Date().toDateString();
    console.log(time);
    const res = yield organizationRepository.publishEvent(id, time);
    if (!res) {
        throw new appError_1.default("publishing event failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.publishEvent = publishEvent;
const getUsersAllEvents = (userId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getUsersAllEvents(userId);
    if (!data) {
        throw new appError_1.default("getting users all events failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getUsersAllEvents = getUsersAllEvents;
const getOrganizersAllEvent = (id, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const data = yield organizationRepository.getOrganizersAllEvent(id);
    if (!data) {
        throw new appError_1.default("getting organizers all events has failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOrganizersAllEvent = getOrganizersAllEvent;
const getOrganizersAllBookings = (userId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getOrganizersAllBookings(userId);
    if (!data) {
        throw new appError_1.default("getting organizers all bookings failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOrganizersAllBookings = getOrganizersAllBookings;
const getOrgOwnerDetails = (ownerId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getOrgOwnerDetails(ownerId);
    if (!data) {
        throw new appError_1.default('fetching orgOwner details failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOrgOwnerDetails = getOrgOwnerDetails;
const getAllOrganizationCategories = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getAllOrganizationCategories();
    if (!data) {
        throw new appError_1.default('organizationCategory fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllOrganizationCategories = getAllOrganizationCategories;
const updateOrganizationInfo = (data, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield organizationRepository.updateOrganizationInfo(data);
    if (!res) {
        throw new appError_1.default('updating organization info failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.updateOrganizationInfo = updateOrganizationInfo;
const getMonthlySales = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getMonthlySales();
    if (!data) {
        throw new appError_1.default('fetching monthly sales data done', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getMonthlySales = getMonthlySales;
const getMonthlyTicketSales = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getMonthlyTicketSales();
    if (!data) {
        throw new appError_1.default('fetching monthly ticket sales data', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getMonthlyTicketSales = getMonthlyTicketSales;
const getTicketTypeSold = (organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getTicketTypeSold();
    if (!data) {
        throw new appError_1.default('fetching ticket type sold data failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTicketTypeSold = getTicketTypeSold;
const getTicketsSoldByEvents = (userId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getTicketsSoldByEvents(userId);
    if (!data) {
        throw new appError_1.default("fetching ticket sold by events data done", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTicketsSoldByEvents = getTicketsSoldByEvents;
const updateEventInfo = (data, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield organizationRepository.updateEventInfo(data);
    if (!res) {
        throw new appError_1.default('updating event info failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.updateEventInfo = updateEventInfo;
const getEventBookedUsers = (eventId, organizationRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield organizationRepository.getEventBookedUsers(eventId);
    if (!data) {
        throw new appError_1.default('getting event booked users failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    let users = [];
    data.forEach((item) => {
        users.push(item.userId);
    });
    return users;
});
exports.getEventBookedUsers = getEventBookedUsers;
