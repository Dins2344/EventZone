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
exports.adminDbRepository = void 0;
const adminDbRepository = (repository) => {
    const getAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAdminByEmail(email);
    });
    const addEventCategory = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addEventCategory(eventData);
    });
    const deleteEventCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.deleteEventCategory(id);
    });
    const getEventCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getEventCategories();
    });
    const getSingleEventCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getSingleEventCategory(id);
    });
    const editEventCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.editEventCategory(data);
    });
    const addOrgCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addOrgCategory(data);
    });
    const deleteOrgCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.deleteOrgCategory(id);
    });
    const editOrgCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.editOrgCategory(data);
    });
    const getSingleOrgCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getSingleOrgCategory(id);
    });
    const getAllOrgCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllOrgCategory();
    });
    const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllEvents();
    });
    const approveEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.approveEvent(id);
    });
    const rejectEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.rejectEvent(id);
    });
    const getTotalEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getTotalEvents();
    });
    const getTotalOrganization = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getTotalOrganization();
    });
    const getTotalUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getTotalUsers();
    });
    const getTotalTicketsSold = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getTotalTicketsSold();
    });
    const getAdminMonthlySales = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAdminMonthlySales();
    });
    const getAdminMonthlyTicketSales = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAdminMonthlyTicketSales();
    });
    const getAdminTicketTypeSold = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAdminTicketTypeSold();
    });
    const getMostSoldEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getMostSoldEvents();
    });
    const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllBookings();
    });
    const addCities = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addCities(data);
    });
    const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllCities();
    });
    const deleteCity = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.deleteCity(id);
    });
    const addPromotedEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addPromotedEvent(eventId);
    });
    const deletePromotedEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.deletePromotedEvent(eventId);
    });
    const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.blockUser(userId);
    });
    const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.unBlockUser(userId);
    });
    return {
        getAdminByEmail,
        addEventCategory,
        deleteEventCategory,
        getEventCategories,
        getSingleEventCategory,
        editEventCategory,
        addOrgCategory,
        deleteOrgCategory,
        editOrgCategory,
        getSingleOrgCategory,
        getAllOrgCategory,
        getAllEvents,
        approveEvent,
        rejectEvent,
        getTotalEvents,
        getTotalOrganization,
        getTotalUsers,
        getTotalTicketsSold,
        getAdminMonthlySales,
        getAdminMonthlyTicketSales,
        getAdminTicketTypeSold,
        getMostSoldEvents,
        getAllBookings,
        addCities,
        getAllCities,
        deleteCity,
        addPromotedEvent,
        deletePromotedEvent,
        blockUser,
        unBlockUser,
    };
};
exports.adminDbRepository = adminDbRepository;
