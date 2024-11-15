import passport from "passport";
import { KEYS } from "@/lib/keys";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { PayloadUser, User } from "@/models/user/user.model";

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: KEYS.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);

      if (user) {
        const payloadUser: PayloadUser & { _id: string } = {
          _id: String(user._id),
          email: user.email,
          userName: user.userName,
          isVerified: user.isVerified,
          profileImage: user.profileImage,
          role: user.role,
        };
        return done(null, payloadUser);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

export const authenticateJwt = () =>
  passport.authenticate("jwt", { session: false });
