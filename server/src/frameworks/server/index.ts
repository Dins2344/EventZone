import express,{Application,NextFunction} from "express"
import morgan from "morgan"
import cors from "cors"

const expressConfig = (app:Application)=>{
     app.use(morgan('dev'))
      app.use(
        cors({
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true,
        })
      );
     app.use(express.json())
     app.use(express.urlencoded({extended:false}))
}


export default expressConfig

