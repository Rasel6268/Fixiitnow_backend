import bcrypt from "bcryptjs";
import MESSAGES from "../constants/messages";
import { prisma } from "../lib/prisma";
import { ILoinData, IRegistrationData } from "../types/auth.types";
import config from "../config";

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
    
  } catch (error) {
    
  }
}


export default {
    registration
}