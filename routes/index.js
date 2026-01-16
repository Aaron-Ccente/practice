import { Router } from "express";
import UserRoutes from './user.routes.js'
import AuthRoutes from './auth.routes.js'

const router = Router();

// Ruta para login de usuarios
router.use("/auth",AuthRoutes)

// Ruta para creacion de usuarios
router.use("/users", UserRoutes)

// Ruta para 

export default router