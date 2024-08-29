import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import Product from "../models/product.model";
import cloudinary from "../config/cloudinary";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { unlink, unlinkSync } from "fs";

interface CreateProductBody {
  name: string;
  price: number;
  description: string;
  isAvailable?: boolean;
  availableSizes: number[];
}

export const getProductsService = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  }
);

export const createProductService = asyncErrorHandler(
  async (
    req: Request<{}, {}, CreateProductBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { availableSizes, description, name, price, isAvailable } = req.body;
    console.log("we just hit the create product service function");
    // should the name be unique??
    const existingProducts = await Product.findOne({ name });
    if (existingProducts) {
      const err = new BadRequestError("Product with name already exist");
      return next(err);
    }
    //isolating the different images from the files property of the request object
    const { coverImage, images } = req.files as {
      coverImage: Express.Multer.File[];
      images: Express.Multer.File[];
    };
    const coverImageFile = coverImage[0];
    console.log(coverImageFile.path);
    console.log(coverImageFile.filename);
    //upload cover image to cloudinary
    const { public_id: coverImageId, secure_url: coverImageUrl } =
      await cloudinary.uploader.upload(coverImageFile.path);
    //delete cover image
    unlink(coverImageFile.path, (err) => {
      console.log(err);
    });

    //upload images to cloudinary
    const imageUploads = await Promise.all(
      images.map(async (imageFile) => {
        try {
          const { secure_url: url, public_id } =
            await cloudinary.uploader.upload(imageFile.path);
          //delete file from server
          //  unlinkSync(imageFile.path)
          console.log("an image has been sent to cloudinary");
          return { url, public_id };
        } catch (error) {
          console.log(error);
          // run up proper server logs
        }
      })
    );
    //create new product
    const product = await Product.create({
      name,
      availableSizes,
      coverImage: {
        public_id: coverImageId,
        url: coverImageUrl,
      },
      description,
      isAvailable,
      images: imageUploads,
      price,
    });
    res.status(201).json(product);
  }
);

export const getProductService = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      const err = new NotFoundError("Product not found");
      return next(err);
    }
    res.status(200).json(product);
  }
);
