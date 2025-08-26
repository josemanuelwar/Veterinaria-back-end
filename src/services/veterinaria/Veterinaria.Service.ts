import prisma from "../../utils/prisma";

import { VeterinariaInterface } from "../interface/Veterinaria.Interface";

class VeterinariaService {
  public async get() {
    try {

        return await prisma.veterinaria.findMany();
        
    } catch (error) {
        throw error;
    }
  }

  public async getVeterinariaByUser(userId:number) {
    try {
        return await  prisma.veterinaria.findFirstOrThrow({
            where:{ userId }
        });
    } catch (error) {
        throw error;
    }
  }

  public async save(vetrinaria: VeterinariaInterface) {
    try {
      return await prisma.veterinaria.create({
        data: vetrinaria,
      });
    } catch (error) {
      throw error;
    }
  }

  public async update() {}
}

export default VeterinariaService;
