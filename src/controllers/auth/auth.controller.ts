import jwt from "jsonwebtoken";
import { KEYS } from "@/lib/keys";
import { Request, Response } from "express";
import { authSchema } from "./validationSchema";
import { PayloadUser, User } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import { createResponse } from "@/lib/responseHelpers";

class AuthController {
  async login(req: Request, res: Response) {
    const result = authSchema.parse(req.body);

    const user = await User.findOne({ email: result.email });

    if (!user) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const { email, userName, id, isVerified, role } = user;
    const accessToken = getToken(
      { _id: id, email, userName, isVerified, role },
      "access",
    );
    const refreshToken = getToken(
      { _id: id, email, userName, isVerified, role },
      "refresh",
    );

    const payloadUser = { email, isVerified, role, userName, accessToken };
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
    });
    res.json(createResponse(200, payloadUser, "Successfully logged-in user"));
  }

  async logout(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
      return res.json(
        createResponse(200, null, "Successfully logged-out user"),
      );
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      path: "/",
    });

    res.json(createResponse(200, null, "Successfully logged-out user"));
  }

  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const isOk = jwt.verify(
      cookies.refresh_token,
      KEYS.REFRESH_SECRET,
    ) as PayloadUser & { _id: string };

    if (!isOk) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const { _id, email, isVerified, role, userName } = isOk;

    const accessToken = getToken(
      { _id, email, isVerified, role, userName },
      "access",
    );

    res.json(
      createResponse(
        200,
        { ...isOk, accessToken },
        "Successfully updated auth status",
      ),
    );
  }
}

const getToken = (
  payload: PayloadUser & { _id: string },
  t: "access" | "refresh",
) => {
  if (t === "access") {
    return jwt.sign(payload, KEYS.JWT_SECRET, { expiresIn: "1d" });
  }
  if (t === "refresh") {
    return jwt.sign(payload, KEYS.REFRESH_SECRET, { expiresIn: "1d" });
  }
};

export default AuthController;
