import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { PORT } from './config/config.js';
import allRoutes from './routes/index.js'
import { corsOptions } from './config/cors.js';

const app = express();

// Configuracion para cors base
app.use(cors());

// Soporte para json en express
app.use(express.json());

// limite de peticiones a la api por direccion ip
// app.use(rateLimit({
//     windowMs: 15*60*100,
//     max: 10,
//     message: {
//         sucess: false,
//         message: "Demasiadas peticiones, esperar."
//     }
// }))

app.get("/", (_, res)=>{
    return res.status(200).json({success: true, message: "Server run."})
})

app.use("/api", allRoutes)

// Para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    method: req.method,
    path: req.originalUrl,
    ip: req.ip
  });
});

// Rutas endpoint

app.listen(PORT, ()=>{
    console.log("servidor run in port:", PORT)
})