import { getInfo,searchInfo } from "../controllers/info.controller.js";
import { Router } from "express";
import {verifyToken} from "../middlewares/auth.middleware.js"

const router=Router();

router.post("/get-info/:contentId",verifyToken,getInfo)
router.post("/search",verifyToken,searchInfo);

export default router;