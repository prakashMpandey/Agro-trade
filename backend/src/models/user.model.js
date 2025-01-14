import mongoose,{Schema, Types} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const ContactSchema=new Schema({
    country:{
        type:String,
        lowercase:true,
        default:"india"
    },
    state:{
        type:String,
        lowercase:true
    },
    city:{
        type:String,
        lowercase:true
    },
    landMark:{
        type:String,
        lowercase:true
    },
    addressType:{
        type:String,
        lowercase:true,
        enum:["home","work","farm"]
    },
    pinCode:{
        type:String,
        minlength:5,
        maxlength: 6,
    },
    street:{
        type:String,
        lowercase:true
    }
    ,
    mobile:{
        countryCode:{
            type:String,
            minLength:1,
            maxLength:3,
            default:"+91"
            // required:true
        },
        phoneNo:{
            type:String,
            // unique:true,
            minLength:10,
            maxLength:10,

        }
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
const Contact=new mongoose.model('Contact',ContactSchema);
const userSchema= new Schema({
    username:{
        type:String,
        required:[true,"username required"],
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    firstName:{
        type:String,
        lowercase:true,
        trim:true
    },
    lastName:{
        type:String,
        lowercase:true,
        trim:true
    },
    gender:{
        type:String,
        lowercase:true,
        enum:["male","female","other"]

    },
    dob:{

        type:Date,
        
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        default:null
    },
    role:{
        type:String,
        required:true,
        enum:["farmer","business"],
        default:"farmer"
    },
    password:{
     type:String,
     required:true
    },
    contact:{
    type:Schema.Types.ObjectId,
    ref:"Contact"
   },
   refreshToken:{
    type:String
   },
   auctions:[
    {
        type:Schema.Types.ObjectId,
        ref:'Auction'
    }
   ],
   isVerified:{
    type:Boolean,
    default:false
   },
   lastLogin: Date,
   resetPasswordToken:String,
   resetPasswordTokenExpiresAt:Date,
   verificationToken:String,
   verificationTokenExpiresAt:Date
    },{timestamps:true});



      //saving password
    userSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();
        {
            this.password=await bcrypt.hash(this.password,10)
            next();

        }
    })


    //verify password
    userSchema.methods.verifyPassword=async function(password){

        const result=await bcrypt.compare(password,this.password);
        return result;
    }

    //access token
userSchema.methods.createAccessToken=function(){

    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.username

    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1day"}
)
}


//refresh token
userSchema.methods.createRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        fullname:this.fullname
       

    },process.env.REFRESH_TOKEN_SECRET,

    { expiresIn:"2d" }
)
    
}

const User=new mongoose.model("User",userSchema);


export default User;
export {Contact}