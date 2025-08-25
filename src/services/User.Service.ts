import { log } from "console";
import prisma from "../utils/prisma";
import verificarPassword from "../utils/verificarPassword";
import { userInterface } from  "./interface/User.Interface";
class UserService {

    public async validarLogin(email: string, password: string) {
        let esValida = false;
        const user = await prisma.user.findUnique({
            where: { email },
            select: { password: true, id: true, email:true }
        });

        if (!user) {
            return {user, esValida};
        }

        esValida = await verificarPassword(password, user.password);
        return {user, esValida};
    }

    public async findEmail(email: string) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email
                },
                select: {
                    email: true,
                    password: true,
                }
            });

        } catch (error) {
            throw error;
        }
    }

    public async Save(user: userInterface) {
        try {
            return await prisma.user.create({
                data:user
            });

        } catch (error) {
            throw error;
        }
    }


}


export default UserService;