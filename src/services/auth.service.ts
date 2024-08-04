import { Request, Response, NextFunction } from "express";

export const registerUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).send("user has been created");
};

export const loginUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).send("user has been logged in");
};
