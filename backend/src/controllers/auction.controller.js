import { socketAuthMiddleWare } from "../middlewares/auth.middleware.js";
import Auction, { Product } from "../models/auction.model.js";
import Bid from "../models/bidding.model.js";
import ApiError from "../utilities/ApiError.utils.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.utils.js";
import User from "../models/user.model.js";
export const createAuction = async (req, res) => {
  const user = req.user;

  console.log(req.body)
  if (user.role !== "farmer" || !user.isVerified) {
    return res
      .status(403)
      .json(new ApiError(403, "Only verified farmers can create auctions"));
  }

  try {
    const { product_name, quantity, basePrice, desc,moisture,origin,organicStatus,certification,storage,
      texture,color,deliveryTime,packaging,variety,harvestDate,quality
     } = req.body;
    const p_imageLocalPath = req.file?.path;

    console.log("body:", req.body);
    console.log(req.file);
    console.log(p_imageLocalPath);
    
    if (!(product_name && quantity && basePrice && desc)) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "All fields (product_name, quantity, basePrice) are required"
          )
        );
    }

    if (!p_imageLocalPath) {
      return res.status(400).json(new ApiError(400, "no product image found"));
    }
    const p_image = await uploadOnCloudinary(p_imageLocalPath);

    if (!p_image) {
      return res.status(500).json(new ApiError(500, "something went wrong"));
    }

    const product = await Product.create({
      p_name: product_name,
      p_qty: quantity,
      p_desc: desc,
      p_image: p_image?.url || "",
      moisture,
      origin,
      organicStatus,
      certification,
      storage:storage,
      texture:texture,
      color:color[0],
      deliveryTime:deliveryTime,
      packaging,
      variety,
      harvestDate,
      quality
    });

    console.log(product);
    if (!product) {
      return res
        .status(500)
        .json(new ApiError(500, "failed to create product"));
    }

    const endTime = new Date(Date.now() + 4 * 60 * 60 * 1000);
    const newAuction = await Auction.create({
      product: product._id,
      basePrice: basePrice,
      endTime: endTime,
      farmer: req.user._id,
      highestBid: basePrice,
    });

    if (!newAuction) {
      return res.status(500).json(new ApiError(500, "failed to create auction"));
    }

    const auctionData = await newAuction.populate("product");
    return res
      .status(201)
      .json(new ApiResponse(201, auctionData, "auction created successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiError(500, "try again after sometime"));
  }
};

export const bidPlacer = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;

    if (!auctionId) {
      return res.status(400).json(new ApiError(400, "no auction id found"));
    }

    const bid = await placeBidHelper({
      userId: req.user._id,
      auctionId: auctionId,
      bidAmount: bidAmount,
    });

    if (!bid) {
      return res.status(500).json(new ApiError(500, "bid cannot be created"));
    }

    return res
      .status(201)
      .json(new ApiResponse(200, bid, "bid placed successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "something went wrong"));
  }
};

export const placeBidHelper = async ({bidAmount, auctionId, userId}) => {
  try {
    console.log("insider place bid", userId);

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return new ApiError(404, "auction not found");
    }

    if (auction.endTime <= Date.now()) {
      return new ApiError(500, "sorry auction is over");
    }

    console.log("user id", userId, "farmer id", auction.farmer);
    if (userId.toString() === auction.farmer.toString()) {
      return new ApiError(400, "khud hi khareede ga");
    }

    if (auction.highestBidder && auction.highestBidder.toString() === userId.toString()) {
      return new ApiError(400, "sabar karo ,aap jeet rhe ho ");
    }

    if (bidAmount >= 1000000) {
      return new ApiError(400, "sorry bro bid lower");
    }

    console.log(bidAmount, auctionId, userId);

    const currentBid = auction.highestBid;

    if (bidAmount <= currentBid) {
      return new ApiError(400, "higher amount is required");
    }

    var bid = await Bid.create({
      bidder: userId,
      auction: auctionId,
      bid_amount: bidAmount,
      bid_time: Date.now(),
    })

    if (!bid) {
      return new ApiError(500, "bid cannot be placed");
    }

    console.log("bid is", bid);
    auction.highestBid = bidAmount;
    auction.highestBidder = bid.bidder;
    auction.totalBids++;
    await auction.save();

  

    bid.bidder=await User.findById(bid.bidder).select("-password -refreshToken -isVerified -role -createdAt -updatedAt");

    return new ApiResponse(200,bid, "bid placed successfully");
  } catch (error) {
    console.log(error);
    return new ApiError(500, "something went wrong");
  }
};

