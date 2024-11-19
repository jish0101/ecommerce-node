import { KEYS } from "@/lib/keys";
import { PayloadUserWithID } from "@/models/user/user.model";
import { Strategy as GoogleAuthStrategy } from "passport-google-oauth20";

const googleAuthStrategy = new GoogleAuthStrategy(
  {
    clientID: KEYS.GOOGLE_CLIENT_ID,
    clientSecret: KEYS.GOOGLE_CLIENT_SECRET,
    callbackURL: `${KEYS.BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    const foundEmail = profile.emails?.find((mail) => mail.verified === true);
    const payload: PayloadUserWithID = {
      role: "USER",
      _id: profile.id,
      userName: profile.username ?? "",
      email: foundEmail ? foundEmail.value : "",
      profileImage: profile.photos?.at(0)?.value ?? "",
      isVerified: foundEmail ? foundEmail.verified : false,
    };
    return done(null, payload);
  },
);

export default googleAuthStrategy;
