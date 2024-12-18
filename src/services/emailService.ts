import ejs from "ejs";
import path from "path";
import { KEYS } from "@/lib/keys";
import createTransporter from "./mailTransporter";
import { CustomError } from "@/lib/customError";
import { OtpAction } from "@/models/otp/Otp";

type SendConfirmationOtpConfig = {
  email: string;
  otpVal: number;
  type: OtpAction;
  userName: string;
};

const otpTypeSubjectMap: Record<OtpAction, string> = {
  "EMAIL VERIFICATION": "Email verification information",
  "FORGOT PASSWORD": "Password reset information",
};

const templateDir: Record<OtpAction, string[]> = {
  "EMAIL VERIFICATION": ["otp-templates", "otp.ejs"],
  "FORGOT PASSWORD": ["otp-templates", "otp.ejs"],
};

class Mailer {
  async sendConfirmationOtp(
    config: SendConfirmationOtpConfig,
  ): Promise<boolean> {
    const transporter = createTransporter();
    const { email, otpVal, userName, type } = config;

    const html = await new Promise<string>((resolve, reject) => {
      ejs.renderFile(
        path.resolve(__dirname, "..", "templates", ...templateDir[type]),
        { userName, otpVal },
        (err, renderedHtml) => {
          if (err) {
            reject(
              new CustomError(`Template rendering error: ${err.message}`, 500),
            );
          } else {
            resolve(renderedHtml);
          }
        },
      );
    });

    const sentMail = await transporter.sendMail({
      from: `"Joy" <${KEYS.EMAIL_USER}>`,
      to: email,
      subject: otpTypeSubjectMap[type],
      html,
    });

    console.info(`Successfully sent an email to ${email} of type: ${type}`);
    return !!sentMail;
  }
}

export default Mailer;
