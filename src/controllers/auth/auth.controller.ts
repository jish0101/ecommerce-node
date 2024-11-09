import { createResponse } from "@/lib/responseHelpers";
import { Request, Response } from "express";

class AuthController {
  async login(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully logged-in user"));
  }
  async logout(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully logged-out user"));
  }
  async refreshToken(req: Request, res: Response) {
    res.json(createResponse(200, null, "Successfully updated auth status"));
  }
}
export default AuthController;
