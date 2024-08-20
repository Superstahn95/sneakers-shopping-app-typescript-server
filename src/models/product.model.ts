import mongoose from "mongoose";

type Image = {
  url: string;
  public_id: string;
};
interface IProduct {
  name: string;
  description: string;
  coverImage: Image;
  availableSizes: number[];
  isAvailable: boolean;
  images: Image[];
  price: Number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is missing"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    coverImage: {
      type: Object,
      url: {
        type: String,
        required: [true, "cover image url is missing"],
      },
      public_id: {
        type: String,
        required: [true, "image reference id is missing"],
      },
    },
    availableSizes: {
      type: [Number],
      default: [],
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: [true, "image url is missing"],
          },
          public_id: {
            type: String,
            required: [true, "image reference id is missing"],
          },
        },
      ],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is missing"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
