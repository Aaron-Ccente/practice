import bcrypt from "bcryptjs";
import { db } from "../database/db.js";

export default class Auth {
  static async login(email, password) {
    try {
      const query = `
        SELECT id, email, password, role 
        FROM users 
        WHERE email = ?
        LIMIT 1
      `;

      const [rows] = await db.promise().query(query, [email]);

      if (rows.length === 0) {
        return {
          success: false,
          message: "Credenciales inválidas",
        };
      }

      const user = rows[0];

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return {
          success: false,
          message: "Credenciales inválidas",
        };
      }

      delete user.password;

      return {
        success: true,
        message: "Login correcto",
        data: user,
      };
    } catch (error) {
      console.error("Error en Auth.login", error);
      return {
        success: false,
        message: "Error del servidor",
      };
    }
  }
}
