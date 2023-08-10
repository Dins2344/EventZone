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
exports.unBlockUser = exports.blockUser = exports.deletePromotedEvent = exports.addPromotedEvent = exports.deleteCity = exports.getAllCities = exports.addCities = exports.getAllBookings = exports.getMostSoldEvents = exports.getAdminTicketTypeSold = exports.getAdminMonthlyTicketSales = exports.getAdminMonthlySales = exports.getTotalTicketsSold = exports.getTotalUsers = exports.getTotalOrganization = exports.getTotalEvents = exports.rejectEvent = exports.approveEvent = exports.getAllEvents = exports.getAllOrgCategory = exports.getSingleOrgCategory = exports.editOrgCategory = exports.deleteOrgCategory = exports.addOrgCategory = exports.editEventCategory = exports.getSingleEventCategory = exports.getEventCategories = exports.deleteEventCategory = exports.addEventCategory = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const addEventCategory = (eventData, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.addEventCategory(eventData);
    if (!res) {
        throw new appError_1.default("category adding failed", httpStatus_1.HttpStatus.BAD_GATEWAY);
    }
    else {
        return res;
    }
});
exports.addEventCategory = addEventCategory;
const deleteEventCategory = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.deleteEventCategory(id);
    if (!res) {
        throw new appError_1.default("organization category deleting failed", httpStatus_1.HttpStatus.BAD_GATEWAY);
    }
    else {
        return res;
    }
});
exports.deleteEventCategory = deleteEventCategory;
const getEventCategories = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getEventCategories();
    if (!data) {
        throw new appError_1.default("categories fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    else {
        return data;
    }
});
exports.getEventCategories = getEventCategories;
const getSingleEventCategory = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getSingleEventCategory(id);
    if (data) {
        return data;
    }
    else {
        throw new appError_1.default("category fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.getSingleEventCategory = getSingleEventCategory;
const editEventCategory = (data, adminRepositoy) => __awaiter(void 0, void 0, void 0, function* () {
    const response = adminRepositoy.editEventCategory(data);
    if (!response) {
        throw new appError_1.default("event category editing failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return response;
});
exports.editEventCategory = editEventCategory;
const addOrgCategory = (data, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.addOrgCategory(data);
    if (!res) {
        throw new appError_1.default("organization category added", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addOrgCategory = addOrgCategory;
const deleteOrgCategory = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.deleteOrgCategory(id);
    if (!res) {
        throw new appError_1.default("organization category deletion failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.deleteOrgCategory = deleteOrgCategory;
const editOrgCategory = (data, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield adminRepository.editOrgCategory(data);
    if (!response) {
        throw new appError_1.default("organization category editing failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return response;
});
exports.editOrgCategory = editOrgCategory;
const getSingleOrgCategory = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getSingleOrgCategory(id);
    if (data) {
        return data;
    }
    else {
        throw new appError_1.default("category fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.getSingleOrgCategory = getSingleOrgCategory;
const getAllOrgCategory = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAllOrgCategory();
    if (data) {
        return data;
    }
    else {
        throw new appError_1.default("all categories fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.getAllOrgCategory = getAllOrgCategory;
const getAllEvents = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAllEvents();
    if (data) {
        return data;
    }
    else {
        throw new appError_1.default('getting all events failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.getAllEvents = getAllEvents;
const approveEvent = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.approveEvent(id);
    if (!res) {
        throw new appError_1.default('approve status updating failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.approveEvent = approveEvent;
const rejectEvent = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.rejectEvent(id);
    if (!res) {
        throw new appError_1.default('reject status updating failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.rejectEvent = rejectEvent;
const getTotalEvents = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getTotalEvents();
    if (!data) {
        throw new appError_1.default('total events fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTotalEvents = getTotalEvents;
const getTotalOrganization = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getTotalOrganization();
    if (!data) {
        throw new appError_1.default('total organization fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTotalOrganization = getTotalOrganization;
const getTotalUsers = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getTotalUsers();
    if (!data) {
        throw new appError_1.default('total users fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTotalUsers = getTotalUsers;
const getTotalTicketsSold = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getTotalTicketsSold();
    if (!data) {
        throw new appError_1.default('total tickets sold fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getTotalTicketsSold = getTotalTicketsSold;
const getAdminMonthlySales = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAdminMonthlySales();
    if (!data) {
        throw new appError_1.default('monthly sales data failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAdminMonthlySales = getAdminMonthlySales;
const getAdminMonthlyTicketSales = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAdminMonthlyTicketSales();
    if (!data) {
        throw new appError_1.default('monthly ticket sold data fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAdminMonthlyTicketSales = getAdminMonthlyTicketSales;
const getAdminTicketTypeSold = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAdminTicketTypeSold();
    if (!data) {
        throw new appError_1.default('monthly ticket type sold data fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAdminTicketTypeSold = getAdminTicketTypeSold;
const getMostSoldEvents = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getMostSoldEvents();
    if (!data) {
        throw new appError_1.default('most sold events fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getMostSoldEvents = getMostSoldEvents;
const getAllBookings = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAllBookings();
    if (!data) {
        throw new appError_1.default('all booking details fetching failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllBookings = getAllBookings;
const addCities = (data, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.addCities(data);
    if (!res) {
        throw new appError_1.default('adding city data failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addCities = addCities;
const getAllCities = (adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.getAllCities();
    if (!data) {
        throw new appError_1.default('getting cities failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllCities = getAllCities;
const deleteCity = (id, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminRepository.deleteCity(id);
    if (!data) {
        throw new appError_1.default('deleting city failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.deleteCity = deleteCity;
const addPromotedEvent = (eventId, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.addPromotedEvent(eventId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default('adding promoted event failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.addPromotedEvent = addPromotedEvent;
const deletePromotedEvent = (eventId, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.deletePromotedEvent(eventId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default('deleting promoted event failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.deletePromotedEvent = deletePromotedEvent;
const blockUser = (userId, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.blockUser(userId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default('blocking user failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.blockUser = blockUser;
const unBlockUser = (userId, adminRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield adminRepository.unBlockUser(userId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default('unBlocking user failed', httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.unBlockUser = unBlockUser;
