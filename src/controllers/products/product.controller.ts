import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";

class ProductController {
  async get(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully fetched products"));
  }
  async create(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully created product"));
  }
  async update(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully updated product"));
  }
  async delete(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully deleted product"));
  }
}

export default ProductController;
