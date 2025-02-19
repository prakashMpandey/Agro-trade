import { isObjectIdOrHexString } from "mongoose";
import Auction from "../models/auction.model.js";
import { CronJob } from "cron";
import { sendCompletionEmail, sendWinnerEmail } from "../mailTrap/emailSender.js";

export const job = (io) => {
    console.log("Cron job started");
    
    new CronJob(
        '*/10 * * * * *', 
        async () => {
            try {
           
                const auctions = await Auction.find({
                    status: 'active',  
                    endTime: { $lt: new Date() }  
                }).populate("highestBidder", "username email")
                  .populate("product", "p_name p_qty")
                  .populate("farmer", "username email");

                if (!auctions || auctions.length === 0) {
                    console.log(new Date().toLocaleTimeString(), "No auctions to be completed");
                    return;
                }

                for (const auction of auctions) {
                    
                    auction.status = "completed";
                    await auction.save();

                    
                    io.to(auction._id.toString()).emit("auctionClosed", "Auction is closed");

                 
                    if (auction.highestBidder) {
                        await sendWinnerEmail(auction);
                        await sendCompletionEmail(auction);
                    }
                

                    console.log(`Auction closed with id: ${auction._id}`);
                }

            } catch (error) {
                console.log("Error in cron job:", error);
            }
        },
        null,
        true
    );
};