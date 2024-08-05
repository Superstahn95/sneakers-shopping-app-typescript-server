import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import User from "../models/user.model";
import sendMail from "../utils/sendMail";

// interface EmailOptions {
//     destinationEmail: string;
//     subject: string;
//     template: string;
//     data: { [key: string]: string };
//   }
interface VerifyEmailType {
  email: string;
}

export const verifyEmailService = async (
  req: Request<{}, {}, VerifyEmailType>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  //   const emailExists = await User.findOne({ email });
  //   if (emailExists) {
  //     // throw an error
  //   }
  //create token
  const { activationCode } = createActivationDetails({ email });
  //   return res.status(200).json({
  //     activationCode,
  //     email,
  //   });

  //send email
  sendMail({
    destinationEmail: email,
    subject: "Sneakers activation code",
    template: "activation-mail.ejs",
    data: { activationCode },
  });
  res.status(200).json({
    message: `we have sent a verification code to ${email}`,
  });
};

export const registerUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    // return an error
  }
  res.status(201).send("user has been created");
};

export const loginUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send("user has been logged in");
};

const createActivationDetails = (user: VerifyEmailType) => {
  // create random 4 digit code
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  //sign it using jwt
  const activationToken = jwt.sign(
    {
      userEmail: user.email,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as string
  );

  return { activationCode, activationToken };
};
