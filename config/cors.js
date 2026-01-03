export const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://dominio.com"],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Autorization"],
    credentials: true
}