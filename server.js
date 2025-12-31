import cors from 'cors';
import express from 'express';
import { PORT } from './config/config.js';
import allRoutes from './routes/index.js'
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res)=>{
    return res.status(200).json({success: true, message: "Server run."})
})

// Rutas endpoint
app.use("/api", allRoutes)

app.listen(PORT, ()=>{
    console.log("servidor run in port:", PORT)
})