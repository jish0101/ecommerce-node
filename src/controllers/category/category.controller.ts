import { Request, Response } from "express";
import { Category as CategoryModel } from "../../models/category/category.model";
import { createResponse } from "@/lib/responseHelpers";
import { createCategorySchema } from "./validationSchema";
import idSchema from "../idSchema";

class Category {
  async get(req: Request, res: Response) {
    const categories = await CategoryModel.find();

    res.json(
      createResponse(200, categories, "Successfully fetched categories"),
    );
  }
  async create(req: Request, res: Response) {
    const body = createCategorySchema.parse(req.body);
    const createdCategory = await CategoryModel.create(body);

    res.json(
      createResponse(200, createdCategory, "Successfully created a category"),
    );
  }
  async update(req: Request, res: Response) {
    const body = createCategorySchema.merge(idSchema).parse(req.body);

    const updatedUser = await CategoryModel.findOneAndUpdate(
      { _id: body._id },
      { name: body.name },
    );

    res.json(
      createResponse(200, updatedUser, "Successfully updated a category"),
    );
  }
  async delete(req: Request, res: Response) {
    const body = idSchema.parse(req.body);
    const deletedUser = await CategoryModel.findOneAndDelete({ _id: body._id });

    res.json(
      createResponse(200, deletedUser, "Successfully deleted a category"),
    );
  }
}

export default Category;
