import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  createProductService,
  getProductService,
  getProductsService,
} from "../services/product.service";

export const createProductController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createProductService(req, res, next);
};

export const getProductContoller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getProductService(req, res, next);
};

export const getProductsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getProductsService(req, res, next);
};
