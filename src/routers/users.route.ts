import { Router } from "express";

import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  authController.registrationController
);
authRouter.post(
  "/login",
  authController.loginController
);

export default authRouter;