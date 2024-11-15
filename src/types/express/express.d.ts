import { PayloadUserWithID } from "../../models/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: PayloadUserWithID;
    }
  }
}
