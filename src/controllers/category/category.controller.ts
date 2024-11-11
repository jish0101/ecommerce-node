import { createResponse } from "@/lib/responseHelpers";
import express, { Request, Response } from "express";

class Category {
  async get(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully fetched categories"));
  }
  async create(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully created a category"));
  }
  async update(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully updated a category"));
  }
  async delete(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully deleted a category"));
  }
}

export default Category;
