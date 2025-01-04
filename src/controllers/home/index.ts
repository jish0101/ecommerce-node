import { Request, Response } from "express";
import { createResponse } from "@/lib/responseHelpers";
import { Product } from "@/models/product/product.model";

async function getBestDeals() {
  return await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $group: {
        _id: "$category",
        categoryName: { $first: "$categoryName" },
        products: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        categoryName: 1,
        products: {
          $slice: [
            {
              $filter: {
                input: "$products",
                as: "product",
                cond: { $gte: ["$$product.offerPriceDiscount", 0] },
              },
            },
            4,
          ],
        },
      },
    },
  ]);
}

async function getHeroCarouselProducts() {
  return await Product.find().limit(4).select(["_id", "imageLinks"]);
}

class HomeController {
  async get(req: Request, res: Response) {
    const [bestDeals, heroCarousel] = await Promise.all([
      getBestDeals(),
      getHeroCarouselProducts(),
    ]);

    const data = {
      bestDeals,
      heroCarousel,
    };
    res.json(createResponse(200, data, "Successfully fetched home data"));
  }
}

export default HomeController;
