import Info from "../models/Info.model.js";
import ApiError from "../utilities/ApiError.utils.js";
import {ApiResponse} from "../utilities/ApiResponse.utils.js";
import User from "../models/user.model.js";
import Auction from "../models/auction.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utilities/cloudinary.utils.js";

export const addInformation =async(req,res)=>
    {


    const {type,title,description}=req.body;
    console.log(req.body)
    const imageLocalPath=req.file?.path;


    if(!type || !title || !description )
    {
        return res.status(400).json(new ApiError(400,"enter any data"));
    }

    if(!imageLocalPath)
    {
        return res.status(400).json(new ApiError(400,"enter  image"));
    }
    
    const image=await uploadOnCloudinary(imageLocalPath);

    console.log(image)
const content=await Info.create({
    type:type,
    title:title,
    description:description,
    image:image?.url || ""

})


if(!content)
{
    return res.status(500).json(new ApiError(500,"something went wrong"))
}


return res.status(201).json(new ApiResponse(201,content,"content created Successfully"))
      
    
}

export const deleteInformation=async(req,res)=>{

    const {contentId}=req.body;

    if(!contentId)
    {
        return res.status(400).json(new ApiError(400,"no content id found"))
    }

    const deletedContent=await Info.findByIdAndDelete(contentId);

    if(!deletedContent)
    {
        return res.status(500).json(new ApiError(500,"internal server error"))
    }

    const contentImage=deletedContent.image;

   await deleteOnCloudinary(contentImage);

   return res.status(200).json(new ApiResponse(200,"content deleted successfully"));

}

// const updateInformation=async(req,res)=>{

// }


export const auctionAnalytics=async(req,res)=>{

    const totalAuctions=await Auction.countDocuments({});
    const successfulAuctions=await Auction.countDocuments({status:1})


    if(successfulAuctions)
    {
        new ApiError(500,"internal server error")
    }


    return res.status(200).json(new ApiResponse(200,{totalAuctions,successfulAuctions},"auctions fetched successfully"))
}

export const fetchAllContent=async(req,res)=>{

    const content=await Info.find();

    if(!content)
    {
        return res.status(500).json(new ApiError("internal server error"));
    }
    if(content.length==0 )
    {
        return res.status(200).json(new ApiResponse(200,{},"no content available"));
    }

    return res.status(200).json(new ApiResponse(200,content,"content fetched successfully"));
}

