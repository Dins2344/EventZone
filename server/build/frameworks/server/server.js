"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const socket_io_1 = require("socket.io");
const serverConfig = (server) => {
    const io = new socket_io_1.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            // credentials: true,
        },
    });
    const startServer = () => {
        server.listen(config_1.default.PORT, () => {
            console.log(`Server listening on Port ${config_1.default.PORT}`);
        });
    };
    return {
        io,
        startServer
    };
};
exports.default = serverConfig;
