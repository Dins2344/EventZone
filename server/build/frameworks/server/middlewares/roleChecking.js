"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleChecking = exports.adminRoleChecking = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const adminRoleChecking = (req, res, next) => {
    var _a;
    const role = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role === 'admin') {
        next();
    }
    else {
        throw new appError_1.default('unauthorized admin role', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.adminRoleChecking = adminRoleChecking;
const userRoleChecking = (req, res, next) => {
    var _a;
    const role = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role === 'user') {
        next();
    }
    else {
        throw new appError_1.default('unauthorized user role', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.userRoleChecking = userRoleChecking;
