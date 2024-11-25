"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
exports.removeFields = removeFields;
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.asyncWrapper = asyncWrapper;
function removeFields(obj, fieldsToRemove) {
    const newObj = Object.assign({}, obj);
    fieldsToRemove.forEach((field) => {
        delete newObj[field];
    });
    return newObj;
}
//# sourceMappingURL=helpers.js.map