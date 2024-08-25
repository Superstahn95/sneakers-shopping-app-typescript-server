import express from "express";
import upload from "../middlewares/multer";
import { unlink } from "fs";
import path from "path";
import {
  createProductController,
  getProductContoller,
  getProductsController,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/check-image", upload.single("test"), (req, res, next) => {
  console.log("we just hit here");
  console.log(req.file);
  const localFilePath = path.join(
    __dirname,
    "../../",
    "uploads",
    req.file?.filename as string
  );
  console.log(localFilePath);
  unlink(localFilePath, (err) => {
    if (err) {
      console.log("unable to delete file from local directory");
    }
  });
  res.status(200).json({
    directory: __dirname,
    message: "file uploaded",
  });
});
router.post(
  "/create",
  upload.fields([{ name: "coverImage" }, { name: "images" }])
);

router.get("/", getProductsController);
router.get("/:id", getProductContoller);

export default router;

// const localFilePath = path.join(
//     __dirname,
//     "../..",
//     "public",
//     "upload",
//     "meal",
//     `${req.file?.filename}`
//   );
