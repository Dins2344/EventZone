"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    eventName: {
        type: String,
        required: [true, 'please add a category name'],
        unique: true
    },
    organizer: {
        type: String,
        required: [true, 'please add a category name']
    },
    category: {
        type: String,
        required: [true, 'please add description']
    },
    agenda: {
        type: String
    },
    addressLine1: {
        type: String,
        required: [true, 'please add description']
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String
    },
    startDate: {
        type: String,
        required: [true, 'please add description']
    },
    startTime: {
        type: String,
        required: [true, 'please add description']
    },
    endDate: {
        type: String,
        required: [true, 'please add description']
    },
    endTime: {
        type: String,
        required: [true, 'please add description']
    },
    imageURL: {
        type: (Array),
    },
    videoURL: {
        type: String,
    },
    description: {
        type: String,
    },
    eventCapacity: {
        type: Number,
    },
    ticketPrice: {
        type: Number,
    },
    ticketValue: {
        type: String
    },
    status: {
        type: String
    },
    registeredTime: {
        type: String
    },
    orgOwnerId: {
        type: String
    },
    orgName: {
        type: String
    },
    ticketSold: {
        type: Number
    },
    isPromoted: {
        type: Boolean
    },
    reviews: [
        {
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                default: ''
            },
            rating: {
                type: Number,
                default: 0
            },
            comment: {
                type: String,
                default: 0
            }
        }
    ],
    avgRating: {
        type: Number
    },
    numOfReviews: {
        type: Number
    }
});
const Event = (0, mongoose_1.model)('Event', eventSchema, 'events');
exports.default = Event;
