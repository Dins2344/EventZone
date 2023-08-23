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
exports.adminRepositoryMongoDB = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const eventCategory_1 = __importDefault(require("../models/eventCategory"));
const orgCategory_1 = __importDefault(require("../models/orgCategory"));
const mongodb_1 = require("mongodb");
const eventModel_1 = __importDefault(require("../models/eventModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const organizationModel_1 = __importDefault(require("../models/organizationModel"));
const bookings_1 = __importDefault(require("../models/bookings"));
const Cities_1 = __importDefault(require("../models/Cities"));
const adminRepositoryMongoDB = () => {
    const getAdminByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield adminModel_1.default.findOne({ email });
        return admin;
    });
    const addEventCategory = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield eventCategory_1.default.create(eventData);
    });
    const deleteEventCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield eventCategory_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    });
    const getEventCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield eventCategory_1.default.find({});
    });
    const getSingleEventCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield eventCategory_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
    });
    const editEventCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, categoryName, subCategoryName, description } = data;
        return yield eventCategory_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { categoryName, subCategoryName, description }, { new: true });
    });
    const addOrgCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield orgCategory_1.default.create(data);
    });
    const deleteOrgCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield orgCategory_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    });
    const editOrgCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, categoryName, subCategoryName, description } = data;
        return yield orgCategory_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { categoryName, subCategoryName, description }, { new: true });
    });
    const getSingleOrgCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield orgCategory_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
    });
    const getAllOrgCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield orgCategory_1.default.find({});
    });
    const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.find({});
        return data;
    });
    const approveEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(id) }, { status: "approved" });
        return res;
    });
    const rejectEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(id) }, { status: "rejected" });
        return res;
    });
    const getTotalUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.find({});
        return data;
    });
    const getTotalOrganization = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield organizationModel_1.default.find({});
        return data;
    });
    const getTotalTicketsSold = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.aggregate([
            {
                $group: {
                    _id: "$eventName",
                    totalTickets: { $sum: "$ticketSold" },
                },
            },
            {
                $project: {
                    _id: 0,
                    eventName: "$_id",
                    totalTickets: 1,
                },
            },
        ]);
        return data;
    });
    const getTotalEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.find({});
        return data;
    });
    const getAdminMonthlySales = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $addFields: {
                    // Convert the bookingTime string into a date object
                    bookingDate: { $dateFromString: { dateString: "$bookingTime" } },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$bookingDate" } },
                    totalSales: { $sum: "$totalAmount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalSales: 1,
                },
            },
            {
                $sort: {
                    month: 1,
                },
            },
        ]);
        return data;
    });
    const getAdminMonthlyTicketSales = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $addFields: {
                    // Convert the bookingTime string into a date object
                    bookingDate: { $dateFromString: { dateString: "$bookingTime" } },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$bookingDate" } },
                    totalTickets: { $sum: "$ticketCount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalTickets: 1,
                },
            },
            {
                $sort: {
                    month: 1,
                },
            },
        ]);
        return data;
    });
    const getAdminTicketTypeSold = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $group: {
                    _id: "$paymentType",
                    totalTickets: { $sum: "$ticketCount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    paymentType: "$_id",
                    totalTickets: 1,
                },
            },
            {
                $sort: {
                    month: 1,
                },
            },
        ]);
        return data;
    });
    const getMostSoldEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.aggregate([
            {
                $group: {
                    _id: "$eventName",
                    totalTickets: { $sum: "$ticketSold" },
                },
            },
            {
                $project: {
                    _id: 0,
                    eventName: "$_id",
                    totalTickets: 1,
                },
            },
            {
                $sort: {
                    totalTickets: -1,
                },
            },
        ]);
        return data;
    });
    const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $addFields: {
                    userId: { $toObjectId: "$userId" },
                },
            },
            // Lookup to join with the Event collection
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            // Unwind the event array
            {
                $unwind: "$user",
            },
            {
                $addFields: {
                    eventId: { $toObjectId: "$eventId" },
                },
            },
            // Lookup to join with the Event collection
            {
                $lookup: {
                    from: "events",
                    localField: "eventId",
                    foreignField: "_id",
                    as: "event",
                },
            },
            {
                $unwind: "$event",
            },
            // Project the desired fields
            {
                $project: {
                    _id: 1,
                    eventId: 1,
                    userId: 1,
                    bookingTime: 1,
                    contactInfo: 1,
                    ticketCount: 1,
                    status: 1,
                    QRCodeLink: 1,
                    paymentType: 1,
                    totalAmount: 1,
                    user: {
                        firstName: "$user.firstName",
                        lastName: "$user.lastName",
                        email: "$user.email",
                        profileImage: "$user.profileImage",
                        // Include other event fields as needed
                    },
                    event: {
                        eventName: "$event.eventName",
                        organizer: "$event.organizer",
                        imageURL: "$event.imageURL",
                        startDate: "$event.startDate",
                        startTime: "$event.startTime",
                        ticketValue: "$event.ticketValue",
                        endDate: "$event.endDate",
                        endTime: "$event.endTime",
                        category: "$event.category",
                        addressLine1: "$event.addressLine1",
                        addressLine2: "$event.addressLine2",
                        addressLine3: "$event.addressLine3",
                        orgName: "$event.orgName",
                        // Include other event fields as needed
                    },
                },
            },
            {
                $sort: { _id: -1 },
            },
        ]).exec();
        return data;
    });
    const addCities = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const cityModel = new Cities_1.default(data);
        const res = yield cityModel.save();
        return res;
    });
    const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Cities_1.default.find({});
        return data;
    });
    const deleteCity = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield Cities_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return res;
    });
    const addPromotedEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(eventId) }, { isPromoted: true });
        if (res) {
            return { message: "adding event to promoted events done", ok: true };
        }
        else {
            return { error: "adding event to promoted events failed", ok: false };
        }
    });
    const deletePromotedEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(eventId) }, { isPromoted: false });
        if (res) {
            return { message: "deleting from promoted event done", ok: true };
        }
        else {
            return { error: "deleting from promoted event failed", ok: false };
        }
    });
    const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { status: 'blocked' });
        if (res) {
            return { message: 'blocking user done', ok: true, res };
        }
        else {
            return { message: 'blocking user not done', ok: false };
        }
    });
    const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { status: 'active' });
        if (res) {
            return { message: 'unblocking user done', ok: true, res };
        }
        else {
            return { message: 'unblocking user not done', ok: true };
        }
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
        getTotalUsers,
        getTotalOrganization,
        getTotalTicketsSold,
        getTotalEvents,
        getAdminTicketTypeSold,
        getAdminMonthlyTicketSales,
        getAdminMonthlySales,
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
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
