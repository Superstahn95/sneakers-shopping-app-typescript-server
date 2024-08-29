import Joi, { ObjectSchema, ValidationError } from "joi";
import { NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";

export const validator = async (
  schema: Joi.ObjectSchema,
  data: Object,
  next: NextFunction
) => {
  const result = schema.validate(data);
  if (result.error) {
    const err = new BadRequestError(result.error.details[0].message);
    return next(err);
  } else {
    next();
  }
};
