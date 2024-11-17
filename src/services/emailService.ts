import ejs from "ejs";
import path from "path";
import { KEYS } from "@/lib/keys";
import createTransporter from "./mailTransporter";
import { CustomError } from "@/lib/customError";

type SendConfirmationOtpConfig = {
  email: string;
  otpVal: number;
  subject: string;
  userName: string;
  templateDir: string[];
};

class Mailer {
  async sendConfirmationOtp(config: SendConfirmationOtpConfig) {
    const transporter = createTransporter();
    const { email, otpVal, subject, userName, templateDir } = config;

    await ejs.renderFile(
      path.resolve(__dirname, "..", "templates", ...templateDir),
      { userName, otpVal },
      async function (err, html) {
        if (err) {
          throw new CustomError("Server error", 500);
        }
        await transporter.sendMail({
          from: `"Joy" ${KEYS.EMAIL_USER}`,
          to: email,
          subject,
          html,
        });
        console.info(
          `Successfully sent an email to ${email} of type: ${templateDir.toString()}`,
        );
      },
    );
  }
}

export default Mailer;
