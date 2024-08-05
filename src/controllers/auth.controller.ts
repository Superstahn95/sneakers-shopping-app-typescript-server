import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  loginUserService,
  registerUserService,
  verifyEmailService,
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

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyEmailService(req, res, next);
};
