import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";

class UserController {
  get(req: Request, res: Response) {
    res.json(createResponse(200));
  }
}

export default UserController;
