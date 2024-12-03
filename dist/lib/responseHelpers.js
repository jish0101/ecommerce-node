"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(status, data, message, details, stack) {
    let res = {
        status,
        message,
    };
    if (data !== undefined) {
        res.data = data;
    }
    if (details !== undefined) {
        res.details = details;
    }
    if (stack) {
        res.stack = stack;
    }
    return res;
}
//# sourceMappingURL=responseHelpers.js.map