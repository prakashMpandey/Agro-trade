import { create } from "domain";
import Info from "../models/Info.model.js";
import ApiError from "../utilities/ApiError.utils.js";
import { ApiResponse } from "../utilities/ApiResponse.utils.js";

export const getAllInfo = async (req, res) => {
  const { category } = req.query;

  const { limit } = req.query;

  console.log(req.query);
  console.log(req.query.category);

  if (category === "all" || `${category}` === "undefined") {
    const info = limit
      ? await Info.find({}).limit(Number(limit))
      : await Info.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, info, "info fetched successfully"));
  }

  const info = await Info.find({ category: category });

  if (!info) {
    return res.status(500).json(new ApiError(500, "cannot find anything"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, info, "info fetched successfully"));
};
export const searchInfo = async (req, res) => {
  let { query, limit = 10, page = 1 } = req.query;

  console.log(req.query);

  page = Number(page);
  limit = Number(limit);

  if (!query) {
    console.log("search value not found");
  }

  const skip = (page - 1) * limit;

  const result = await Info.aggregate([
    {
      $match: {
        title: { $regex: query, $options: "i" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  if (!result) {
    return res.status(500).json(new ApiError(500, "cannot find anything"));
  }

  if (result.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "no result found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "results search successfully"));
};
