import TwilioSDK from "twilio";
import { KEYS } from "@/lib/keys";

const smsServiceInstance = () =>
  TwilioSDK(KEYS.TWILLIO_SID, KEYS.TWILLIO_AUTH_TOKEN);

class SmsService {
  service: TwilioSDK.Twilio = smsServiceInstance();

  sendSms() {}
}
