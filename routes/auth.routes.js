import { Router } from "express";
import AuthController from '../controllers/auth.controller.js'
const router = Router();

// Ruta para auth - Login
router.post("/", AuthController.login)

// Ruta para register
router.post("/register", AuthController.register)

export default router;