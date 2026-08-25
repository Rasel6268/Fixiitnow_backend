import bcrypt from "bcryptjs";
import MESSAGES from "../constants/messages";
import { prisma } from "../lib/prisma";
import { ILoinData, IRegistrationData } from "../types/auth.types";
import config from "../config";
import { error } from "node:console";
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
                // ...(role === "TECHNICIAN" && {
                //     technicianProfile: {
                //         create: {}
                //     }
                // })

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


        return new_user
    } catch (error) {

    }
};
const loginService = async (loginData: ILoinData) => {
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
        console.log(token);

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

    }
}


export default {
    registration,
    loginService
}