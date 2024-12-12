const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Rutas
router.get("/", getUsers);                  // Obtener todos los usuarios
router.get("/:id", getUserById);             // Obtener un usuario por ID
router.put("/:id", updateUser, authMiddleware);       // Actualizar un usuario
router.delete("/:id", deleteUser, authMiddleware);    // Eliminar un usuario

module.exports = router;