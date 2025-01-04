import { Request, Response } from "express";
import { createResponse } from "@/lib/responseHelpers";
import { paginationSchema } from "../paginationSchema";
import { z } from "zod";
import { Coupon, ICouponDocument } from "@/models/coupon";
import { FilterQuery } from "mongoose";
import { createSchema } from "./schema";
import idSchema from "../idSchema";

const getSchema = paginationSchema.merge(
  z.object({ couponId: z.string().optional() }),
);

class CouponController {
  async get(req: Request, res: Response) {
    const { page, limit, couponId } = getSchema.parse(req.query);

    const query: FilterQuery<ICouponDocument> = {};

    if (couponId) {
      query._id = couponId;
    }

    const total = await Coupon.countDocuments(query);
    const data = await Coupon.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      createResponse(200, data, "Coupon fetched successfully", {
        page,
        limit,
        total,
      }),
    );
  }
  async create(req: Request, res: Response) {
    const result = createSchema.parse(req.body);

    const existingCoupon = await Coupon.findOne({ name: result.name });

    if (existingCoupon) {
      return res.json(createResponse(400, null, "Coupon already exists"));
    }

    const createdCoupon = await Coupon.create({
      name: result.name,
      expiry: result.expiry,
      maxDiscount: result.maxDiscount,
      minOrderValue: result.minOrderValue,
      discountPercent: result.discountPercent,
    });

    res.json(createResponse(200, createdCoupon, "Coupon created successfully"));
  }
  async update(req: Request, res: Response) {
    const result = idSchema.merge(createSchema).parse(req.body);

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      result._id,
      {
        name: result.name,
        expiry: result.expiry,
        maxDiscount: result.maxDiscount,
        minOrderValue: result.minOrderValue,
        discountPercent: result.discountPercent,
      },
      { new: true },
    );

    res.json(createResponse(200, updatedCoupon, "Coupon updated successfully"));
  }
  async delete(req: Request, res: Response) {
    const { _id } = idSchema.parse(req.query);

    const result = await Coupon.findByIdAndDelete(_id);

    res.json(createResponse(200, !!result, "Coupon deleted successfully"));
  }
}

export default CouponController;
