import { createResponse } from "@/lib/responseHelpers";
import { PayloadUserWithID } from "@/models/user/user.model";
import TokenService from "@/services/tokenService";
import { Request, Response } from "express";

class GoogleAuthController {
  async handleFailure(req: Request, res: Response) {
    res.json(
      createResponse(500, null, "Server error: failed to login with google"),
    );
  }

  async handleSuccess(req: Request, res: Response) {
    if (!req.user) {
      return res
        .status(400)
        .json(createResponse(400, null, "Failed to login with google"));
    }

    const tokens = new TokenService();
    const user = req.user as PayloadUserWithID;
    const accessToken = tokens.getToken(user, "access");
    const refreshToken = tokens.getToken(user, "refresh");

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
    });

    res.json(
      createResponse(200, { ...user, accessToken }, "Successfully logged in"),
    );
  }
}

export default GoogleAuthController;
