import { NextFunction, Request, Response } from "express";
import HttpStatus from "../constants/httpStatus";
import MESSAGES from "../constants/messages";
import jwt from 'jsonwebtoken'
import config from "../config";
import { prisma } from "../lib/prisma";

export const TokenVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.AUTH.UNAUTHORIZED
            })
        }
        const decoded = jwt.verify(
            token,
            config.jwt_secret
        ) as {
            id: string;
            role: string;
            iat: number;
            exp: number;
        };
        const user = await prisma.users.findUnique({
            where: {
                id: decoded.id,
            },
            omit: {
                password: true
            },
            include: {
                technicianProfile: true
            }
        });
        
        if(!user){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: true,
                message: MESSAGES.AUTH.UNAUTHORIZED
            })
        }
        req.user = user

       next();
    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: MESSAGES.AUTH.UNAUTHORIZED,
        })
    }

}
export default TokenVerify
