import { CustomError } from "@/lib/customError";
import { KEYS } from "@/lib/keys";
import { PayloadUserWithID, User } from "@/models/user/user.model";
import { Strategy as GoogleAuthStrategy } from "passport-google-oauth20";

const googleAuthStrategy = new GoogleAuthStrategy(
  {
    clientID: KEYS.GOOGLE_CLIENT_ID,
    clientSecret: KEYS.GOOGLE_CLIENT_SECRET,
    callbackURL: `${KEYS.BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  async function (request, accessToken, refreshToken, profile, done) {
    try {
      const foundEmail = profile.emails?.find((mail) => mail.verified === true);
      let found = await User.findOne({
        email: foundEmail ? foundEmail.value : "",
      }).lean();

      if (!found) {
        const user = await User.create({
          role: "USER",
          password: "",
          refreshToken: "",
          email: foundEmail ? foundEmail.value : "",
          fullName: profile.displayName,
          isVerified: foundEmail ? true : false,
          profileImage: profile.photos?.at(0)?.value ?? "",
          userType: "google",
        });

        if (!user) {
          return done(new CustomError("Server error", 500), false);
        }

        const payload: PayloadUserWithID = {
          _id: String(user._id),
          role: user.role,
          fullName: user.fullName,
          email: user.email,
          profileImage: user.profileImage,
          isVerified: user.isVerified,
          userType: user.userType,
        };

        return done(null, payload);
      }
      const payload: PayloadUserWithID = {
        _id: String(found._id),
        role: found.role,
        fullName: found.fullName,
        email: found.email,
        profileImage: found.profileImage,
        isVerified: found.isVerified,
        userType: found.userType,
      };
      return done(null, payload);
    } catch (error) {
      console.log("error => ", error);
      return done(null, false);
    }
  },
);

export default googleAuthStrategy;
