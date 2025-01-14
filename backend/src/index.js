import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import { httpServer } from "./app.js";
dotenv.config();

connectDB().then(
    httpServer.listen(process.env.PORT,()=>{
        console.log("server started");
    })
    
)
.catch((error)=>{
    console.log(error);
})


