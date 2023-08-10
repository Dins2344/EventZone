"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./frameworks/server"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./frameworks/server/routes"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDB/connection"));
const errorHandling_1 = __importDefault(require("./frameworks/server/middlewares/errorHandling"));
const server_2 = __importDefault(require("./frameworks/server/server"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const { startServer, io } = (0, server_2.default)(server);
(0, server_1.default)(app);
(0, connection_1.default)();
(0, routes_1.default)(app);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/dist", "index.html"));
});
app.use(errorHandling_1.default);
// app.all("*", (req, res, next: NextFunction) => {
//   next(new AppError("Not found", 404));
// });
io.on("connection", (socket) => {
    console.log("A new client connected!");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`user joined in room : ${room}`);
    });
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id)
                return;
            console.log(newMessageReceived);
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
});
startServer();
