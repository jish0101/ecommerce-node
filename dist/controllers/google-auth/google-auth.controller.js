"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../../lib/keys");
const tokenService_1 = __importDefault(require("../../services/tokenService"));
class GoogleAuthController {
    // async handleFailure(req: Request, res: Response) {
    //   res.redirect(`${KEYS.CLIENT_BASE_URL}/auth/failed?code=500&method=2`);
    // }
    handleSuccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return res.redirect(`${keys_1.KEYS.CLIENT_BASE_URL}/auth/login?auth=failed`);
            }
            const tokens = new tokenService_1.default();
            const user = req.user;
            const refreshToken = tokens.getToken(user, "refresh");
            user.accessToken = tokens.getToken(user, "access");
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                sameSite: keys_1.KEYS.NODE_ENV === "production" ? "none" : "lax",
                secure: keys_1.KEYS.NODE_ENV === "production",
            });
            res.redirect(`${keys_1.KEYS.CLIENT_BASE_URL}/auth/login?auth=success`);
        });
    }
}
exports.default = GoogleAuthController;
//# sourceMappingURL=google-auth.controller.js.map