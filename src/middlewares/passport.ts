import passport from "passport";
import jwtStrategy from "./strategies/jwt";
import googleAuthStrategy from "./strategies/google";
import { PayloadUserWithID } from "@/models/user/user.model";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    done(null, user as PayloadUserWithID);
  } catch (error) {
    done(error, null);
  }
});

passport.use(jwtStrategy);
passport.use(googleAuthStrategy);

export const authenticateJwt = () =>
  passport.authenticate("jwt", { session: false });

export const authenticateGoogle = () =>
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  });

export const authGoogleCallback = () =>
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  });
