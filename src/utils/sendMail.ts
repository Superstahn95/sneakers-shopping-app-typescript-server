import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";

config();
const sendMail = (from: string, to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //return an error here
      console.log(error);
    } else {
      console.log("email has been sent to intended destination");
    }
  });
};

export default sendMail;
