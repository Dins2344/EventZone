"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orgCategorySchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
        required: [true, 'please add a category name'],
        unique: true
    },
    subCategoryName: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'please add description']
    }
});
const OrganizationCategory = (0, mongoose_1.model)('OrganizationCategory', orgCategorySchema, 'organizationCategory');
exports.default = OrganizationCategory;
