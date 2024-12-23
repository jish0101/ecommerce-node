import jwt from "jsonwebtoken";
import { KEYS } from "@/lib/keys";
import { PayloadUserWithID } from "@/models/user/user.model";

type Payload = PayloadUserWithID & { accessToken?: string };
type TokenType = "access" | "refresh";

class TokenService {
  getToken(payload: Payload, t: TokenType) {
    if (t === "access") {
      return jwt.sign(payload, KEYS.JWT_SECRET, { expiresIn: "1h" });
    }
    if (t === "refresh") {
      return jwt.sign(payload, KEYS.REFRESH_SECRET, { expiresIn: "1d" });
    }
  }

  verifyToken(refresh_token: string): PayloadUserWithID {
    return jwt.verify(refresh_token, KEYS.REFRESH_SECRET) as PayloadUserWithID;
  }
}

export default TokenService;
