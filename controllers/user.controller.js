import User from "../models/user.js";

export default class UserController {

  // Obtiene todos los usuario
  static async getAllUsers(_, res) {
    try {
      const response = await User.getAll();
      if (!response.success) {
        console.log("Error al obtener usuarios");
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error en getAllUsers", error);
      return res
        .status(500)
        .json({ success: false, message: "Error en la funcion getAllUsers" });
    }
  }

  // Obtener usuario con id
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const response = await User.getUser(id);
      if (!response.success) {
        console.log("Error al obtener el usuario con el id:", id);
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error en funcion getUserById", error);
      return res.status(500).json({ message: "error en GetUserById" });
    }
  }

  // Funcion para crear usuarios
  static async createUser(req, res) {
    try {
      const data = req.body;
      const response = await User.create(data);
      if (!response.success) {
        return res.status(500).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      console.log("Error en la funcion createUser", error);
      return { success: false, message: "Error al crear usuario" };
    }
  }

  // Funcion para editar un usuario
  static async editUserInfo(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "id del usuario está vacio" });
      }
      const response = await User.editUserInfo(id, data);
      if (!response.success) {
        return res.status(404).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error en editUserInfo", error);
      return res
        .status(500)
        .json({
          sucess: false,
          message: "No se pudo ejecutar la funcion editUserInfo",
        });
    }
  }

  // Funcion para eliminar un usuario
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        res
          .status(404)
          .json({ success: false, message: "El campo id esta vacio" });
      const response = await User.deleteUser(id);
      if (!response.sucess) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error en deleteUser");
      return res
        .status(500)
        .json({
          sucess: false,
          message: "No se pudo ejecutar la accion correctamente",
        });
    }
  }
}
