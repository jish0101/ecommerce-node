"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../lib/customError");
const checkRoles = (allowedRoles) => (req, res, next) => {
    const user = req.user;
    if (user && allowedRoles.includes(user.role)) {
        return next();
    }
    return next(new customError_1.CustomError("user is unauthorized", 400));
};
exports.default = checkRoles;
//# sourceMappingURL=checkRoles.js.map