export const auctionController = async (io) => {
  const usersInAuctions = {};
  io.use(socketAuthMiddleWare);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("connection", "you are connected");

    socket.on("disconnect", () => {
      const auctionId = socket.auctionId;

      if (auctionId && usersInAuctions[auctionId]) {
        usersInAuctions[auctionId].delete(socket.id);

        if (usersInAuctions[auctionId].size === 0) {
          delete usersInAuctions[auctionId];
        }
      }
      console.log("user disconnected");
      socket.emit("watchingUsers", {
        watchingUsers: usersInAuctions[socket.auctionId]
          ? usersInAuctions[socket.auctionId].size
          : 0
      });
    });

    socket.emit("watchingUsers", {
      watchingUsers: usersInAuctions[socket.auctionId]
        ? usersInAuctions[socket.auctionId].size
        : 0
    });

    socket.on("placeBid", async (data) => {
      try {
        const { auctionId, bidAmount } = data;
        if (!auctionId || !bidAmount) {
          socket.emit("placeBid", {
            status: 400,
            message: "Auction ID and bid amount are required"
          });
          return;
        }

        console.log("user", socket.user);

        socket.auctionId = auctionId;

        const bid = await placeBidHelper({
          bidAmount: bidAmount,
          auctionId: auctionId,
          userId: socket.user._id
        });

        if (!usersInAuctions[auctionId]) {
          usersInAuctions[auctionId] = new Set();
        }

        if (!usersInAuctions[auctionId].has(socket.id)) {
          socket.join(auctionId);
          usersInAuctions[auctionId].add(socket.id);
        }

        if (!bid || bid.status !== 200) {
          socket.emit("placeBid", {
            status: bid.status,
            message: bid.message
          });
          return;
        }

        io.in(auctionId).emit("new bid", bid);
        socket.emit("placeBid", {
          status: bid.status,
          message: bid.message,
          data: bid.data
        });

        io.in(auctionId).emit("watchingUsers", {
          watchingUsers: usersInAuctions[socket.auctionId]
            ? usersInAuctions[socket.auctionId].size
            : 0
        });
      } catch (error) {
        console.log(error);
        socket.emit("placeBid", error.message || "Error placing bid");
      }
    });
  });
};

export const getAllActiveAuctions = async (req, res) => {
  const auctions = await Auction.find({
    status:{$in:["active",-1]},
    endTime: { $gt: Date.now() }
  }).populate("product");

  if (!auctions) {
    return res.status(404).json(new ApiError(404, "no auctions found"));
  }

  if (auctions.length === 0) {
    return res.status(200).json(new ApiResponse(200, auctions, "no auctions today"));
  }

  return res.status(200).json(new ApiResponse(200, auctions, "successfully found active auctions"));
};

export const deleteAuction = async (req, res) => {
  const { auctionId } = req.params;

  if (!auctionId) {
    return res.status(400).json(new ApiError(400, "no auction id found"));
  }

  const auction = await Auction.findByIdAndDelete(auctionId);

  if (!auction) {
    return res.status(500).json(new ApiError(500, "something went wrong"));
  }

  return res.status(200).json(new ApiResponse(200, auction, "auction deleted successfully"));
};

