import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import http from "http";
import cookieParser from "cookie-parser";
import {Server} from "socket.io"
import { auctionController } from "./controllers/auction.controller.js";
import { job } from "./utilities/automaticDeletor.utils.js";
const app=express();

dotenv.config()

console.log(process.env.FRONTEND_URL)
export const httpServer=http.createServer(app)
const io=new Server(httpServer,{
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST","PUT","DELETE"],
      credentials:true
    }});

job(io)
auctionController(io)

 


app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,

}));

app.use(json({
    limit:"15kb"
}))
app.use(express.urlencoded({extended:true,limit:"12kb"}))


 
//routes
import userRouter from "./routes/user.routes.js"
import auctionRouter from "./routes/auction.routes.js"
import adminRouter from "./routes/admin.routes.js"
import infoRouter from "./routes/info.routes.js"

app.use("/api/v1/user",userRouter);
app.use("/api/v1/auction",auctionRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/info",infoRouter);
export default app;