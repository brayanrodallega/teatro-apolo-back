const Movie = require("../models/Movie");
const User = require("../models/User");

// Crear una película
exports.createMovie = async (req, res) => {
    try {
        const { title, description, image, showtimes } = req.body;

        const movie = new Movie({ title, description, image, showtimes });
        await movie.save();

        res.status(201).json({ message: "Película creada exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la película.", error });
    }
};

// Obtener todas las películas
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las películas.", error });
    }
};

// Obtener una película por ID
exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada." });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la película.", error });
    }
};

// Actualizar una película
exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, showtimes } = req.body;

        const movie = await Movie.findByIdAndUpdate(id, { title, description, image, showtimes }, { new: true });
        if (!movie) return res.status(404).json({ message: "Película no encontrada." });

        res.status(200).json({ message: "Película actualizada exitosamente." });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la película.", error });
    }
};

// Eliminar una película
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada." });

        res.status(200).json({ message: "Película eliminada exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la película.", error });
    }
};


// Reservar boletos para una película
exports.reserveMovie = async (req, res) => {

    const user = await User.findById(req.user.id);
        if (!user.isActive) {
        return res.status(403).json({ message: "Tu cuenta no está activa. Por favor, contacta con el soporte." });
    }

    try {
        const { id } = req.params;
        const { showtimeId, seats } = req.body; // showtimeId es el ID del horario específico
        const userId = req.user.id;

        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada." });

        const showtime = movie.showtimes.id(showtimeId);
        if (!showtime) return res.status(404).json({ message: "Horario no encontrado." });

        if (showtime.availableSeats < seats) {
        return res.status(400).json({ message: "No hay suficientes asientos disponibles." });
        }

        // Registrar la reserva
        showtime.reservations.push({ user: userId, seats });
        showtime.availableSeats -= seats;

        await movie.save();
        res.status(200).json({ message: "Reserva realizada con éxito." });
    } catch (error) {
        res.status(500).json({ message: "Error al realizar la reserva.", error });
    }
};

// Obtener todas las reservaciones (title, date, user, seats)
exports.getReservations = async (req, res) => {
    try {
        const movies = await Movie.find();
        const reservations = movies.map(movie => movie.showtimes.map(showtime => showtime.reservations.map(reservation => ({
            title: movie.title,
            date: showtime.date,
            user: reservation.user,
            seats: reservation.seats,
        }))));
        res.status(200).json(reservations.flat(2));
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservaciones.", error });
    }
};

// Obtener una reservación por ID
exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const movies = await Movie.find();
        const reservations = movies.map(movie => movie.showtimes.map(showtime => showtime.reservations.map(reservation => ({
            title: movie.title,
            date: showtime.date,
            user: reservation.user,
            seats: reservation.seats,
        }))));
        const reservation = reservations.flat(2).find(reservation => reservation.user == id);
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
        const movies = await Movie.find();
        const reservations = movies.map(movie => movie.showtimes.map(showtime => showtime.reservations.map(reservation => ({
            title: movie.title,
            date: showtime.date,
            user: reservation.user,
            seats: reservation.seats,
        }))));
        const reservation = reservations.flat(2).find(reservation => reservation.user == id);
        if (!reservation) return res.status(404).json({ message: "Reservación no encontrada." });

        const movie = await Movie.findOne({ title: reservation.title });
        const showtime = movie.showtimes.find(showtime => showtime.date == reservation.date);
        const reservationIndex = showtime.reservations.findIndex(reservation => reservation.user == id);

        const oldSeats = showtime.reservations[reservationIndex].seats;
        showtime.reservations[reservationIndex].seats = seats;
        showtime.availableSeats += oldSeats - seats;

        await movie.save();
        res.status(200).json({ message: "Reservación actualizada exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reservación.", error });
    }
};


// Eliminar una reservación
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const movies = await Movie.find();
        const reservations = movies.map(movie => movie.showtimes.map(showtime => showtime.reservations.map(reservation => ({
            title: movie.title,
            date: showtime.date,
            user: reservation.user,
            seats: reservation.seats,
        }))));
        const reservation = reservations.flat(2).find(reservation => reservation.user == id);
        if (!reservation) return res.status(404).json({ message: "Reservación no encontrada." });

        const movie = await Movie.findOne({ title: reservation.title });
        const showtime = movie.showtimes.find(showtime => showtime.date == reservation.date);
        const reservationIndex = showtime.reservations.findIndex(reservation => reservation.user == id);

        showtime.availableSeats += showtime.reservations[reservationIndex].seats;
        showtime.reservations.splice(reservationIndex, 1);

        await movie.save();
        res.status(200).json({ message: "Reservación eliminada exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reservación.", error });
    }
};

