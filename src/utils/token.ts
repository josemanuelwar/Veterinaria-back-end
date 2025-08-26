import Jwt from "jsonwebtoken";

const SECRET_PRIVATE_KEY =  process.env.SECRET_KEY  || "holas";

export interface JwtPayload {
  userId: number
  email: string
  roles: any
}

export const createdToken= (payload:JwtPayload)=>{
    return Jwt.sign(payload, SECRET_PRIVATE_KEY ,{
        expiresIn: "1h",
    });
}

export const verficationToken=(token: string)=>{
    return Jwt.verify(token, SECRET_PRIVATE_KEY) as JwtPayload
}