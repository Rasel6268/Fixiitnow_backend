import { Request, Response } from "express";

import HttpStatus from "../constants/httpStatus";
import MESSAGES from "../constants/messages";
import authService from "../services/auth.service";

const registrationController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await authService.registration(req.body);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: MESSAGES.USER.CREATED,
      data: user,
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : MESSAGES.GENERAL.BAD_REQUEST,
    });
  }
};
const loginController = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginService(req.body);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            data: result.user,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed";
        return res.status(401).json({ success: false, message });
    }
};
const authMeController = async (req: Request, res: Response) => {
  try {
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Authenticated user",
      data: req.user,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export default {
  registrationController,
  loginController,
  authMeController
};