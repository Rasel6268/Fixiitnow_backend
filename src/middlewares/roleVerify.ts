import { NextFunction, Request, Response } from "express";
import { USER_ROLE, UserRole } from "../constants/role";
import HttpStatus from "../constants/httpStatus";
import MESSAGES from "../constants/messages";

export const roleVerify = async (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: MESSAGES.AUTH.UNAUTHORIZED
                })
            }
            if (!allowedRoles.includes(req.user.role as UserRole)) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    success: false,
                    message: "You do not have permission to access this resource",
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}