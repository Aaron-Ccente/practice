import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", UserController.getAllUsers);

// Ruta para obtener un usuario especifico
router.get("/:id", UserController.getUserById)

// Ruta para crear un usuario
// router.post("/", UserController.createUser)

// Ruta para editar informacion del usuario
// router.put("/:id", UserController.editUserInfo)

// Ruta para eliminar un usuario
// router.delete("/:id", UserController.deleteUser)

export default router