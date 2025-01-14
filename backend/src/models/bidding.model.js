
import mongoose,{Schema} from "mongoose"

const bidSchema=new Schema({

    auction:{
       type:Schema.Types.ObjectId,
       ref:"Auction",
       required:true
    },
    bidder:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bid_amount:{
        type:"String",
        required:true

    },
    bid_time:{
        type:Date,
        default:Date.now()
    }



    
    
},{timeStamps:true})

 const Bid=mongoose.model("Bid",bidSchema);

 export default Bid;