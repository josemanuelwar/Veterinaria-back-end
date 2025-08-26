import { Request, Response } from "express";

import VeterinariaService from "../../services/veterinaria/Veterinaria.Service";

class VeterinariaController{

    private readonly service = new VeterinariaService();

    public index = async (req:Request, res:Response)=>{

    }

    public store= async(req:Request, res:Response)=>{
        console.log(req.body);

        res.status(201).json({ message:"resa"});
        

    }

    public edit = async(req:Request, res:Response)=>{

    }

    public update = async(req:Request, res:Response)=>{

    }

}

export default new VeterinariaController();