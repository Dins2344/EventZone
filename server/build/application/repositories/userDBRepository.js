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
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getUserByEmail(email);
    });
    const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getUserById(userId);
    });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addUser(user);
    });
    const changePassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.changePassword(newPassword, userId);
    });
    const addOrganization = (orgId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addOrganization(orgId, userId);
    });
    const getApprovedEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getApprovedEvents();
    });
    const getCompleteEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getCompleteEventDetails(id);
    });
    const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.createBooking(data);
        return res;
    });
    const getBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getBookings(userId);
        return data;
    });
    const getOneBookingDetails = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getOneBookingDetails(bookingId);
        return data;
    });
    const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.cancelBooking(bookingId);
        return res;
    });
    const getAllOrganizers = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAllOrganizers();
        return data;
    });
    const addProfileContactInfo = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addProfileContactInfo(data, userId);
        return res;
    });
    const addAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addAddress(data);
        return res;
    });
    const updateEmail = (email, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.updateEmail(email, userId);
        return res;
    });
    const getAddressInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAddressInfo(userId);
        return data;
    });
    const searchEvents = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.searchEvents(searchQuery);
        return data;
    });
    const searchOrganizer = (searchText) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.searchOrganizer(searchText);
        return data;
    });
    const getChat = (userId, secondUser) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getChat(userId, secondUser);
        return data;
    });
    const createChat = (chatData) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.createChat(chatData);
        return data;
    });
    const getUsersChat = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getUsersChat(userId);
        return data;
    });
    const sendMessage = (newMessage) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.sendMessage(newMessage);
        return data;
    });
    const getAllMessage = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getAllMessage(chatId);
        return data;
    });
    const addFollow = (userId, orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addFollow(userId, orgId);
        return res;
    });
    const unFollow = (userId, orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.unFollow(userId, orgId);
        return res;
    });
    const likeEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.likeEvent(userId, eventId);
        return res;
    });
    const unLikeEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.unLikeEvent(userId, eventId);
        return res;
    });
    const getLikedEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getLikedEvents(userId);
        return data;
    });
    const getFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getFollowingOrgs(userId);
        return data;
    });
    const updateBookings = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.updateBookings(bookingId);
        return res;
    });
    const addReview = (review, eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield repository.addReview(review, eventId);
        return res;
    });
    const getReviews = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield repository.getReview(eventId);
        return data;
    });
    const getEventsFromFollowingOrganizers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getEventsFromFollowingOrganizers(userId);
    });
    return {
        addUser,
        changePassword,
        getUserByEmail,
        getUserById,
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
        getFollowing,
        addReview,
        updateBookings,
        getReviews,
        getEventsFromFollowingOrganizers,
    };
};
exports.userDbRepository = userDbRepository;
