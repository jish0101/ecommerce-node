"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextDayDate = void 0;
const getNextDayDate = (numOfDays) => {
    const today = new Date();
    const newDay = new Date(today);
    newDay.setDate(today.getDate() + numOfDays);
    return newDay;
};
exports.getNextDayDate = getNextDayDate;
//# sourceMappingURL=dates.js.map