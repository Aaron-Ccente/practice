import { db } from "../database/db.js";

export default class User {
  // Funcion modelo User para obtener todos los usuarios
  static async getAll() {
    try {
      const query = `SELECT name, lastname, email, phone, age FROM users`;
      const [response] = await db.promise().query(query);
      if (response.length === 0) {
        return {
          success: true,
          message: "No hay datos en la tabla de usuarios.",
        };
      }
      return {
        success: true,
        message: "Usuario obtenidos con éxito",
        data: response,
      };
    } catch (error) {
      console.log("Error en getAll del modelo User", error);
      return { success: false, message: "Error al obtener los datos" };
    }
  }

  //   Funcion del modelo User para obtener un usuario segun ID
  static async getUser(id) {
    try {
      const id_user = id;
      const query = `SELECT name, lastname, email, phone, age FROM users WHERE users.id = ?`;
      const [response] = await db.promise().query(query, [id_user]);
      console.log(response);
      if (response.length === 0) {
        return {
          success: true,
          message: "Usuario no encontrado",
        };
      }
      return {
        success: true,
        message: "Usuario obtenido correctamente",
        data: response,
      };
    } catch (error) {
      console.log("Error en getUser del modelo Usuario", error.message);
      return { success: false, message: "Error en getUser" };
    }
  }

  // Funcion del model User para crear usuarios
  static async create(data) {
    try {
      const { name, lastname, email, phone, age } = data;
      const query = `INSERT INTO users (name, lastname, email, phone, age) VALUES (?,?,?,?,?);`;
      const [response] = await db
        .promise()
        .query(query, [name, lastname, email, phone, age]);
      if (response.affectedRows<1) {
        return {
          success: false,
          message: "No se pudo crear el usuario",
        };
      }
      return { success: true, message: "Usuario creado correctamente" };
    } catch (error) {
      console.log("Error en create del modelo User", error.message);
      return { success: false, message: "Error del servidor." };
    }
  }

  // Funcion del modelo User para editar un usuario
  static async editUserInfo(id, data){
    try {
      const {name, lastname, email, phone, age} = data;
      const values = [name, lastname, email, phone ,age, id];
      const query = `UPDATE users SET name = ?, lastname = ?, email = ?, phone = ?, age = ? WHERE id = ?`;
      const [response] = await db.promise().query(query, values)
      if(response.affectedRows<1) {
        return {success: false, message: "No se actualizo ningun usuario."}
      }
      return {success: true, message: "Usuario actualizado correctamente"};
    } catch (error) {
      console.log("Error en editUserinfo", error)
      return {success: false, message: "Usuario no existe o no puede actualizarse"};
    }
  }

  // Funcion del modelo User para eliminar usuarios
  static async deleteUser(id){
    try {
      const query = `DELETE FROM users WHERE id = ?`;
      const [response] = await db.promise().query(query, [id]);
      if(response.affectedRows<1){
        return {sucess: false, message: "No se pudo eliminar el usuario."}
      }
      return {sucess: true, message: "Usuario eliminado correctamente"};
    } catch (error) {
      console.log("Error en deleteUser", error)
      return {sucess: false, message: "Usuario no existe o no puede actualizarse."}
    }
  }
}