export const notifyHighestBid = async (req, res) => {
  const { auctionId } = req.params;

  const auction = await Auction.findById(auctionId)
    .select("highestBidder highestBid")
    .populate("highestBidder");

  if (!auction) {
    return res.status(500).json(new ApiError(500, "no auction found"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        highestBid: auction.highestBid,
        highestBidder: auction.highestBidder
      },
      "highest bidder found"
    )
  );
};

export const getAuction = async (req, res) => {
  const { auctionId } = req.params;


  console.log(auctionId)
  if (!auctionId || auctionId.length!==24) {
    return res.status(400).json(new ApiError(400, "no auction id found"));
  }

  const auction = await Auction.findById(auctionId).populate("product").populate("farmer","-password -refreshToken");

  if (!auction) {
    return res.status(500).json(new ApiError(400, "no auction found"));
  }

  return res.status(200).json(new ApiResponse(200, auction, "auction fetched successfully"));
};

export const getAllPlacedBids = async (req, res) => {
  const { auctionId } = req.params;

  if (!auctionId) {
    return res.status(400).json(new ApiError(400, "no auction id found"));
  }

  const bidHistory = await Bid.find({ auction: auctionId }).populate("bidder");

  if (!bidHistory) {
    return res.status(500).json(new ApiError(500, "bid history cannot be fetched"));
  }

  if (bidHistory.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "no bids made"));
  }

  return res.status(200).json(new ApiResponse(200, bidHistory, "bids fetched successfully"));
};

export const myAuctionHistory = async (req, res) => {

  const {filter}=req.query;

  console.log(filter)


  var searchQuery={}

  if(filter!=="all" )
  {
    if(filter==="won auctions")
    {
      searchQuery.highestBidder=req.user._id
    }
   else{
    searchQuery.farmer=req.user._id
    searchQuery.status=filter;
   }
  }

  

  console.log("searchQuery",searchQuery)
  const myAuctions = await Auction.find({$and:[searchQuery ]}).populate("highestBidder","username").populate("product","p_qty p_desc p_name p_image p_image").sort({"createdAt":-1});


  console.log("myAuctions",myAuctions)
  if (!myAuctions) {
    return res.status(500).json(new ApiError(500, "history cannot be fetched"));
  }

  if (myAuctions.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "auctions fetched successfully"));
  }

  return res.status(200).json(new ApiResponse(200, myAuctions, "auctions fetched successfully"));
};

export const myBids = async (req, res) => {
  try {
  
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchQuery={bidder:req.user._id}

    const bids = await Bid.find({ bidder: searchQuery.bidder})
      .populate([
        {
          path: 'auction',
          populate: [
            { path: 'product' },
            { path: 'farmer', select: 'username' }
          ]
        }
      ])
      .sort({ bid_time: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);


     


    // Get total count for pagination
    const total = await Bid.countDocuments({ bidder: req.user._id });
    const hasMore = total > skip + bids.length;

    return res.status(200).json({
      data: bids,
      hasMore,
      total
    });
  } catch (error) {
    console.error('Error in myBids:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch bids',
      error: error.message 
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const now = Date.now();
    const userId = req.user._id;

    const totalAuctions = await Auction.countDocuments({ farmer: userId });

    const activeAuctionIds = await Auction.find({ 
      endTime: { $gt: now } 
    }).distinct('_id');

    const ongoingBids = await Bid.countDocuments({
      auction: { $in: activeAuctionIds }
    });
    
     console.log(ongoingBids);

    const activeAuctions = await Auction.countDocuments({ 
      farmer: userId,
      endTime: { $gt: new Date() }
    });

    const totalBids = await Bid.countDocuments({

      bidder:userId
    });


    const wonAuctions = await Auction.countDocuments({
      highestBidder: userId,
      endTime: { $lt: new Date() }
    });


    return res.status(200).json({
      success: true,
      data: {
        totalAuctions,
        activeAuctions,
        totalBids,
        wonAuctions,
        ongoingBids

      }
    });

  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching dashboard stats"
    });
  }
};

