import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "dotenv";
import path = require("path");
import ejs from "ejs";

config();

interface EmailOptions {
  destinationEmail: string;
  subject: string;
  template: string;
  data: { [key: string]: string };
}
const sendMail = async (options: EmailOptions) => {
  console.log(process.env.SMTP_MAIL, process.env.SMTP_PASS);
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  const { data, destinationEmail, subject, template } = options;

  //get path to email template file
  const templatePath = path.join(__dirname, "../mails", template);

  //render mail template with ejs
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: destinationEmail,
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
