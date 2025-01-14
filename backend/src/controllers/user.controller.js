import { asyncHandler } from "../utilities/AsyncHandler.utilities.js";
import ApiError from "../utilities/ApiError.utils.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";
import User,{Contact} from "../models/user.model.js";
import  generateVerificationCode  from "../utilities/generateVerificationCode.utils.js";
import { sendResetPasswordEmail, sendVerificationEmail,sendWelcomeEmail ,sendResetPasswordSuccessfulEmail} from "../mailTrap/emailSender.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utilities/cloudinary.utils.js";
const generateJwtToken = async (userId,res) => {
  try {
    if (!userId) {
      console.log("no user id found");
    }

    const user = await User.findById(userId);

    if (!user) {
      console.log("no user found");
    }

    const accessToken = user.createAccessToken();

    console.log('access token',accessToken)
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    const options={
      httpOnly:true,
      secure:true,
      sameSite:true,
      maxAge:2*24*60*60*1000

    }

    res.cookie("accessToken",accessToken,options);
    
    
    return {  accessToken };
  } catch (error) {
    console.log("token cannot be generated");
  }
};

const registerUser = async (req, res) => {
  
  try {
    const { username, role, email, password } = req.body;
  
  
    if (
      [username, , email, password].some((field) => {
        field?.trim() === " ";
      })
    ) {
       return res.json(new ApiError(400,"all fields are required"))
       
    }
  
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
  
    if (existingUser) {
  
       return res.status(400).json(new ApiError(400,"user already exists"));
       
    }
    const verificationToken=generateVerificationCode();
  
    const user = await User.create({
      username: username,
      fullname:username,
      password: password,
      email: email,
      role: role ||"farmer",
      verificationToken:verificationToken,
      verificationTokenExpiresAt:Date.now() +24*60*60*1000  //24hrs
      ,
      lastLogin:Date.now()
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -verificationToken -verificationTokenExpiresAt"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "user cannot be created");
    }
    await generateJwtToken(createdUser._id,res);
    sendVerificationEmail(user.email,verificationToken);
     res.json(new ApiResponse(201, createdUser, "user created successfully"))
     
  } catch (error) {

    res.status(400).json({success:false,message:error.message});
    
  }
};

export const verifyEmail=async(req,res)=>{
  const {code}=req.body;
  console.log(code);
  try {
    const user=await User.findOne({
      verificationToken:code,verificationTokenExpiresAt:{$gt:Date.now()}
    }).select("-password -refreshToken")

    if(!user)
    {
      return res.status(400).json(new ApiError(400,"invalid or expired token"));

    }
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;

    await user.save({validateBeforeSave:false})

    console.log("verified email successfully")

    await sendWelcomeEmail(user.email,user.name);

    res.status(200).json(new ApiResponse(200,user,"Email Verified successfully"))
  }
   catch (error) {
   throw new ApiError(500,"internal server error")
  }
}
const loginUser = async (req, res) => {
  try {
   
    const {input, password} = req.body;

   console.log(input,password)
    
    

    const user =await User.findOne({
      $or: [{ username:input}, { email:input }],
    });

    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, "NO USER FOUND PLEASE REGISTER"));
    }

    const isPasswordCorrect = await user.verifyPassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json(new ApiError(400, "wrong password"));
    }




await generateJwtToken(user._id,res);
  user.lastLogin=Date.now();

  await user.save({validateBeforeSave:false})

  user.password=undefined;
  user.refreshToken=undefined
    return res
      .status(200)
      .json(new ApiResponse(200,user,"user logged IN successfullly"))
  } catch (error) {

    console.log(error)
    return res.status(500).json(new ApiError(500, "cannot login noww",error));
  }
};

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    console.log("user id not found");
  }

  const user = User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  if (!user) {
    console.log("refreshToken not cleared");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "user logged out successfully" });
});

const changePassword= asyncHandler(async(req,res)=>{
    try {
        const {currentPassword,newPassword}=req.body;
        const userId=req.user._id
        if(!(currentPassword||newPassword))
        {
            throw new ApiError(400,"all fields are required")
        }
        if(currentPassword===newPassword)
        {
            throw new ApiError(400,"both fields should be same")
        }
        const user=User.findById(userId);
    
        const isPasswordValid=user.verifyPassword(currentPassword);


    
        if (!isPasswordValid) {
            return res.json(new ApiError(400, "wrong password"));
          }

          user.password=newPassword;

          await user.save({validateBeforeSave:false});
    
        
    
    
        if(!user)
        {
            return res.status(500).json(new ApiError(500,"password cannot be changed"))
        }
    
    
        return res.status(200).json(new ApiResponse(200,{},"password changed successfully"))
    
    
    } catch (error) {

           return res.status(500).json(new ApiError(500,"password cannot be changed",error))
    }
})

export const addContactDetails=async(req,res)=>{

  const user=req.user;
  const{country,state,city,pinCode,phoneNo,street,landmark,addressType}=req.body
  const {countryCode}=req.body
  
  console.log(req.body)
  console.log(country,state,city,pinCode,phoneNo,street,landmark,addressType)
  if (!(country || state || city || pinCode|| street || landmark || addressType)) {
  return res.status(400).json(new ApiError(400, "At least one field is required"));
}
    
    if(!(countryCode||phoneNo))
      {
  return res.status(400).json(new ApiError(400,"mobile number is required"));
}

const contact=await Contact.create({
  userId:user._id,
  state:state ,
  city:city,
  addressType:addressType,
  pinCode:pinCode,
  "mobile.countryCode":countryCode||"+91",
  "mobile.phoneNo":phoneNo||"",
  landmark:landmark,
})

if(!contact)
{
  console.log(contact)
}

 user.contact=contact;
 await user.save({validateBeforeSave:false});


  console.log(user)
  
  

res.status(200).json(new ApiResponse(200,"details added successfully"))
  
}

