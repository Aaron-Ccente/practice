import Auth from "../models/Auth.js";
import { Validate } from "../utils/Validate.js";

export default class AuthController {
  // funcion login
  static async login(req, res) {
    // Credenciales del usuario enviados por el body de la request
    const { email, password } = req.body;

    // Validacion basica con regex para el email y password
    const passValidate = Validate.login(email, password);

    // Validacion base - error 400 porque es falla del usuario
    if (!passValidate.valid) {
      return res.status(400).json(passValidate);
    }

    // Query a la bd con las credenciales base del usuario
    const response = await Auth.login(email, password);

    // Mensaje si en caso falla en la consulta
    if (!response.success) {
      return res.status(500).json(response);
    }

    // Mensaje de exito
    return res.status(200).json(response);
  }

  static async register(req, res) {
    const { email, password } = req.body;
    const passValidate = Validate.login(email, password);
    if (!passValidate.valid) {
      return res.status(400).json(passValidate);
    }
    const response = await Auth.register(email, password);
    const {codigo} = response;
    delete response.codigo;
    return res.status(codigo).json(response);
  }
}
