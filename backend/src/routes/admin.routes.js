import { addInformation, auctionAnalytics,stats,fetchAllUsers } from "../controllers/admin.controller.js";
import { deleteInformation } from "../controllers/admin.controller.js";
import { fetchAllContent } from "../controllers/admin.controller.js";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import verifyAdmin  from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware,.js";
import { searchUser,deleteUser,updateUser } from "../controllers/admin.controller.js";
import { getAuctionAnalytics } from "../controllers/admin.controller.js";
import { updateInformation } from "../controllers/admin.controller.js";
const router=Router();

router.post("/create-info",verifyToken,verifyAdmin,upload.single("image"),addInformation);
router.delete("/delete-info/:contentId",verifyToken,verifyAdmin,deleteInformation);
router.get("/information-analytics",verifyToken,verifyAdmin,fetchAllContent);
router.patch("/update-info/:contentId", verifyToken, verifyAdmin, upload.single("image"), updateInformation);
router.get("/stats",verifyToken,verifyAdmin,stats);
router.get("/user-analytics",verifyToken,verifyAdmin,fetchAllUsers);
router.post("/search-user",verifyToken,verifyAdmin,searchUser);
router.delete("/delete-user/:userId",verifyToken,verifyAdmin,deleteUser);
router.put("/update-user/:userId",verifyToken,verifyAdmin,updateUser);
router.get('/auction-analytics', verifyToken, getAuctionAnalytics);

export default router;