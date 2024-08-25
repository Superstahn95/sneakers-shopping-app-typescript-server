import Cloduinary from "cloudinary";

const cloudinary = Cloduinary.v2;
cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

export default cloudinary;
