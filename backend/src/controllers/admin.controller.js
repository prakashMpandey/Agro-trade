import Info from "../models/Info.model.js";
import ApiError from "../utilities/ApiError.utils.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";
import User from "../models/user.model.js";
import Auction from "../models/auction.model.js";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../utilities/cloudinary.utils.js";
import Bid from "../models/bidding.model.js";



export const addInformation = async (req, res) => {
  const { category, title, description, source, validTill, link } = req.body;
  const imageLocalPath = req.file?.path;

  console.log(imageLocalPath)

  console.log(category, title, description, source, validTill, link);

  // if(!type || !title || !description ||!source ||!validTill || !link)
  // {
  //     return res.status(400).json(new ApiError(400,"enter any data"));
  // }

  if (!imageLocalPath) {
    return res.status(400).json(new ApiError(400, "enter  image"));
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  console.log(image);
  const content = await Info.create({
    category: category,
    title: title,
    description: description,
    image: image?.url || "none",
    validTill: validTill,
    externalLink: link,
    source: source,
  });

  if (!content) {
    return res.status(500).json(new ApiError(500, "something went wrong"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, content, "content created Successfully"));
};

export const deleteInformation = async (req, res) => {
  const { contentId } = req.params;

  if (!contentId) {
    return res.status(400).json(new ApiError(400, "no content id found"));
  }

  const deletedContent = await Info.findByIdAndDelete(contentId);

  if (!deletedContent) {
    return res.status(500).json(new ApiError(500, "internal server error"));
  }

  const contentImage = deletedContent.image;

  await deleteOnCloudinary(contentImage);

  return res
    .status(200)
    .json(new ApiResponse(200, "content deleted successfully"));
};

export const updateInformation = async (req, res) => {
  const { contentId } = req.params;

  console.log(req.params);
  console.log(req.file);
  console.log(req.body);
  const { title, description, category, link, validTill } = req.body;

  if (!contentId) {
    return new ApiError(400, "no info id found");
  }

    const info = await Info.findByIdAndUpdate(
    { _id: contentId },
    {
      $set: {
        title: title,
        description: description,
        category: category,
        link: link,
        validTill: validTill,
      },
    },
    { new: true }
  );

  if (!info) {
    return res.status(500).json(new ApiError(500, "cannot update information"));
  }

  return res.status(200).json(new ApiResponse(200, "successfully updated the information"));
};

export const stats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFarmers = await User.countDocuments({ role: "farmer" });
    const totalBuyers = await User.countDocuments({ role: "business" });

    const activeAuctions = await Auction.countDocuments({
      status: "active",
      endTime: { $gt: new Date() },
    });
    const completedAuctions = await Auction.countDocuments({
      status: "completed",
    });
    const totalAuctions = await Auction.countDocuments();

    // Revenue Stats
    const auctions = await Auction.find({ status: "completed" });
    let totalRevenue = 0;
    let highestBidEver = 0;
    let averageBidAmount = 0;

    for (const auction of auctions) {
      totalRevenue += auction.highestBid;
      highestBidEver = Math.max(highestBidEver, auction.highestBid);
      averageBidAmount += auction.highestBid;
    }
    averageBidAmount =
      auctions.length > 0 ? (averageBidAmount / auctions.length).toFixed(2) : 0;

    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newUsersThisWeek = await User.countDocuments({
      createdAt: { $gte: lastWeek },
    });
    const RecentUsers = await User.find({})
      .select("username role createdAt")
      .limit(3)
      .sort({ createdAt: -1 });
    const RecentAuctions = await Auction.find({})
      .populate("product", "p_name")
      .select("basePrice status")
      .limit(3)
      .sort({ createdAt: -1 });

    const totalBids = await Bid.countDocuments();
    const activeBids = await Bid.countDocuments({
      auction: {
        $in: await Auction.find({ status: "active" }).distinct("_id"),
      },
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          users: {
            total: totalUsers,
            farmers: totalFarmers,
            business: totalBuyers,
            newUsersThisWeek,
            RecentUsers,
          },
          auctions: {
            total: totalAuctions,
            active: activeAuctions,
            completed: completedAuctions,
            successRate: ((completedAuctions / totalAuctions) * 100).toFixed(2),
            RecentAuctions,
          },
          revenue: {
            total: totalRevenue,
            highestBid: highestBidEver,
            averageBid: averageBidAmount,
          },
          bidding: {
            totalBids,
            activeBids,
            averageBidsPerAuction: (totalBids / totalAuctions).toFixed(2),
          },
        },
        "Stats fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error in stats:", error);
    return res.status(500).json(new ApiError(500, "Error fetching stats"));
  }
};

