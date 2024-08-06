import { NextFunction, Request, Response } from "express";

interface AsyncErrorHandler {
  (func: (req: Request, res: Response, next: NextFunction) => Promise<any>): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

const asyncErrorHandler: AsyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

export default asyncErrorHandler;
