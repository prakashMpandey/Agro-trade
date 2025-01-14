import mongoose,{Schema} from "mongoose"
const productSchema=new Schema({
    p_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    p_desc:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,

    },
    p_image:{
        type:String,
     
        default:""
    },
    p_qty:{
        type:String,
        required:true,
       
    },
    variety:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }
    ,
    quality:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    storage:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    texture:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    color:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    packaging:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    deliveryTime:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    harvestDate:{
        type:Date,
        required:true,
     
    },
    origin:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    certification:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    moisture:{
        type:Number,
        required:true,
        
    },
    organicStatus:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }

})

const Product=mongoose.model("Product",productSchema);


const auctionSchema=new Schema({

    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
        index:true
    }
    ,basePrice:{
        type:Number,
        required:true,
        min:1
    },
    farmer:{
        type:Schema.Types.ObjectId,
        ref:"User",  
        index:true
    },
    startTime:{
        type:Date,
        default:Date.now()
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum: ['active', 'completed'],
        default: 'active'
    },
    highestBid:{
        type:Number
    },
    
    highestBidder:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    totalBids:{
        type:Number,
        default:0
    }


},{timestamps:true})

auctionSchema.pre("^/find/",function(next){

    this.populate("product");
    next();
})

const Auction=mongoose.model("Auction",auctionSchema);
export default Auction;
export{ Product};