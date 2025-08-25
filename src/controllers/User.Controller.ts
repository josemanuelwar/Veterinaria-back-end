import { Request, Response } from "express";

import UserService from "../services/User.Service";
import RolService from "../services/Rol.Service";
import generarPasswordHasheada from "../utils/PaswordHas";
import { createdToken } from "../utils/token";


class UserController {
    private readonly service = new UserService();
    private readonly serviceRol = new RolService();


    public login = async (request: Request, response: Response) => {
        try {

            const { email, password } = request.body;
            const { user, esValida } = await this.service.validarLogin(email, password);

            if (!esValida || !user) {
                return response.status(401).json({ message: 'Credenciales incorrectas' });
            }
            const token=createdToken({userId:user.id, email});
            console.log(token);
            
            response.status(200).json({ token });

        } catch (error) {
            response.status(500).json({ message: 'Error en el servidor' });
        }
    }

    public store = async (request: Request, response: Response) => {
        try {
            const { email, rol, name } = request.body;
            const { plain, hash } = await generarPasswordHasheada();

            const roles= await this.serviceRol.findName(rol);
            if(!roles){
                response.status(400).json({message:'rol no encontrado'});
                return;
            }
            
            const newUser = await this.service.Save({ email, password: hash, name,rolesUser:{
                create:{
                    roleId: roles.id
                }
            } });
            newUser.password=plain;
            response.status(201).json({
                message: 'Usuario creado correctamente',
                data: newUser,
            });
        } catch (error) {
            response.status(500).json({ message: 'Error en el servidor' });
        }
    };
}

export default new UserController();