const express = require("express");
const { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } = require("../controllers/reservationController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Rutas
router.post("/reserve", createReservation, authMiddleware);          // Reservar una película
router.get("/", getReservations);                  // Obtener todas las reservaciones
router.get("/:id", getReservationById);             // Obtener una reservación por ID
router.put("/:id", updateReservation, authMiddleware);       // Actualizar una reservación
router.delete("/:id", deleteReservation, authMiddleware);    // Eliminar una reservación

module.exports = router;