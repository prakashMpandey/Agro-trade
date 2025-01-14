import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import { asyncHandler } from "../utilities/AsyncHandler.utilities.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";
import ApiError from "../utilities/ApiError.utils.js"
import cookie from "cookie"
export const verifyToken= asyncHandler(async (req,res,next)=>{

    try{
        const token=req.cookies?.accessToken || req.header("Authentication")?.replace("Bearer ","").trim()


        if(!token)
        {
            throw new Error("token is invalid")
           
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user)
        {
            res.status(401).json(new ApiError(401,"access denied"));
        }

        req.user=user;

        next();

    }

    catch(error){

        throw new ApiError(404,error?.message||"invalid access token");
    }
}
);

export const socketAuthMiddleWare=async (socket,next)=>{

  
    const cookieHeader=socket?.handshake?.headers?.cookie
    // const token=socket.handshake.headers.cookie||(socket.handshake.headers.authentication)?.replace("Bearer","").trim();

    if(!cookieHeader)
    {
        return ;
    }
    const cookies=cookie.parse(cookieHeader)

    const token=cookies.accessToken
   

    if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

      const user=await User.findById(decodedToken._id).select("-password -refreshToken");

      if(!user)
      {
        return next(new Error("Authentication error: User not found"));
      }

      socket.user=user;

  
      next();

}

export default verifyToken;
