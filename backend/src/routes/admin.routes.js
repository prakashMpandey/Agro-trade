import { addInformation, auctionAnalytics } from "../controllers/admin.controller.js";
import { deleteInformation } from "../controllers/admin.controller.js";
import { fetchAllContent } from "../controllers/admin.controller.js";


import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import verifyAdmin  from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware,.js";

const router=Router();

router.post("/add-content",verifyToken,verifyAdmin,upload.single("image"),addInformation);
router.post("/delete-content",verifyToken,verifyAdmin,deleteInformation);
router.get("/get-content",verifyToken,verifyAdmin,fetchAllContent);
router.post("/auction-analytics",verifyToken,verifyAdmin,auctionAnalytics);

export default router;