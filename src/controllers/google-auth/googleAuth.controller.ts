import { KEYS } from "@/lib/keys";
import { Request, Response } from "express";
import TokenService from "@/services/tokenService";
import { PayloadUserWithID } from "@/models/user/user.model";

class GoogleAuthController {
  async handleFailure(req: Request, res: Response) {
    res.redirect(`${KEYS.CLIENT_BASE_URL}/auth/failed?code=500&method=2`);
  }

  async handleSuccess(req: Request, res: Response) {
    if (!req.user) {
      return res.redirect(
        `${KEYS.CLIENT_BASE_URL}/auth/failed?code=500&method=2`,
      );
    }

    const tokens = new TokenService();
    const user = req.user as PayloadUserWithID & { accessToken?: string };

    const refreshToken = tokens.getToken(user, "refresh");
    user.accessToken = tokens.getToken(user, "access");

    res.cookie("refresh_token", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.redirect(`${KEYS.CLIENT_BASE_URL}/auth/success`);
  }
}

export default GoogleAuthController;
