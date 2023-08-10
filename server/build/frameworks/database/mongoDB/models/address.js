"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    addressLine1: {
        type: String,
        requiered: [true, "please add address line 1"],
    },
    addressLine2: {
        type: String,
    },
    city: { type: String, required: [true, "please add city"] },
    country: { type: String, required: [true, "please add country"] },
    pin: { type: String, required: [true, "please add pin"] },
    state: { type: String, required: [true, "please add state"] },
    wAddressLine1: { type: String },
    wAddressLine2: { type: String },
    wCity: { type: String },
    wCountry: { type: String },
    wPin: { type: String },
    wState: { type: String },
    userId: { type: String },
});
const Address = (0, mongoose_1.model)("Address", addressSchema, "address");
exports.default = Address;
