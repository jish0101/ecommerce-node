import { z } from "zod";
import idSchema from "../idSchema";
import { Request, Response } from "express";
import { CustomError } from "@/lib/customError";
import OptimisedImage from "@/services/ImageService";
import { createProductSchema } from "./productSchema";
import { paginationSchema } from "../paginationSchema";
import { IProduct, Product } from "@/models/product/product.model";
import { createResponse } from "../../lib/responseHelpers";
import { PayloadUserWithID } from "@/models/user/user.model";
import { FilterQuery } from "mongoose";

const getSchemaWithoutPagination = z.object({
  id: z.string().trim().optional().default(""),
  search: z.string().trim().optional().default(""),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
});
const getSchema = getSchemaWithoutPagination.merge(paginationSchema);

class ProductController {
  async get(req: Request, res: Response) {
    const result = getSchema.parse(req.query);
    const { id, page, limit, search, categoryId, subCategoryId } = result;

    const query: FilterQuery<IProduct> = {};

    if (categoryId) {
      query.category = categoryId;
    }

    if (subCategoryId) {
      query.subCategoryId = subCategoryId;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (id) {
      query._id = id;
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(query),
    ]);

    return res.json(
      createResponse(200, products, "Successfully fetched products", {
        page,
        limit,
        total,
      }),
    );
  }
  async create(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
    const result = createProductSchema.parse(req.body);

    const existing = await Product.findOne({ name: result.name });

    if (existing) {
      const img = new OptimisedImage();

      const prm = result.imageLinks.map((link) => {
        return img.deleteImageByLink(link, "products");
      });

      await Promise.all(prm);

      throw new CustomError("Product already exists", 400);
    }

    const product = await Product.create({
      name: result.name,
      desc: result.desc,
      price: result.price,
      stock: result.stock,
      createdBy: user._id,
      updatedBy: user._id,
      category: result.category,
      imageLinks: result.imageLinks,
    });

    return res.json(
      createResponse(200, product, "Successfully created product"),
    );
  }
  async update(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
    const result = createProductSchema.merge(idSchema).parse(req.body);

    const product = await Product.findById(result._id);

    if (!product) {
      const img = new OptimisedImage();

      if (result.imageLinks && result.imageLinks.length > 0) {
        const prm = result.imageLinks.map((link) => {
          return img.deleteImageByLink(link, "products");
        });
        await Promise.all(prm);
      }
      throw new CustomError("Product not found", 404);
    }

    if (product.imageLinks && product.imageLinks.length > 0) {
      const img = new OptimisedImage();
      product.imageLinks.forEach((link) => {
        return img.deleteImageByLink(link, "products");
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      result._id,
      {
        name: result.name,
        desc: result.desc,
        price: result.price,
        stock: result.stock,
        updatedBy: user._id,
        category: result.category,
        imageLinks: result.imageLinks,
      },
      {
        new: true,
      },
    );

    return res.json(
      createResponse(200, updatedProduct, "Successfully updated product"),
    );
  }
  async delete(req: Request, res: Response) {
    const result = idSchema.parse(req.body);

    const product = await Product.findOne({ _id: result._id });

    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    const img = new OptimisedImage();
    product.imageLinks.forEach((link) =>
      img.deleteImageByLink(link, "products"),
    );

    const deletedProduct = await Product.findByIdAndDelete(result._id);

    return res.json(
      createResponse(200, deletedProduct, "Successfully deleted product"),
    );
  }
}

export default ProductController;
