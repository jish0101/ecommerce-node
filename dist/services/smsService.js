"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const keys_1 = require("../lib/keys");
const smsServiceInstance = () => (0, twilio_1.default)(keys_1.KEYS.TWILLIO_SID, keys_1.KEYS.TWILLIO_AUTH_TOKEN);
class SmsService {
    constructor() {
        this.service = smsServiceInstance();
    }
    sendSms() { }
}
//# sourceMappingURL=smsService.js.map