export const addAvatar=async(req,res)=>{
  try {
    const avatarLocalPath=req.file?.path

    const existingAvatar=req.user.avatar;

  
    console.log(req.file);
    
    console.log(avatarLocalPath)
  
    if(!avatarLocalPath)
    {
      return res.status(400).json(new ApiError(400,"avatar file is required"))
    }
  
    const AvatarcloudinaryUrl=await uploadOnCloudinary(avatarLocalPath);
  
    if(!AvatarcloudinaryUrl)
    {
      return res.status(400).json(new ApiError(400,"file cannot be uploaded"))
    }
  
    console.log(AvatarcloudinaryUrl)
  
    const user=await User.findByIdAndUpdate(req.user._id,{$set:{avatar:AvatarcloudinaryUrl?.url||null

    }},{new:true,});


    if(existingAvatar)
    {
      await deleteOnCloudinary(existingAvatar);
    }
  
    if(!user)
    {
      return res.status(400).json(new ApiError(400,"avatar cannot be added"));
    }
  
  
    console.log(user);
  
    const avatar=user.avatar;
  
    return res.status(200).json(new ApiResponse(200,avatar,"avatar uploaded successfullly"))
  
  } catch (error) {
    return res.status(400).json(new ApiError(400,"an error occured while uploading avatar",error))
  }

}

const forgotPassword=async(req,res)=>{

 try {
   const {email}=req.body
  
   const user=await User.findOne({"email":email});
   
   if(!user)
   {
     return res.status(400).json(new ApiError(400,"no account found"))
   }

   const resetToken=await user.createAccessToken();

   console.log(resetToken);
   user.resetPasswordToken=resetToken
   user.resetPasswordTokenExpiresAt=Date.now()+1*60*60*1000

  
   await user.save({validateBeforeSave:false})


   console.log(user.resetPasswordToken);
   const resetURL=`http://localhost:5173/reset-password/${user.resetPasswordToken}`
   sendResetPasswordEmail(user.email,resetURL);

   
   res.status(200).json(new ApiResponse(200,resetURL,"reset password url sent successfully"))

 
 } catch (error) {
  return res.status(400).json(new ApiError(400,"reset link cannot be sent",error))
 }
  


}

const resetPassword=async(req,res)=>{
  try {

    console.log(req.params)
    const {token}=req.params;


    console.log("reset token:",token)
    const {password}=req.body;
  
    if(!token)
    {
      return res.status(400).json(new ApiError(400,"url is not valid"))
    }
  
    const user=await User.findOne({resetPasswordToken:token,resetPasswordTokenExpiresAt:{$gt:Date.now() }})
    console.log(user)
    
    
    if(!user)
    {
      return res.status(400).json(new ApiError(400,"cannot reset password, link expired!!"))
    }
  
    user.password=password;
    user.resetPasswordToken=undefined
    user.resetPasswordTokenExpiresAt=undefined
    await user.save({validateBeforeSave:false});

    sendResetPasswordSuccessfulEmail(user.email)
    res.status(200).json(new ApiResponse(200,"password reset successfull"))
  
  } catch (error) {
    return res.status(400).json(new ApiError(400,'password cannot be reset'))
  }
}

const isLoggedIn=async (req,res)=>{
  const userId=req.user._id;

  console.log("hello bhai")
  
  if(!userId)
  {
    return;
  }
  try {
    const user=await User.findById(userId).select("-password -refreshToken").populate("contact")
  
    console.log(user)
    if(!user)
    {
      return res.status(400).json(new ApiError(400,"user not found"))
    }
  
    res.status(200).json(new ApiResponse(200,user,"data fetched successfully"))
  } catch (error) {
    
    console.log(error)
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      country,
      state,
      phoneNo,
      pinCode,
      countryCode,
      street,
      landMark,
      dob,
      gender,
      addressType,
      firstName,
      lastName
    } = req.body;

    
    const contactUpdateData = {};
    if (country) contactUpdateData.country = country;
    if (state) contactUpdateData.state = state;
    if (street) contactUpdateData.street = street;
    if (pinCode) contactUpdateData.pinCode = pinCode;
    if (landMark) contactUpdateData.landMark = landMark;
    if (addressType) contactUpdateData.addressType = addressType;
    
   
    if (phoneNo || countryCode) {
      contactUpdateData.mobile = {
        ...(phoneNo && { phoneNo }),
        ...(countryCode && { countryCode })
      };
    }

    // Update contact if it exists and we have data to update
    if (req.user.contact && Object.keys(contactUpdateData).length > 0) {
      await Contact.findByIdAndUpdate(
        req.user.contact._id,
        { $set: contactUpdateData },
        { new: true }
      );
    }

    
    const userUpdateData = {};
    if (gender) userUpdateData.gender = gender;
    if (dob) userUpdateData.dob = dob;
    if (firstName) userUpdateData.firstName = firstName;
    if (lastName) userUpdateData.lastName = lastName;

   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userUpdateData },
      { new: true, runValidators: true }
    ).populate('contact');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating profile"
    });
  }
};

export {registerUser,loginUser,logoutUser,changePassword,forgotPassword,resetPassword,isLoggedIn,updateProfile}