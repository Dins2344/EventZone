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
const userAuth_1 = require("./../../../application/usecases/user/userAuth");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_2 = require("../../../application/usecases/user/userAuth");
const userController = (userDbRepository, userDbRepositoryImpl, authServiceInterface, authServiceImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const verifyPasswordController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const password = req.body.password;
        console.log(userId, password);
        if (userId) {
            const response = yield (0, userAuth_2.verifyPassword)(userId, password, dbRepositoryUser, authService);
            if (response) {
                res.json({ message: "password verified", ok: true });
            }
            else {
                res.json({ error: "password does not matched", ok: false });
            }
        }
    }));
    const changePasswordController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const newPassword = req.body.newPassword;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        if (userId && newPassword) {
            const response = yield (0, userAuth_1.changePassword)(newPassword, userId, dbRepositoryUser, authService);
            console.log(response);
            if (response) {
                res.json({ message: 'changing password is done', ok: true, response });
            }
            else {
                res.json({ error: 'changing password failed', ok: false, });
            }
        }
    }));
    const getUserByEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const email = (_c = req.user) === null || _c === void 0 ? void 0 : _c.email;
        if (email) {
            const data = yield dbRepositoryUser.getUserByEmail(email);
            if (data) {
                res.json({ data });
            }
            else {
                res.json({ error: "user data fetching failed" });
            }
        }
        else {
            res.json({ error: "fetching id from api bearer failed" });
        }
    }));
    const getUserByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.Id;
        console.log(userId);
        if (userId) {
            const data = yield (0, userAuth_2.getUserById)(userId, dbRepositoryUser);
            if (data) {
                res.json({ message: "fetching user data done", data, ok: true });
            }
            else {
                res.json({ error: "fetching user data failed" });
            }
        }
    }));
    const getApprovedEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, userAuth_2.getApprovedEvents)(dbRepositoryUser);
        if (data) {
            res.json({ message: "approved events fetched", data });
        }
        else {
            res.json({ error: "approved events fetching failed" });
        }
    }));
    const getCompleteEventDetailsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, userAuth_2.getCompleteEventDetails)(id, dbRepositoryUser);
        if (data) {
            res.json({ message: "event details fetch done", data });
        }
        else {
            res.json({ error: "event fetching failed" });
        }
    }));
    const createBookingController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const response = yield (0, userAuth_2.createBooking)(data, dbRepositoryUser);
        if (response) {
            res.json({ message: "booking confirmed", response });
        }
        else {
            res.json({ error: "booking failed" });
        }
    }));
    const getBookingsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.Id;
        if (userId) {
            const data = yield (0, userAuth_2.getBookings)(userId, dbRepositoryUser);
            if (data) {
                res.json({ message: "fetching booking details done", data });
            }
            else {
                res.json({ error: "fetching booking details failed" });
            }
        }
    }));
    const getOneBookingDetailsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingId = req.params.bookingId;
        const data = yield (0, userAuth_2.getOneBookingDetails)(bookingId, dbRepositoryUser);
        if (data) {
            res.json({ message: "fetching booking details done", data });
        }
        else {
            res.json({ error: "fetching details failed" });
        }
    }));
    const cancelBookingController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingId = req.params.id;
        console.log(bookingId);
        const response = yield (0, userAuth_2.cancelBooking)(bookingId, dbRepositoryUser);
        if (response) {
            res.json({ message: "canceling order done", response });
        }
        else {
            res.json({ error: "canceling order failed" });
        }
    }));
    const getAllOrganizersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, userAuth_2.getAllOrganizers)(dbRepositoryUser);
        if (data) {
            res.json({ message: "getting all organizers details done", data });
        }
        else {
            res.json({ error: "getting organizers details failed" });
        }
    }));
    const addProfileContactInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        const data = req.body;
        const profileImage = req.files;
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.Id;
        if (userId) {
            if (profileImage.length) {
                data.imageURL = profileImage[0].path;
            }
            const response = yield (0, userAuth_2.addProfileContactInfo)(data, userId, dbRepositoryUser);
            if (response) {
                console.log(response);
                res.json({ ok: true, message: "data added to user db", response });
            }
            else {
                res.json({ error: "data adding failed" });
            }
        }
    }));
    const addAddressController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g.Id;
        const data = req.body;
        if (userId) {
            const response = yield (0, userAuth_2.addAddress)(data, userId, dbRepositoryUser);
            if (response) {
                res.json({ message: "adding address done", ok: true, response });
            }
            else {
                res.json({ error: "adding address failed" });
            }
        }
    }));
    const updateEmailController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        const userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.Id;
        const { email } = req.body;
        if (userId) {
            const response = yield (0, userAuth_2.updateEmail)(email, userId, dbRepositoryUser);
            if (response) {
                res.json({ message: "email updated", ok: true, response });
            }
            else {
                res.json({ error: "update email failed", ok: false });
            }
        }
    }));
    const getAddressInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        const userId = (_j = req.user) === null || _j === void 0 ? void 0 : _j.Id;
        if (userId) {
            console.log(userId);
            const data = yield (0, userAuth_2.getAddressInfo)(userId, dbRepositoryUser);
            console.log(data);
            if (data) {
                res.json({ message: "fetching address data done", ok: true, data });
            }
            else {
                res.json({ error: "fetching address details failed" });
            }
        }
    }));
    const searchEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.query) {
            const { searchFor, searchText, city, price, category } = req.query;
            const searchQuery = { searchFor, searchText, city, price, category };
            const data = yield (0, userAuth_2.searchAnything)(searchQuery, dbRepositoryUser);
            if (data) {
                res.json({ message: "search data fetching done", ok: true, data });
            }
            else {
                res.json({ error: "fetching search data failed", ok: false });
            }
        }
    }));
    const accessChatController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _k;
        const userId = (_k = req.user) === null || _k === void 0 ? void 0 : _k.Id;
        const body = req.body;
        if (userId && body) {
            const isChat = yield (0, userAuth_2.getChat)(userId, body.secondUserId, dbRepositoryUser);
            if (isChat.length > 0) {
                res.json({
                    message: "chat with this user already exist",
                    ok: true,
                    isChat,
                });
            }
            else {
                const chatData = {
                    chatName: "sample",
                    users: [userId, body.secondUserId],
                    orgName: body.orgName,
                    logo: body.logo,
                };
                const chat = yield (0, userAuth_2.createChat)(chatData, dbRepositoryUser);
                if (chat) {
                    res.json({
                        message: "created new chat for this user",
                        chat,
                        ok: true,
                    });
                }
                else {
                    res.json({ error: "creating chat for this user failed" });
                }
            }
        }
        else {
            res.json({ error: "no data in req.body" });
        }
    }));
    const getUsersChatController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _l;
        const userId = (_l = req.user) === null || _l === void 0 ? void 0 : _l.Id;
        if (userId) {
            const data = yield (0, userAuth_2.getUsersChat)(userId, dbRepositoryUser);
            if (data) {
                res.json({ message: "fetching users chats done", ok: true, data });
            }
            else {
                res.json({ error: "fetching users chat failed", ok: false });
            }
        }
    }));
    const sendMessageController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body && req.user) {
            const newMessage = {
                chat: req.body.chatId,
                content: req.body.content,
                sender: req.user.Id,
            };
            const response = yield (0, userAuth_2.sendMessage)(newMessage, dbRepositoryUser);
            if (response) {
                res.json({ message: "sending message done", ok: true, response });
            }
            else {
                res.json({ error: "sending message failed" });
            }
        }
    }));
    const getAllMessageController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = req.params.id;
        if (chatId) {
            const data = yield (0, userAuth_1.getAllMessage)(chatId, dbRepositoryUser);
            if (data) {
                res.json({ message: "fetching all messages done", ok: true, data });
            }
            else {
                res.json({ error: "fetching all messages failed" });
            }
        }
    }));
    const addFollowController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const orgId = req.params.id;
        if (user && orgId) {
            const response = yield (0, userAuth_1.addFollow)(user.Id, orgId, dbRepositoryUser);
            if (response) {
                res.json({
                    response,
                });
            }
            else {
                res.json({
                    message: "adding to following list failed",
                    ok: false,
                    response,
                });
            }
        }
    }));
    const unFollowController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const orgId = req === null || req === void 0 ? void 0 : req.params.id;
        if (user && orgId) {
            const response = yield (0, userAuth_1.unFollow)(user.Id, orgId, dbRepositoryUser);
            if (response) {
                res.json({
                    response,
                });
            }
            else {
                res.json({
                    message: "removing from following list not done",
                    ok: false,
                    response,
                });
            }
        }
    }));
    const likeEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _m;
        const userId = (_m = req.user) === null || _m === void 0 ? void 0 : _m.Id;
        const eventId = req.params.id;
        if (userId && eventId) {
            const response = yield (0, userAuth_1.likeEvent)(userId, eventId, dbRepositoryUser);
            if (response.ok) {
                res.json({ response });
            }
            else {
                res.json({ response });
            }
        }
        else {
            res.json({ error: "params not find" });
        }
    }));
    const unLikeEventController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _o;
        const userId = (_o = req.user) === null || _o === void 0 ? void 0 : _o.Id;
        const eventId = req.params.id;
        if (userId && eventId) {
            const response = yield (0, userAuth_1.unLikeEvent)(userId, eventId, dbRepositoryUser);
            if (response.ok) {
                res.json({ response });
            }
            else {
                res.json({ response });
            }
        }
        else {
            res.json({ error: "params not find" });
        }
    }));
    const getLikedEventsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _p;
        const userId = (_p = req.user) === null || _p === void 0 ? void 0 : _p.Id;
        if (userId) {
            const data = yield (0, userAuth_1.getLikedEvents)(userId, dbRepositoryUser);
            if (data) {
                res.json({ message: "getting liked events done", ok: true, data });
            }
            else {
                res.json({ error: "getting liked events failed", ok: false });
            }
        }
    }));
    const getFollowingController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _q;
        const userId = (_q = req.user) === null || _q === void 0 ? void 0 : _q.Id;
        if (userId) {
            const data = yield (0, userAuth_1.getFollowing)(userId, dbRepositoryUser);
            if (data) {
                res.json({ message: "getting liked events done", ok: true, data });
            }
            else {
                res.json({ error: "getting liked events failed", ok: false });
            }
        }
    }));
    const updateBookingsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, userAuth_1.updateBookings)(req.params.id, dbRepositoryUser);
        if (response) {
            res.json({ message: "updated booking", ok: true });
        }
        else {
            res.json({ error: "updating bookings failed" });
        }
    }));
    const addReviewController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _r;
        if (req.user) {
            const review = {
                userId: (_r = req.user) === null || _r === void 0 ? void 0 : _r.Id,
                rating: req.body.rating,
                comment: req.body.comment,
            };
            const response = yield (0, userAuth_1.addReview)(review, req.body.eventId, dbRepositoryUser);
            if (response) {
                res.json({ response });
            }
            else {
                res.json({ error: "updating review failed" });
            }
        }
    }));
    const getReviewsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, userAuth_1.getReviews)(req.params.id, dbRepositoryUser);
        if (data) {
            res.json({ message: "getting reviews done", data, ok: true });
        }
        else {
            res.json({ error: "getting reviews failed" });
        }
    }));
    const getEventsFromFollowingOrganizersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _s;
        const userId = (_s = req.user) === null || _s === void 0 ? void 0 : _s.Id;
        if (userId) {
            const data = yield (0, userAuth_1.getEventsFromFollowingOrganizers)(userId, dbRepositoryUser);
            if (!data) {
                res.json({
                    error: "getting following organizers events failed",
                    ok: false,
                });
            }
            else {
                res.json({
                    message: "getting following organizers events done",
                    data,
                    ok: true,
                });
            }
        }
    }));
    return {
        getUserByEmail,
        verifyPasswordController,
        changePasswordController,
        getUserByIdController,
        getApprovedEventsController,
        getCompleteEventDetailsController,
        createBookingController,
        getBookingsController,
        getOneBookingDetailsController,
        cancelBookingController,
        getAllOrganizersController,
        addProfileContactInfoController,
        addAddressController,
        updateEmailController,
        getAddressInfoController,
        searchEventsController,
        accessChatController,
        getUsersChatController,
        sendMessageController,
        getAllMessageController,
        addFollowController,
        unFollowController,
        likeEventController,
        unLikeEventController,
        getLikedEventsController,
        getFollowingController,
        updateBookingsController,
        addReviewController,
        getReviewsController,
        getEventsFromFollowingOrganizersController,
    };
};
exports.default = userController;
