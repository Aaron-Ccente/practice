export class Validate {
  static login(email, password) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return {
        valid: false,
        message: "Email y password son obligatorios",
      };
    }

    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: "El formato del email no es válido",
      };
    }

    if (password.length < 6) {
      return {
        valid: false,
        message: "El password debe tener al menos 6 caracteres",
      };
    }

    return {
      valid: true,
    };
  }
}
