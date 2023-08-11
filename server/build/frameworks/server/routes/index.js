"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const organization_1 = __importDefault(require("./organization"));
const paypal_1 = __importDefault(require("./paypal"));
const authJWT_1 = __importDefault(require("../middlewares/authJWT"));
const roleChecking_1 = require("../middlewares/roleChecking");
const roleChecking_2 = require("../middlewares/roleChecking");
const chat_1 = __importDefault(require("./chat"));
const routes = (app) => {
    app.use('/auth', (0, auth_1.default)());
    app.use('/admin', authJWT_1.default, roleChecking_1.adminRoleChecking, (0, admin_1.default)());
    app.use('/user', (0, user_1.default)());
    app.use('/organization', authJWT_1.default, roleChecking_2.userRoleChecking, (0, organization_1.default)());
    app.use('/my-server', (0, paypal_1.default)());
    app.use('/user/chat', (0, chat_1.default)());
};
exports.default = routes;
