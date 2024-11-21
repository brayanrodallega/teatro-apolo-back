const express = require("express");
const { createMovie, getMovies, reserveMovie, getMovieById } = require("../controllers/movieController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Rutas
router.post("/create", createMovie);          // Crear una nueva película
router.get("/", getMovies);                  // Obtener películas en cartelera
router.get("/:id", getMovieById);             // Obtener una película por ID
router.post("/reserve/:id", authMiddleware, reserveMovie); // Reservar boletos

module.exports = router;
