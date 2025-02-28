import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD, 
    api_key:process.env.CLOUDINARY_API_SECRET, 
    api_secret:process.env.CLOUDINARY_API_KEY
});

export const uploadOnCloudinary=async function(localFilePath) {
try {
    
        const uploadOptions={
            resource_type:"image",
            timeout:100000
        }
    
         const response = await cloudinary.uploader
           .upload(
               localFilePath, {
                uploadOptions
                  
               })

               if(!response)
               {
                console.log("file cannot be uploaded")
               }

        
        console.log(response);

        fs.unlinkSync(localFilePath);
        
        return response;

} catch (error) {

    return error
}
finally
{
    fs.unlinkSync(localFilePath);
        
}
   
};


export const deleteOnCloudinary= async(publicURL) =>{
    try {
            const publicId = publicURL.split("/").pop().split(".")[0];
            console.log(publicId)
            const response =await cloudinary.uploader.destroy(publicId, (result)=>{ console.log(result) });
            return response

    } catch (error) {
        return error
    }
    
    }