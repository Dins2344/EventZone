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
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminLogin = (email, password, adminRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new appError_1.default('invalid credentials', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('invalid password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken({ Id: admin._id, email: admin.email, role: 'admin' });
    return token;
});
exports.default = adminLogin;
