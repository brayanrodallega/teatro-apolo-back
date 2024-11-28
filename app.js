require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");


const app = express();

// Middlewares básicos
app.use(express.json());
app.use(require("cookie-parser")());


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
  
app.use(cors(corsOptions));


// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Conectar a la base de datos
connectDB();

// Inicializar el servidor
const PORT = process.env.PORT || 5000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
