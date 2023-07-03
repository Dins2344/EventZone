import expressConfig from "./frameworks/server";
import express,{Application,NextFunction} from "express"
import http from 'http'
import routes from "./frameworks/server/routes";
import connectDB from "./frameworks/database/mongoDB/connection";
import AppError from "./utils/appError";
import errorHandlingMiddleware from "./frameworks/server/middlewares/errorHandling";
import serverConfig from "./frameworks/server/server";


const app:Application = express()
const server=http.createServer(app)

expressConfig(app)
connectDB() 
app.use(errorHandlingMiddleware)
routes(app)


app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});
serverConfig(server).startServer()
