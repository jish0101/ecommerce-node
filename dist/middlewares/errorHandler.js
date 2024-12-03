"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../lib/customError");
const responseHelpers_1 = require("../lib/responseHelpers");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res
            .status(400)
            .json((0, responseHelpers_1.createResponse)(400, err.issues, "Validation Error"));
    }
    const statusCode = err instanceof customError_1.CustomError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    const details = err instanceof customError_1.CustomError && err.details;
    const data = err instanceof customError_1.CustomError && err.data;
    res
        .status(statusCode)
        .json((0, responseHelpers_1.createResponse)(statusCode, data, message, details));
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map