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
exports.organizationRepositoryMongoDB = void 0;
const organizationModel_1 = __importDefault(require("../models/organizationModel"));
const eventCategory_1 = __importDefault(require("../models/eventCategory"));
const eventModel_1 = __importDefault(require("../models/eventModel"));
const mongodb_1 = require("mongodb");
const bookings_1 = __importDefault(require("../models/bookings"));
const userModel_1 = __importDefault(require("../models/userModel"));
const orgCategory_1 = __importDefault(require("../models/orgCategory"));
const Cities_1 = __importDefault(require("../models/Cities"));
const organizationRepositoryMongoDB = () => {
    const addOrganization = (orgData) => __awaiter(void 0, void 0, void 0, function* () {
        const newOrganization = new organizationModel_1.default(orgData);
        return yield newOrganization.save();
    });
    const getAllEventCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventCategory_1.default.find({});
        return data;
    });
    const getUsersOrganizations = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield organizationModel_1.default.find({ userId: id });
        return data;
    });
    const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Cities_1.default.find({});
        return data;
    });
    const getOrganizationDetails = (orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield organizationModel_1.default.findOne({ _id: new mongodb_1.ObjectId(orgId) });
        return data;
    });
    const addBasicEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        data.status = "draft";
        const organization = yield organizationModel_1.default.findOne({
            _id: new mongodb_1.ObjectId(data.organizer),
        });
        const ownerId = organization === null || organization === void 0 ? void 0 : organization.ownerId;
        const orgName = organization === null || organization === void 0 ? void 0 : organization.orgName;
        if (ownerId && orgName) {
            data.orgOwnerId = ownerId;
            data.orgName = orgName;
        }
        const res = yield eventModel_1.default.create(data);
        return res;
    });
    const addMediaEventInfo = (data, media) => __awaiter(void 0, void 0, void 0, function* () {
        const imageURL = media.map((file) => file.path);
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(data.eventId) }, {
            videoURL: data.videoURL,
            description: data.description,
            imageURL: imageURL,
        });
        return res;
    });
    const addPublishEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(data.eventId) }, {
            eventCapacity: data.eventCapacity,
            ticketPrice: data.ticketPrice,
            ticketValue: data.ticketValue,
            ticketSold: 0,
        });
        return res;
    });
    const getEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
        return data;
    });
    const publishEvent = (id, registeredTime) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(id) }, { status: "requested", registeredTime: registeredTime });
        return res;
    });
    const getUsersAllEvents = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.find({ orgOwnerId: id });
        return data;
    });
    const getOrganizersAllEvent = (orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.find({ organizer: orgId });
        return data;
    });
    const getOrganizersAllBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            // Match bookings for the specified user
            {
                $match: { orgOwnerId: userId },
            },
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
    const getOrgOwnerDetails = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.findOne({ _id: new mongodb_1.ObjectId(ownerId) });
        return data;
    });
    const getAllOrganizationCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield orgCategory_1.default.find({});
        return data;
    });
    const updateOrganizationInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield organizationModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(data._id) }, {
                orgName: data.orgName,
                orgType: data.orgType,
                country: data.country,
                logo: data.logo,
            });
            return res;
        }
        catch (error) {
            console.log(error);
        }
    });
    const getMonthlySales = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $match: { orgOwnerId: userId },
            },
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
    const getMonthlyTicketSales = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $match: { orgOwnerId: userId },
            },
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
    const getTicketTypeSold = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            {
                $match: { orgOwnerId: userId },
            },
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
        ]);
        return data;
    });
    const getTicketsSoldByEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.aggregate([
            {
                $match: { orgOwnerId: userId },
            },
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
        console.log(data);
        return data;
    });
    const updateEventInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield eventModel_1.default.updateOne({ _id: data.eventId }, {
            eventName: data.eventName,
            category: data.category,
            description: data.description,
            agenda: data.agenda,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            state: data.state,
            city: data.city,
            startDate: data.startDate,
            startTime: data.startTime,
            endDate: data.endDate,
            endTime: data.endTime,
        });
        return res;
    });
    const getEventBookedUsers = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = bookings_1.default.find({ eventId: eventId }).populate({
            path: "userId",
            select: "email",
        });
        return data;
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
exports.organizationRepositoryMongoDB = organizationRepositoryMongoDB;
