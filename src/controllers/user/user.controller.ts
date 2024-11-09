import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";

class UserController {
  async get(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully fetched users"));
  }
  async create(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully created user"));
  }
  async update(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully updated user"));
  }
  async delete(req: Request, res: Response) {
    res.json(createResponse(200, [], "Successfully deleted user"));
  }
}

export default UserController;
