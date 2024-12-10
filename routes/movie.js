const express = require("express");
const { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require("../controllers/movieController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();


// Rutas de películas
router.post("/create", createMovie, authMiddleware);          // Crear una nueva película
router.get("/", getMovies);                  // Obtener películas en cartelera
router.get("/:id", getMovieById);             // Obtener una película por ID
router.put("/:id", updateMovie, authMiddleware);       // Actualizar una película
router.delete("/:id", deleteMovie, authMiddleware);    // Eliminar una película


module.exports = router;
