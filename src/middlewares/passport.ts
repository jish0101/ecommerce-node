import passport from "passport";
import jwtStrategy from "./strategies/jwt";
import googleAuthStrategy from "./strategies/google";

passport.use(jwtStrategy);
passport.use(googleAuthStrategy);

export const authenticateJwt = () =>
  passport.authenticate("jwt", { session: false });

export const authenticateGoogle = () =>
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  });

export const authGoogleCallback = () =>
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login?auth=failed",
  });

export default passport;
