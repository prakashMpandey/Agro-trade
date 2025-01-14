import mongoose from "mongoose";

const connectDB= async ()=>{
    try {

        const connection=await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        // console.log(connection);
        console.log("database connection established");
        
    } catch (error) {

        console.log(error);

        process.exit(1);
        
    }
}

export default connectDB;