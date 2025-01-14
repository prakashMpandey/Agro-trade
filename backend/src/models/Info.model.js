import mongoose,{Schema} from "mongoose";

const infoSchema=new Schema({

    type:{
        type:String,
        required:true,
        lowercase:true
    },
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    description:
    {
        type:String,
        required:true,
        lowercase:true
    },
    image:{

        type:String,
        required:true
    }

},{timestamps:true})

 const Info=new mongoose.model("Info",infoSchema);

 export default Info;