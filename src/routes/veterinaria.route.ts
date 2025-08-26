import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/auth/authMiddleware';
import { checkRoles } from '../middlewares/rolesMiddleware';
import { CreatedVeterinariaDTO } from '../DTO/veterinaria/CreatedVeterinariaDTO';
import VeterinariaController from '../controllers/veterinaria/Veterinaria.controller';

export default function veterinariaRouter(): Router {
    const router = Router();

    router.post("/veterinaria/created",authMiddleware,checkRoles("admin"),validationMiddleware(CreatedVeterinariaDTO), VeterinariaController.store);

    return router;
}