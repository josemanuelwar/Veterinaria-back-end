import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { CreatedUserDTO } from '../DTO/CreatedUserDTO'
import { LoginDTO } from '../DTO/LoginDTO';
import { authMiddleware } from '../middlewares/auth/authMiddleware';

export default function UserRoutes(): Router {
    const router = Router();

    router.post("/login", validationMiddleware(LoginDTO), UserController.login)

    router.post("/register_user", authMiddleware,validationMiddleware(CreatedUserDTO), UserController.store);

    return router;
}