export const fetchAllUsers = async (req, res) => {
  const { page = 1, limit = 10 , filter = "all"} = req.query;

  const skip = (page - 1) * limit;


  if(filter === "all")
  {
    const users = await User.find({}).select("username createdAt role email").sort({"username":1}).skip(skip).limit(limit);
    return res.status(200).json(new ApiResponse(200, users, "users fetched successfully"));
  }
 
  
    const users = await User.find({role:filter}).select("username createdAt role email").sort({"username":1}).skip(skip).limit(limit);
  

  if (!users) {
    return res.status(500).json(new ApiError(500, "internal server error"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully"));
};

export const auctionAnalytics = async (req, res) => {
  const totalAuctions = await Auction.find({})
    .limit(10)
    .sort({ endTime: -1 })
    .select("basePrice,createdAt,highestBidder")
    .populate("product", "p_name");

  const successfulAuctions = await Auction.find({ status: "completed" })
    .limit(10)
    .sort({ endTime: -1 })
    .select("basePrice,createdAt,highestBidder")
    .populate("product", "p_name");

  if (successfulAuctions) {
    new ApiError(500, "internal server error");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalAuctions, successfulAuctions },
        "auctions fetched successfully"
      )
    );
};

export const fetchAllContent = async (req, res) => {
  try {
    const {page=1, limit=10, category="all", search=""} = req.query;
    const skip = (page-1)*limit;
    const regex = new RegExp(search, 'i');
    
    const query = category === "all" 
      ? (regex ? {title: {$regex: regex}} : {})
      : (regex ? {category, title: {$regex: regex}} : {category});

    const [content, total] = await Promise.all([
      Info.find(query)
        .select("title category description validTill source image externalLink")
        .skip(skip)
        .limit(limit),
      Info.countDocuments(query)
    ]);

    if (!content) {
      return res.status(500).json(new ApiError(500, "Internal server error"));
    }

    return res.status(200).json(new ApiResponse(200, {
      content,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }, "Content fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Error fetching content"));
  }
};

export const searchUser = async (req, res) => {
  const { username} = req.body;

  if(!username)
  {
    const users = await User.find({});
    return res.status(200).json(new ApiResponse(200, users, "user fetched successfully"));


  }

  const users = await User.find({ username });

  if (!users) {
    return res.status(500).json(new ApiError(500, "internal server error"));
  }

  return res.status(200).json(new ApiResponse(200, users, "user fetched successfully"));
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);
}

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, role,password } = req.body;

  if(!(username || email || role || password))
  {
    return res.status(400).json(new ApiError(400, "no fields provided"));
  }
  const user = await User.findByIdAndUpdate(userId, { username, email, role});

  if(!user)
  {
    return res.status(500).json(new ApiError(500, "internal server error"));
  }

  return res.status(200).json(new ApiResponse(200, user, "user updated successfully"));
}

export const getAuctionAnalytics = async (req, res) => {
  try {
    // 1. Get only required stats
    const basicStats = await Auction.aggregate([
      {
        $group: {
          _id: null,
          totalAuctions: { $sum: 1 },
          activeAuctions: {
            $sum: {
              $cond: [{ $gt: ['$endTime', new Date()] }, 1, 0]
            }
          },
          totalRevenue: {
            $sum: {
              $cond: [
                { $lt: ['$endTime', new Date()] },
                { $ifNull: ['$highestBid', '$basePrice'] },
                0
              ]
            }
          }
        }
      }
    ]);

    // 2. Get recent auctions with minimal required fields
    const recentAuctions = await Auction.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          basePrice: 1,
          highestBid: 1,
          endTime: 1,
          product: 1
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                p_name: 1,
                p_image: 1
              }
            }
          ],
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $lookup: {
          from: 'bids',
          localField: '_id',
          foreignField: 'auction',
          pipeline: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ],
          as: 'bidInfo'
        }
      },
      {
        $project: {
          basePrice: 1,
          highestBid: 1,
          'product.p_name': 1,
          'product.p_image': 1,
          status: {
            $cond: [
              { $gt: ['$endTime', new Date()] },
              'active',
              'completed'
            ]
          },
          participants: {
            $ifNull: [{ $first: '$bidInfo.count' }, 0]
          }
        }
      }
    ]);

    // 3. Get total unique participants count
    const totalParticipants = await Bid.distinct('bidder').length;

    const stats = basicStats[0] || {
      totalAuctions: 0,
      activeAuctions: 0,
      totalRevenue: 0
    };

    return res.status(200).json(new ApiResponse(200, {
      stats: {
        totalAuctions: stats.totalAuctions,
        activeAuctions: stats.activeAuctions,
        totalRevenue: stats.totalRevenue,
        totalParticipants
      },
      recentAuctions
    }, "Analytics fetched successfully"));

  } catch (error) {
    console.error('Error in getAuctionAnalytics:', error);
    return res.status(500).json(new ApiError(500, "Error fetching auction analytics"));
  }
};
