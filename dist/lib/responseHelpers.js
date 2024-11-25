"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(status, data, message, details, stack) {
    let res = {
        status,
        message,
    };
    if (data) {
        res.data = data;
    }
    if (details) {
        res.details = details;
    }
    if (stack) {
        res.stack = stack;
    }
    return res;
}
//# sourceMappingURL=responseHelpers.js.map