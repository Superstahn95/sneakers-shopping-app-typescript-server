import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { BadRequestError } from "../errors/BadRequestError";

export const parseAvailableSizes = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.availableSizes) {
      try {
        // req.body.availableSizes = JSON.parse(req.body.availableSizes);
        // req.body.availableSizes = req.body.availableSizes
        //   .map(Number)
        //   .filter((num) => !isNaN(num));
        const parsedSizes: number[] = JSON.parse(req.body.availableSizes);
        req.body.availableSizes = parsedSizes
          .map((size: any) => Number(size))
          .filter((num: number) => !isNaN(num));
      } catch (error) {
        const err = new BadRequestError("Invalid format for available sizes");
        return next(err);
        // return next(new Error("Invalid format for availableSizes"));
      }
    }

    next();
  }
);
