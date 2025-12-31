import User from "../models/user.js";

export default class UserController {
  static async getAllUsers(_, res) {
    try {
      const response = await User.getAll();
      if (!response.success) {
        console.log("Error al obtener usuarios");
        return res
          .status(500)
          .json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
        console.log("Error en getAllUsers", error)
        return res.status(500).json({success: false, message: "Error en la funcion getAllUsers"})
    }
  }

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
}
