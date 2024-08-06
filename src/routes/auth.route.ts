import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  verifyEmailController,
  verifyCodeController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/verify-email", verifyEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/verify-code", verifyCodeController);

export default router;
