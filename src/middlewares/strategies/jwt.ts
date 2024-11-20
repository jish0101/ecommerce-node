import { KEYS } from "@/lib/keys";
import { PayloadUserWithID, User } from "@/models/user/user.model";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: KEYS.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);

    if (user) {
      const payloadUser: PayloadUserWithID = {
        _id: String(user._id),
        role: user.role,
        email: user.email,
        userType: user.userType,
        fullName: user.fullName,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      };
      return done(null, payloadUser);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

export default jwtStrategy;
