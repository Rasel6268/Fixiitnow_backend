import bcrypt from "bcryptjs";
import MESSAGES from "../constants/messages";
import { prisma } from "../lib/prisma";
import { ILoginData, IRegistrationData } from "../types/auth.types";
import config from "../config";
import jwt from "jsonwebtoken";
const registration = async (userData: IRegistrationData) => {
    try {
        const { name, email, password, phone, role, } = userData
        const isUserExist = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (isUserExist) {
            throw new Error(MESSAGES.AUTH.EMAIL_ALREADY_EXISTS)
        }
        const hasedPassword = await bcrypt.hash(password, Number(config.salt))
        const new_user = await prisma.users.create({
            data: {
                name,
                email,
                password: hasedPassword,
                phone,
                role,
            },
            omit: {
                password: true
            },
            include: {
                technicianProfile: true,
            },
        })
        if (role === "TECHNICIAN") {
            await prisma.technicianProfile.create({
                data: {
                    user_id: new_user.id,
                },
            });
        }
        const userWithProfile = await prisma.users.findUnique({
            where: {
                id: new_user.id,
                email: new_user.email
            },
            omit: { password: true },
            include: {
                technicianProfile: true
            }
        })


        return userWithProfile
    } catch (error) {
       throw error;
    }
};
const loginService = async (loginData: ILoginData) => {
    try {
        const { email, password } = loginData

        const user = await prisma.users.findUnique({
            where: {
                email
            },
            include: {
                technicianProfile: true
            }
        })

        if (!user) {
            throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS)
        }
        const compairePass = await bcrypt.compare(password, user.password)

        if (!compairePass) {
            throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS)
        }
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            config.jwt_secret,
            {
                expiresIn: "7d",
            }
        );
    
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        };
    } catch (error) {
       throw (error)
    }
}
export default {
    registration,
    loginService,
    
    
}