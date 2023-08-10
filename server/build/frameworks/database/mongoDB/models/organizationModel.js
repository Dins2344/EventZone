"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true, "please add userID"]
    },
    orgName: {
        type: String,
        required: [true, 'please add organization name'],
        unique: true
    },
    orgType: {
        type: String,
        required: [true, 'please add organization type']
    },
    ownerId: {
        type: String
    },
    admin: {
        type: Array
    },
    status: {
        type: Boolean
    },
    logo: {
        type: String
    },
    country: {
        type: String,
        default: ''
    },
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdOn: {
        type: String,
        default: new Date().toDateString()
    }
});
const Organization = (0, mongoose_1.model)('Organization', organizationSchema, 'organizations');
exports.default = Organization;
