"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "please add a first name"],
    },
    lastName: {
        type: String,
        required: [true, "please add a first name"],
    },
    email: {
        type: String,
        required: [true, "please add a first name"],
        unique: true,
    },
    password: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    organizations: {
        type: Array,
    },
    phoneNumber: {
        type: Number,
    },
    website: {
        type: String,
    },
    status: {
        type: String,
        default: 'active'
    },
    joinedOn: {
        type: String,
        default: new Date().toDateString()
    },
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Organization",
        },
    ],
    likedEvents: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
});
const User = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = User;
