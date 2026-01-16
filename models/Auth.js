import bcrypt from "bcryptjs";
import { db } from "../database/db.js";

export default class Auth {
  static async login(email, password) {
    try {
      const query = `
        SELECT id, email, password, name, lastname, phone, age, create_at
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

  static async register(email, password) {
    try {
      const validateEmail = await this.verifyExistsEmail(email);
      if (!validateEmail.success) {
        return { ...validateEmail, codigo: 500 };
      }
      if (validateEmail.found) {
        return { ...validateEmail, codigo: 400 };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO users (email, password) VALUES (?,?)`;
      const [response] = await db.promise().query(query, [email, hashPassword]);
      if (response.affectedRows > 0) {
        return {
          success: true,
          message: "Cuenta creada con exito",
          codigo: 201,
        };
      }
    } catch (error) {
      console.error("Error al crear un nuevo usuario", error.message);
      return {
        success: false,
        message: "Error al registrar usuario",
        codigo: 500,
      };
    }
  }

  static async verifyExistsEmail(email) {
    try {
      const query = `SELECT 1 FROM users WHERE email = ?`;
      const [response] = await db.promise().query(query, [email]);
      if (response.length === 0) {
        return {
          success: true,
          found: false,
          message: "Cuenta habilitada para uso.",
        };
      }
      return {
        success: true,
        found: true,
        message: "Esta cuenta se encuentra en uso.",
      };
    } catch (error) {
      return {
        success: false,
        found: false,
        message: "Error al verificar email del usuario",
      };
    }
  }
}
