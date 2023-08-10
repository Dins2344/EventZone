"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    orgName: { type: String },
    chatName: {
        type: String,
        required: [true, "please add email"],
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessages: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Message",
    },
    logo: {
        type: String,
    },
}, { timestamps: true });
const Chat = (0, mongoose_1.model)("Chat", chatSchema, "chat");
exports.default = Chat;
