import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/"); //temporary storage
    console.log("temporarily uploaded...");
  },
  filename: (req, file, callback) => {
    // console.log(file);
    //generate random name
    console.log(Date.now() + path.extname(file.originalname));
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    // make sure only images are uploaded
    if (file.mimetype === "image/png") {
      console.log("we got a png here");
      callback(null, true);
    }
  },
});

export default upload;
