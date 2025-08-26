import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth/authMiddleware";


export const checkRoles = ( ...allowed: string[])=>{

    return (req: AuthRequest, res: Response, next: NextFunction)=>{
        if(!req.user){
            return res.status(401).json({error:"usuario no autenticado"});
        }
        const roles = new Set(req.user.roles ?? []);
        const ok = allowed.some(r=>roles.has(r));
        if(!ok){
            return res.status(203).json({error:"No autorizado"});
        }
        next();
    }

}