import { PayloadUser } from "../../models/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: PayloadUser;
    }
  }
}
