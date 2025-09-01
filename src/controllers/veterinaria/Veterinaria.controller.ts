import { Request, Response } from "express";

import VeterinariaService from "../../services/veterinaria/Veterinaria.Service";
import { AuthRequest } from "../../middlewares/auth/authMiddleware";

class VeterinariaController {
  private readonly service = new VeterinariaService();

  public index = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId || 0;
        const veterinaria = await this.service.getVeterinariaByUser(userId);
        res.status(200).json(veterinaria);
    } catch (error) { 
        res.status(500).json({error:"error en el servidor"});
    }
  };

  public store = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const payload = req.body;
        payload.userId = userId;
        const veterinaria = await this.service.save(payload);
        res.status(201).json(veterinaria);   
    } catch (error) {
        res.status(500).json({error:"error en el servidor"})
    }
  };

  public update = async (req: AuthRequest, res: Response) => {
    try {
        const UserId = req.user?.userId;
        const veterinariaId = req.params.id;
        const payload = req.body;
        console.log("usuario ",UserId);
        console.log("Veterinaria ", veterinariaId);
        console.log("payload ", payload);
        
         
        
    } catch (error) {
        res.status(500).json({error:"error en el srvidor"})
    }
  };
}

export default new VeterinariaController();
