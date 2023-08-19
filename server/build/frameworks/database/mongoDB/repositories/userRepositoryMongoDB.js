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
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const mongodb_1 = require("mongodb");
const eventModel_1 = __importDefault(require("../models/eventModel"));
const organizationModel_1 = __importDefault(require("../models/organizationModel"));
const bookings_1 = __importDefault(require("../models/bookings"));
const address_1 = __importDefault(require("../models/address"));
const chats_1 = __importDefault(require("../models/chats"));
const message_1 = __importDefault(require("../models/message"));
const mongoose_1 = require("mongoose");
// import {ObjectId as objectId} from 'mongoose/Schema/Types/ObjectId'
// import { ObjectId as objectId } from "mongoose";
// const objectId = mongoose.Schema.Types.ObjectId
const userRepositoryMongoDB = () => {
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        return user;
    });
    const getUserById = (Id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.findById(Id);
        return data;
    });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModel_1.default.create(user);
    });
    const addOrganization = (orgId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $push: { organizations: orgId } });
    });
    const changePassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { password: newPassword });
        return res;
    });
    const getApprovedEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.find({ status: "approved" });
        return data;
    });
    const getCompleteEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.aggregate([
            { $match: { _id: new mongodb_1.ObjectId(id) } },
            {
                $lookup: {
                    from: "organizations",
                    let: { organizerId: { $toObjectId: "$organizer" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$organizerId"] },
                            },
                        },
                    ],
                    as: "organizerInfo",
                },
            },
            {
                $unwind: "$organizerInfo",
            },
        ]);
        return data;
    });
    const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield eventModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(data.eventId) }, { $inc: { ticketSold: data.ticketCount } });
        const newData = new bookings_1.default(data);
        const res = yield newData.save();
        return res;
    });
    const getBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            // Match bookings for the specified user
            {
                $match: { userId: userId },
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
            // Unwind the event array
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
                    event: {
                        eventName: "$event.eventName",
                        organizer: "$event.organizer",
                        imageURL: "$event.imageURL",
                        startDate: "$event.startDate",
                        startTime: "$event.startTime",
                        ticketValue: "$event.ticketValue",
                        city: "$event.city",
                        state: "$event.state",
                        // Include other event fields as needed
                    },
                },
            },
            {
                $sort: { _id: -1 },
            },
        ])
            .exec()
            .catch((error) => {
            console.error("Error retrieving user bookings:", error);
        });
        return data;
    });
    const getOneBookingDetails = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield bookings_1.default.aggregate([
            // Match bookings for the specified user
            {
                $match: { _id: new mongodb_1.ObjectId(bookingId) },
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
            // Unwind the event array
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
                        avgRating: "$event.avgRating",
                        numOfReviews: "$event.numOfReviews",
                        reviews: "$event.reviews",
                        // Include other event fields as needed
                    },
                },
            },
        ]).exec();
        return data;
    });
    const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(bookingId);
        const res = yield bookings_1.default.updateOne({ _id: new mongodb_1.ObjectId(bookingId) }, { status: "canceled" });
        return res;
    });
    const getAllOrganizers = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield organizationModel_1.default.find({});
        return data;
    });
    const addProfileContactInfo = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, {
            website: data.website,
            phoneNumber: data.phoneNumber,
            profileImage: data.imageURL,
            firstName: data.firstName,
            lastName: data.lastName,
        });
        return res;
    });
    const addAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = yield address_1.default.findOne({ userId: data.userId });
            if (address) {
                const res = yield address_1.default.updateOne({ userId: data.userId }, {
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                    city: data.city,
                    country: data.country,
                    pin: data.pin,
                    state: data.state,
                    wAddressLine1: data.wAddressLine1,
                    wAddressLine2: data.wAddressLine2,
                    wCity: data.wCity,
                    wCountry: data.wCountry,
                    wPin: data.wPin,
                    wState: data.wState,
                });
                return res;
            }
            else {
                const res = yield address_1.default.create(data);
                return res;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const updateEmail = (email, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { email: email });
        return res;
    });
    const getAddressInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield address_1.default.findOne({ userId: userId });
        return data;
    });
    const searchEvents = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        const { searchText, city, price, category } = searchQuery;
        try {
            // Build the search query using Mongoose
            const query = { status: "approved" };
            if (searchText) {
                query.eventName = { $regex: new RegExp(searchText, "i") };
            }
            // Apply filters for location and category
            if (city) {
                query.city = { $regex: new RegExp(city, "i") };
            }
            if (price) {
                query.ticketValue = { $regex: new RegExp(price, "i") };
            }
            if (category) {
                query.category = { $regex: new RegExp(category, "i") };
            }
            // Perform the search using the constructed query
            const events = yield eventModel_1.default.find(query);
            // Return the search results
            return events;
        }
        catch (error) {
            console.error("Error searching events:", error);
        }
    });
    const searchOrganizer = (searchText) => __awaiter(void 0, void 0, void 0, function* () {
        const query = {};
        if (searchText) {
            query.orgName = { $regex: new RegExp(searchText, "i") };
        }
        const data = yield organizationModel_1.default.find(query);
        return data;
    });
    const getChat = (userId, secondUser) => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield chats_1.default.find({
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: secondUser } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessages");
        const fullChat = yield userModel_1.default.populate(data, {
            path: "latestMessages.sender",
            select: "firsName email profileImage",
        });
        return fullChat;
    });
    const createChat = (chatData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(chatData);
        const res = yield chats_1.default.create(chatData);
        const fullChat = yield chats_1.default.find({ _id: res._id }).populate("users", "-password");
        return fullChat;
    });
    const getUsersChat = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield chats_1.default.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users", "-password")
                .populate("latestMessages")
                .sort({ updatedAt: -1 });
            const result = yield userModel_1.default.populate(data, {
                path: "latestMessages.sender",
                select: "firstName email profileImage",
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
    const sendMessage = (newMessage) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield message_1.default.create(newMessage);
        const resSender = yield res.populate("sender", "firstName email profileImage");
        const resChat = yield resSender.populate("chat");
        const resUser = yield userModel_1.default.populate(resSender, {
            path: "chat.users",
            select: "firstName email profileImage",
        });
        yield chats_1.default.findByIdAndUpdate(newMessage.chat, { latestMessages: resUser });
        return resChat;
    });
    const getAllMessage = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield message_1.default.find({ chat: chatId })
            .populate("sender", "firstName email profileImage")
            .populate("chat");
        return messages;
    });
    const addFollow = (userId, orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findById(userId);
        const orgId_id = new mongoose_1.Types.ObjectId(orgId);
        if (user === null || user === void 0 ? void 0 : user.following.includes(orgId_id)) {
            return { message: "this organizer is already in the list", ok: false };
        }
        const userAdded = yield organizationModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(orgId) }, { $push: { followers: userId } });
        const organizationAdded = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $push: { following: orgId } });
        if (userAdded && organizationAdded) {
            return { message: "successfully added to following", ok: true };
        }
    });
    const unFollow = (userId, orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const userRemoved = yield organizationModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(orgId) }, { $pull: { followers: userId } });
        const organizationRemoved = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $pull: { following: orgId } });
        if (userRemoved && organizationRemoved) {
            return { message: "successfully removed from following list", ok: true };
        }
    });
    const likeEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $push: { likedEvents: eventId } });
        console.log(res);
        if (res) {
            return { message: "successfully added to like list", ok: true };
        }
        else {
            return { error: "adding like list failed", ok: false };
        }
    });
    const unLikeEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $pull: { likedEvents: eventId } });
        if (res) {
            return { message: "successfully removed event form like list", ok: true };
        }
        else {
            return { error: "removing event from liked list failed", ok: false };
        }
    });
    const getLikedEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield userModel_1.default.findById({ _id: userId }).populate("likedEvents");
            return data;
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowingOrgs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.findById({ _id: userId }).populate("following");
        console.log(data);
        return data;
    });
    const updateBookings = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield bookings_1.default.updateOne({ _id: bookingId }, { isAttended: true, status: "attended" });
        return res;
    });
    const addReview = (review, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield eventModel_1.default.findById(eventId);
        if (event) {
            const isReviewed = event === null || event === void 0 ? void 0 : event.reviews.find((item) => {
                var _a;
                return ((_a = item.userId) === null || _a === void 0 ? void 0 : _a.toString()) == review.userId.toString();
            });
            if (isReviewed) {
                event === null || event === void 0 ? void 0 : event.reviews.forEach((item) => {
                    var _a;
                    if (((_a = item.userId) === null || _a === void 0 ? void 0 : _a.toString()) == review.userId.toString()) {
                        item.rating = review.rating;
                        item.comment = review.comment;
                    }
                });
            }
            else {
                const dataToPush = {
                    userId: new mongoose_1.Types.ObjectId(review.userId),
                    rating: review.rating,
                    comment: review.comment,
                };
                event === null || event === void 0 ? void 0 : event.reviews.push(dataToPush);
            }
            event.numOfReviews = event === null || event === void 0 ? void 0 : event.reviews.length;
            event.avgRating =
                event.reviews.reduce((acc, item) => item.rating + acc, 0) /
                    event.numOfReviews;
            console.log(event.avgRating);
            const res = yield event.save({ validateBeforeSave: false });
            if (res) {
                return { message: "reviews updated", ok: true };
            }
            else {
                return { message: "review updating failed", ok: false };
            }
        }
        else {
            return { message: "event not found", ok: false };
        }
    });
    const getReview = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield eventModel_1.default.findById(eventId).populate("reviews.userId");
        console.log('got reviews');
        console.log(data);
        return data;
    });
    const getEventsFromFollowingOrganizers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        // const data = await User.aggregate([
        //   {
        //     $match: { _id: new ObjectId(userId) },
        //   },
        //   {
        //     $lookup: {
        //       from: "events",
        //       localField: "following",
        //       foreignField: "organizer",
        //       as: "events",
        //     },
        //   },
        //   {
        //     $unwind: "$events",
        //   },
        //   {
        //     $replaceRoot: { newRoot: "$events" },
        //   },
        // ]);
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            const followingArray = user === null || user === void 0 ? void 0 : user.following.map((item) => item.toString());
            const events = yield eventModel_1.default.find({ organizer: { $in: followingArray }, status: 'approved' });
            console.log(events);
            return events;
        }
    });
    return {
        addUser,
        getUserByEmail,
        getUserById,
        changePassword,
        addOrganization,
        getApprovedEvents,
        getCompleteEventDetails,
        createBooking,
        getBookings,
        getOneBookingDetails,
        cancelBooking,
        getAllOrganizers,
        addProfileContactInfo,
        addAddress,
        updateEmail,
        getAddressInfo,
        searchEvents,
        searchOrganizer,
        getChat,
        createChat,
        getUsersChat,
        sendMessage,
        getAllMessage,
        addFollow,
        unFollow,
        likeEvent,
        unLikeEvent,
        getLikedEvents,
        getFollowingOrgs,
        addReview,
        updateBookings,
        getReview,
        getEventsFromFollowingOrganizers,
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
