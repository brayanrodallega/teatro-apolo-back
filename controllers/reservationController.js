const Reservation = require("../models/Reservation");
const Movie = require("../models/Movie");


// Crear una reservación
exports.createReservation = async (req, res) => {
    try {
        const { title, showtimeId, userId, seats } = req.body;
        console.log(req.body);

        const movie = await Movie.findOne({ title });
        if (!movie) return res.status(404).json({ message: "Película no encontrada." });

        const showtime = movie.showtimes.id(showtimeId);
        if (!showtime) return res.status(404).json({ message: "Función no encontrada." });

        if (showtime.availableSeats < seats) return res.status(400).json({ message: "No hay suficientes asientos disponibles." });

        const date = new Date(showtime.date);

        const reservation = new Reservation({ title, date, user: userId, seats });
        console.log(reservation);
        showtime.reservations.push({ user: userId, seats });
        showtime.availableSeats -= seats;

        await movie.save();
        await reservation.save();

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reservación.", error });
    }
};

// Obtener todas las reservaciones
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
        .populate("user", "name email")
        .exec();

        res.status(200).json({
            message: "Reservas obtenidas con éxito",
            reservations
          });
        } catch (error) {
          res.status(500).json({
            message: "Error al obtener las reservas",
            error
          });
        }
};

// Obtener una reservación por ID
exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id).populate("userId", "name email").exec();
        if (!reservation) return res.status(404).json({ message: "Reservación no encontrada." });

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reservación.", error });
    }
};

// Actualizar una reservación
exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { seats } = req.body;

        const reservation = await Reservation.findByIdAndUpdate(id, { seats }, { new: true });
        if (!reservation) return res.status(404).json({ message: "Reservación no encontrada." });

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reservación.", error });
    }
};

// Eliminar una reservación
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) return res.status(404).json({ message: "Reservación no encontrada." });

        res.status(200).json({ message: "Reservación eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reservación.", error });
    }
};