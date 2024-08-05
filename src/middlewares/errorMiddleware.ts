import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../utils/customError";

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serialize());
  }
  res.status(500).json({ message: "something went wrong" });
};

export default globalErrorHandlerMiddleware;
