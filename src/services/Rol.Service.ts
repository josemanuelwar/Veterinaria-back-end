import prisma from "../utils/prisma";

class RolService {

    public async findName(name: string) {
        try {
            return await prisma.role.findFirst({
                where: {
                    name
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

export default RolService;