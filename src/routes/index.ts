import { Router } from 'express';
import userRoutes from './user.route';
import veterinariaRouter from './veterinaria.route';

export default function routerApi(): Router{
    const router = Router();
    router.use(userRoutes());
    router.use(veterinariaRouter());
    
    return router;
}