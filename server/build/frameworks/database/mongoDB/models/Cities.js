"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citesSchema = new mongoose_1.Schema({
    cityName: {
        type: String,
        required: [true, 'please add email'],
        unique: true
    },
    state: {
        type: String,
    },
});
const Cities = (0, mongoose_1.model)("Cities", citesSchema, "cities");
exports.default = Cities;
