export const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://dominio.com", "http://localhost:3000/"],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
}