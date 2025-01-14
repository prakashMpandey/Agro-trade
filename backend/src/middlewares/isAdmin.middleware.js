

import User from "../models/user.model.js";
import ApiError from "../utilities/ApiError.utils.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json(new ApiError(401, "Unauthorized request: User not found"));
        }

     
        if (user.role !== "admin") {
            return res.status(403).json(new ApiError(403, "Forbidden: Admin access required"));
        }

   
        next();
    } catch (error) {

      return res.status(500).json(new ApiError(500,error))
    }
};

export default verifyAdmin;
