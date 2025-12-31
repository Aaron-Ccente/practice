import { Router } from "express";
// import AuthRoutes from './auth.routes.js'
import UserRoutes from './user.routes.js'


const router = Router();

// Ruta para login de usuarios
// router.use("/login",AuthRoutes)

// Ruta para creacion de usuarios
router.use("/user", UserRoutes)

// Ruta para 

export default router