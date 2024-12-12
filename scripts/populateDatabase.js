require("dotenv").config();
const connectDB = require("../config/database");
const Movie = require("../models/Movie");


// Datos iniciales para las películas
const movies = [
  {
    title: "El Rey León",
    description: "Un joven león debe aceptar su destino como rey.",
    image: "https://i.imgur.com/3YeTGNu.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T18:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T20:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Frozen II",
    description: "Elsa y Anna se embarcan en una aventura para descubrir los orígenes de los poderes de Elsa.",
    image: "https://i.imgur.com/UlmU8NY.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T16:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T19:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Avengers: Endgame",
    description: "Los Vengadores intentan deshacer el daño causado por Thanos.",
    image: "https://i.imgur.com/ZxgSbA1.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T21:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T18:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "El Rey León",
    description: "Un joven león debe aceptar su destino como rey.",
    image: "https://i.imgur.com/3YeTGNu.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T18:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T20:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Frozen II",
    description: "Elsa y Anna se embarcan en una aventura para descubrir los orígenes de los poderes de Elsa.",
    image: "https://i.imgur.com/UlmU8NY.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T16:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T19:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Avengers: Endgame",
    description: "Los Vengadores intentan deshacer el daño causado por Thanos.",
    image: "https://i.imgur.com/ZxgSbA1.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T21:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T18:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "El Rey León",
    description: "Un joven león debe aceptar su destino como rey.",
    image: "https://i.imgur.com/3YeTGNu.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T18:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T20:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Frozen II",
    description: "Elsa y Anna se embarcan en una aventura para descubrir los orígenes de los poderes de Elsa.",
    image: "https://i.imgur.com/UlmU8NY.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T16:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T19:00:00Z"), availableSeats: 50 },
    ],
  },
  {
    title: "Avengers: Endgame",
    description: "Los Vengadores intentan deshacer el daño causado por Thanos.",
    image: "https://i.imgur.com/ZxgSbA1.jpeg", // Cambia esto por un enlace real
    showtimes: [
      { date: new Date("2024-11-20T21:00:00Z"), availableSeats: 50 },
      { date: new Date("2024-11-21T18:00:00Z"), availableSeats: 50 },
    ],
  },
];

// Función para popular la base de datos
const populateDB = async () => {
  try {
    await Movie.deleteMany(); // Limpia la colección antes de insertar datos nuevos
    await Movie.insertMany(movies); // Inserta los datos
    console.log("Base de datos poblada con éxito");
    process.exit();
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

// Ejecutar el script
const start = async () => {
  await connectDB();
  await populateDB();
};

start();
