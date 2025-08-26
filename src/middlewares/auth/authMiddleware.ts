import {Request, Response, NextFunction} from "express"
import { verficationToken, JwtPayload } from "../../utils/token";
import Jwt  from "jsonwebtoken";



export interface AuthRequest extends Request{
    user?: JwtPayload
};

export const authMiddleware = (req: AuthRequest, res: Response, next:NextFunction) =>{
    const hdr = req.headers["authorization"];
    const token = hdr?.startsWith("Bearer ") ? hdr.slice(7) : undefined;

    if(!token){
        return res.status(401).json({
            error: "Token requerido (Bearer <token>)"
        });
    }

    try {
        const decoded = verficationToken(token);
        req.user = decoded;
        return next();
    } catch (err) {

        if(err instanceof Jwt.JsonWebTokenError){
            return res.status(401).json({error: "Token expirado"})
        }
        return res.status(403).json({ error: "Token invalido"});
    }

}