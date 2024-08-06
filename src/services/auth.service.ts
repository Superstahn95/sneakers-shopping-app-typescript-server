import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ejs from "ejs";
import path from "path";
import User from "../models/user.model";
import sendMail from "../utils/sendMail";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { BadRequestError } from "../errors/BadRequestError";
import { CustomError } from "../utils/customError";

interface VerifyEmailType {
  email: string;
}
interface VerifyCodeType {
  activationCode: string;
  activationToken: string;
  email: string;
}

export const verifyEmailService = asyncErrorHandler(
  async (
    req: Request<{}, {}, VerifyEmailType>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new BadRequestError("user with this email already exists");
      return next(err);
    }
    const { activationCode } = createActivationDetails({ email });
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
  }
);

export const registerUserService = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, mobileNumber } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      const err = new BadRequestError("user with this email already exists");
      return next(err);
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json({
      message: "registration successful",
      user,
    });
  }
);

export const loginUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const err = new BadRequestError("Invalid credentials");
    return next(err);
  }
  //compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const err = new BadRequestError("invalid credentials");
    return next(err);
  }
  // send back user to client for now
  res.status(200).json({
    message: "log in successful",
    user,
  });
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
    process.env.ACTIVATION_SECRET as string,
    {
      expiresIn: "5m",
    }
  );

  return { activationCode, activationToken };
};

export const verifyCodeService = asyncErrorHandler(
  async (
    req: Request<{}, {}, VerifyCodeType>,
    res: Response,
    next: NextFunction
  ) => {
    const { activationCode, activationToken, email } = req.body;
    // const decodedToken = jwt.verify(activationToken, process.env.ACTIVATION_SECRET as string)
    const decodedToken = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET as string
    ) as jwt.JwtPayload;
    //handle token expiry error with a custom error class
    if (!decodedToken) {
      const err = new BadRequestError("unauthorized");
      return next(err);
    }
    if (decodedToken.activationCode !== activationCode) {
      const err = new BadRequestError("invalid activation code");
      return next(err);
    }
    if (decodedToken.userEmail !== email) {
      const err = new BadRequestError("code not assigned to you");
      return next(err);
    }
    //send back a success message to client
    res.status(200).json({
      message: "email verified successfully",
    });
  }
);
