import idSchema from "../idSchema";
import { Request, Response } from "express";
import { CustomError } from "@/lib/customError";
import { paginationSchema } from "../paginationSchema";
import { createResponse } from "@/lib/responseHelpers";
import { createSubCategorySchema } from "./validationSchema";
import { SubCategory as SubCategoryModel } from "../../models/sub-category/sub-category.model";

class SubCategory {
  async get(req: Request, res: Response) {
    const { page, limit } = paginationSchema.parse(req.query);
    const categories = await SubCategoryModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      createResponse(200, categories, "Successfully fetched sub-categories"),
    );
  }
  async create(req: Request, res: Response) {
    const body = createSubCategorySchema.parse(req.body);

    const existingCategory = await SubCategoryModel.findOne({ name: body.name, category: body.category });

    if (existingCategory) {
      throw new CustomError("Category already exists", 400);
    }

    const createdCategory = await SubCategoryModel.create(body);

    res.json(
      createResponse(200, createdCategory, "Successfully created a sub-category"),
    );
  }
  async update(req: Request, res: Response) {
    const body = createSubCategorySchema.merge(idSchema).parse(req.body);

    const updatedUser = await SubCategoryModel.findOneAndUpdate(
      { _id: body._id },
      { name: body.name },
      { new: true },
    ).select("-__v");

    res.json(
      createResponse(200, updatedUser, "Successfully updated a sub-category"),
    );
  }
  async delete(req: Request, res: Response) {
    const body = idSchema.parse(req.query);
    const deletedUser = await SubCategoryModel.findOneAndDelete({ _id: body._id });

    res.json(
      createResponse(200, deletedUser, "Successfully deleted a sub-category"),
    );
  }
}

export default SubCategory;