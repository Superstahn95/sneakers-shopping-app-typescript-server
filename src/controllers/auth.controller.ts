import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  loginUserService,
  registerUserService,
  verifyEmailService,
  verifyCodeService,
} from "../services/auth.service";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  registerUserService(req, res, next);
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loginUserService(req, res, next);
};
//directs to logic in charge of sending verification codes to emails
export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyEmailService(req, res, next);
};

//directs to logic in charge of verifying entered codes in the client
export const verifyCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyCodeService(req, res, next);
};
