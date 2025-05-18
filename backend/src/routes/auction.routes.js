import { Router } from "express";
import { createAuction,getAllPlacedBids,searchAuctions, getAllActiveAuctions,bidPlacer, deleteAuction, notifyHighestBid ,getAuction, myAuctionHistory, getDashboardStats, myBids} from "../controllers/auction.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware,.js";
const router=Router();

router.post("/create-auction",verifyToken,upload.single("image"),createAuction)
router.post("/place-bid/:auctionId",verifyToken,bidPlacer)
router.get("/getAllauctions",verifyToken,getAllActiveAuctions)
router.get("/deleteAuction/:auctionId",verifyToken,deleteAuction)
router.get("/notifyWinner/:auctionId",verifyToken,notifyHighestBid)
router.get("/getAuction/:auctionId",verifyToken,getAuction)
router.get("/getAllPlacedBids/:auctionId",verifyToken,getAllPlacedBids)
router.get("/myAuctions",verifyToken,myAuctionHistory)
router.get("/myBids",verifyToken,myBids)
router.get("/search",verifyToken,searchAuctions)
router.get('/dashboard-stats', verifyToken, getDashboardStats);

export default router;