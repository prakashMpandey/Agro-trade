import {searchInfo,getAllInfo } from "../controllers/info.controller.js";
import { Router } from "express";
import {verifyToken} from "../middlewares/auth.middleware.js"

const router=Router();

router.get("/get-all",verifyToken,getAllInfo);
router.post("/search",verifyToken,searchInfo);

export default router;