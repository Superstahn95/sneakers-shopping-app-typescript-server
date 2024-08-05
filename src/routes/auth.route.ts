import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  verifyEmailController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/verify-email", verifyEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;
