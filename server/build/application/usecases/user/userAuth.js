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
exports.getEventsFromFollowingOrganizers = exports.getReviews = exports.addReview = exports.updateBookings = exports.getFollowing = exports.getLikedEvents = exports.unLikeEvent = exports.likeEvent = exports.unFollow = exports.addFollow = exports.getAllMessage = exports.sendMessage = exports.getUsersChat = exports.createChat = exports.getChat = exports.searchAnything = exports.getAddressInfo = exports.updateEmail = exports.addAddress = exports.addProfileContactInfo = exports.getAllOrganizers = exports.cancelBooking = exports.getOneBookingDetails = exports.getBookings = exports.createBooking = exports.getCompleteEventDetails = exports.getApprovedEvents = exports.addOrganization = exports.getUserById = exports.tokenGenerator = exports.emailVerify = exports.googleSignup = exports.googleLogin = exports.userLogin = exports.changePassword = exports.verifyPassword = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const qrcode_1 = __importDefault(require("qrcode"));
const userRegister = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    user.email = user.email.toLowerCase();
    const isEmailExist = yield userRepository.getUserByEmail(user.email);
    if (isEmailExist) {
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = yield authService.hashPassword(user.password);
    const { _id: Id, email } = yield userRepository.addUser(user);
    const token = authService.generateToken({
        Id: Id.toString(),
        email,
        role: "user",
    });
    return token;
});
exports.userRegister = userRegister;
const verifyPassword = (userId, password, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserById(userId);
    if (user === null || user === void 0 ? void 0 : user.password) {
        const isPasswordMatch = yield authService.comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        return isPasswordMatch;
    }
});
exports.verifyPassword = verifyPassword;
const changePassword = (newPassword, userId, userRepository, authServices) => __awaiter(void 0, void 0, void 0, function* () {
    newPassword = yield authServices.hashPassword(newPassword);
    const res = yield userRepository.changePassword(newPassword, userId);
    if (res) {
        return res;
    }
    else {
        throw new appError_1.default("updating password failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.changePassword = changePassword;
const userLogin = (email, password, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const isPasswordMatch = yield authService.comparePassword(password, user.password);
    if (!isPasswordMatch) {
        throw new appError_1.default("password is incorrect", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const token = authService.generateToken({
        Id: user._id.toString(),
        email: user.email,
        role: "user",
    });
    return { token, userData };
});
exports.userLogin = userLogin;
const googleLogin = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authService.generateToken({
        Id: user._id,
        email: user.email,
        role: "user",
    });
    return token;
});
exports.googleLogin = googleLogin;
const googleSignup = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredUser = yield userRepository.addUser(user);
    const token = authService.generateToken({ Id: registeredUser._id.toString(), email: registeredUser.email, role: 'user' });
    return { registeredUser, token };
});
exports.googleSignup = googleSignup;
const emailVerify = (email, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    return user;
});
exports.emailVerify = emailVerify;
const tokenGenerator = (email, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserByEmail(email);
    const token = authService.generateToken({
        Id: user === null || user === void 0 ? void 0 : user._id.toString(),
        email: user === null || user === void 0 ? void 0 : user.email,
        role: "user",
    });
    return token;
});
exports.tokenGenerator = tokenGenerator;
const getUserById = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getUserById(userId);
    if (!data) {
        throw new appError_1.default("user details fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getUserById = getUserById;
const addOrganization = (orgId, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.addOrganization(orgId, userId);
    if (!res) {
        throw new appError_1.default("organization adding failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addOrganization = addOrganization;
const getApprovedEvents = (userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getApprovedEvents();
    if (!data) {
        throw new appError_1.default("fetching approved events failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getApprovedEvents = getApprovedEvents;
const getCompleteEventDetails = (id, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getCompleteEventDetails(id);
    if (!data) {
        throw new appError_1.default("fetching complete event details failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getCompleteEventDetails = getCompleteEventDetails;
const createBooking = (data, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const event = yield userRepository.getCompleteEventDetails(data.eventId);
    const QRData = {
        eventName: (_a = event[0]) === null || _a === void 0 ? void 0 : _a.eventName,
        tickets: data.ticketCount,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
    };
    const QRDataString = JSON.stringify(QRData);
    const QRCodeLink = yield qrcode_1.default.toDataURL(QRDataString);
    const dbData = {
        bookingTime: new Date().toDateString(),
        eventId: data.eventId,
        userId: data.userId,
        paymentType: data.paymentType,
        totalAmount: data.totalAmount,
        contactInfo: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
        },
        ticketCount: data.ticketCount,
        status: "confirmed",
        QRCodeLink: QRCodeLink,
        orgOwnerId: data.orgOwnerId,
        organizationId: data.organizationId,
    };
    const res = yield userRepository.createBooking(dbData);
    if (!res) {
        throw new appError_1.default("creating order failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.createBooking = createBooking;
const getBookings = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getBookings(userId);
    if (!data) {
        throw new appError_1.default("getting bookings failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getBookings = getBookings;
const getOneBookingDetails = (bookingId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getOneBookingDetails(bookingId);
    if (!data) {
        throw new appError_1.default("getting booking details failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getOneBookingDetails = getOneBookingDetails;
const cancelBooking = (bookingId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.cancelBooking(bookingId);
    if (!res) {
        throw new appError_1.default("canceling booking failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.cancelBooking = cancelBooking;
const getAllOrganizers = (userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getAllOrganizers();
    if (!data) {
        throw new appError_1.default("getting all organizers details failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllOrganizers = getAllOrganizers;
const addProfileContactInfo = (data, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.addProfileContactInfo(data, userId);
    if (!res) {
        throw new appError_1.default("adding profile contact info failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addProfileContactInfo = addProfileContactInfo;
const addAddress = (data, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    const res = userRepository.addAddress(data);
    if (!res) {
        throw new appError_1.default("adding address failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addAddress = addAddress;
const updateEmail = (email, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.updateEmail(email, userId);
    if (!res) {
        throw new appError_1.default("updating email failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.updateEmail = updateEmail;
const getAddressInfo = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = userRepository.getAddressInfo(userId);
    if (!data) {
        throw new appError_1.default("getting address details failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAddressInfo = getAddressInfo;
const searchAnything = (searchQuery, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchQuery.searchFor === "event") {
        const data = yield userRepository.searchEvents(searchQuery);
        if (!data) {
            throw new appError_1.default("fetching event search data failed", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    if (searchQuery.searchFor === "organizer") {
        const data = yield userRepository.searchOrganizer(searchQuery.searchText);
        return data;
    }
});
exports.searchAnything = searchAnything;
const getChat = (userId, secondUser, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getChat(userId, secondUser);
    if (!data) {
        throw new appError_1.default("finding chat exist failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getChat = getChat;
const createChat = (chatData, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.createChat(chatData);
    if (!data) {
        throw new appError_1.default("creating chat failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.createChat = createChat;
const getUsersChat = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getUsersChat(userId);
    if (!data) {
        throw new appError_1.default("fetching users chats failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getUsersChat = getUsersChat;
const sendMessage = (newMessage, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.sendMessage(newMessage);
    if (!res) {
        throw new appError_1.default("sending new message failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.sendMessage = sendMessage;
const getAllMessage = (chatId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getAllMessage(chatId);
    if (!data) {
        throw new appError_1.default("all message fetching failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getAllMessage = getAllMessage;
const addFollow = (userId, orgId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.addFollow(userId, orgId);
    if (!res) {
        throw new appError_1.default("adding following failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.addFollow = addFollow;
const unFollow = (userId, orgId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.unFollow(userId, orgId);
    if (!res) {
        throw new appError_1.default("removing from following filed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.unFollow = unFollow;
const likeEvent = (userId, eventId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.likeEvent(userId, eventId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default("adding event to liked list failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.likeEvent = likeEvent;
const unLikeEvent = (userId, eventId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.unLikeEvent(userId, eventId);
    if (res.ok) {
        return res;
    }
    else {
        throw new appError_1.default("removing event from liked list failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.unLikeEvent = unLikeEvent;
const getLikedEvents = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getLikedEvents(userId);
    if (!data) {
        throw new appError_1.default("getting liked events failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getLikedEvents = getLikedEvents;
const getFollowing = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getFollowing(userId);
    if (!data) {
        throw new appError_1.default("getting following organizers failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getFollowing = getFollowing;
const updateBookings = (bookingId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userRepository.updateBookings(bookingId);
    if (!res) {
        throw new appError_1.default("updating attended events failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return res;
});
exports.updateBookings = updateBookings;
const addReview = (review, eventId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.addReview(review, eventId);
    if (!data.ok) {
        throw new appError_1.default("updating review has failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.addReview = addReview;
const getReviews = (eventId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getReviews(eventId);
    if (!data) {
        throw new appError_1.default("getting reviews of one event is failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getReviews = getReviews;
const getEventsFromFollowingOrganizers = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepository.getEventsFromFollowingOrganizers(userId);
    if (!data) {
        throw new appError_1.default("getting events from user following organizations has failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return data;
});
exports.getEventsFromFollowingOrganizers = getEventsFromFollowingOrganizers;
