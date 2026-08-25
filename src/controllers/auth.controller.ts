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
       
    } catch (error) {
      
    }
}

export default {
  registrationController,
  loginController
};