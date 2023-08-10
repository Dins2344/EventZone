import expressConfig from "./frameworks/server";
import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import routes from "./frameworks/server/routes";
import connectDB from "./frameworks/database/mongoDB/connection";
import AppError from "./utils/appError";
import errorHandlingMiddleware from "./frameworks/server/middlewares/errorHandling";
import serverConfig from "./frameworks/server/server";
import { UserInterface } from "./types/userInterface";
import path from 'path'
const app: Application = express();
const server = http.createServer(app);

const { startServer, io } = serverConfig(server);
expressConfig(app);
connectDB();

// app.use(express.static(path.join(__dirname,'../../client/dist')))
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
// });
app.use(errorHandlingMiddleware);
routes(app);

app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});

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
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: UserInterface) => {
      if (user._id == newMessageReceived.sender._id) return;

      console.log(newMessageReceived);
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});

startServer();
