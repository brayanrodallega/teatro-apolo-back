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
        console.log(showtime);
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
