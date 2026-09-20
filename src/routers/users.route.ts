import { Router } from "express";

import authController from "../controllers/auth.controller";
import { TokenVerify } from "../middlewares/verifyToken";


const authRouter = Router();

authRouter.post("/register", authController.registrationController);
authRouter.post("/login", authController.loginController);
authRouter.get("/auth_me",TokenVerify, authController.authMeController);


export default authRouter;
