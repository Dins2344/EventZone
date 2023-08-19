"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingsSchema = new mongoose_1.Schema({
    eventId: {
        type: String,
        required: [true, "please add eventId"],
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "please add userId"],
        ref: "User",
    },
    bookingTime: {
        type: String,
        required: [true, "please add time"],
    },
    contactInfo: {
        type: Object,
        required: [true, "please add contactInfo"],
    },
    ticketCount: {
        type: Number,
        required: [true, "please add ticket count"],
    },
    status: {
        type: String,
        required: [true, "please add ticket count"],
    },
    QRCodeLink: {
        type: String,
        required: [true, "please add ticket count"],
    },
    paymentType: {
        type: String,
        required: [true, "please add payment type"],
    },
    totalAmount: {
        type: Number,
        required: [true, "please add total amount"],
    },
    organizationId: {
        type: String,
        required: [true, "please,add organizationId"],
        ref: "Organization",
    },
    orgOwnerId: {
        type: String,
        required: [true, "add orgOwnerId"],
        ref: "User",
    },
    isAttended: {
        type: Boolean,
    },
    isCanceled: {
        type: Boolean,
    },
});
const Bookings = (0, mongoose_1.model)("Bookings", bookingsSchema, "bookings");
exports.default = Bookings;
