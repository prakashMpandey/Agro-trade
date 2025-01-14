import Info from "../models/Info.model.js";
import ApiError from "../utilities/ApiError.utils.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";

export const getInfo=async(req,res)=>{
try {
    
        const {contentId}=req.params;
    
        if(!contentId)
        {
    
            return res.status(400).json(new ApiError(400,"no content id found"))
        }
    
        const content=await Info.findById(contentId);
        
        if(!content)
        {
            return res.status(404).json(new ApiError(404,"no content found"))
        }
    
        res.status(200).json(new ApiResponse(200,content,"content fetched successfully"));
} catch (error) {

    res.status(500).json(new ApiError(500,error))
    
}
}

export const searchInfo=async(req,res)=>{

    let {query,limit=10,sortBy,sortType,page=1}=req.query;

    page=Number(page);
    limit=Number(limit);

    let sort=1;
    let sortByField="title";

    if(!query)
    {
        console.log("search value not found")
    }

    if(sortBy)
    {
        sortByField=sortBy
    }
    if(sortType)
    {
        sortType="desc"?sort=-1:sort=1;
    }

    const skip=(page-1)*limit;
    
    const result=await Info.aggregate([
        {
            $match:{
                title:{$regex:query,$options:"i"}
            }
        },
        {
            $sort:{
                [sortByField]:sort
            }
        },
        {
            $skip:skip
        },
        {
            $limit:limit
        },
       
    ])

    if(!result)
    {
        return res.status(500).json(new ApiError(500,"cannot find anything"))
    }

    if(result.length===0)
    {
        return res.status(200).json(new ApiResponse(200,result,"no result found"))
    }

    
    return res.status(200).json(new ApiResponse(200,{result,"total":result.length},"results search successfully"))

}
