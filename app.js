require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");


const app = express();

// Middlewares básicos
app.use(express.json());
app.use(require("cookie-parser")());
app.use(require("cors")());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Conectar a la base de datos
connectDB();

// Inicializar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
