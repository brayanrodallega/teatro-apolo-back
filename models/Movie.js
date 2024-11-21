const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  showtimes: [
    {
      date: { type: Date, required: true },
      availableSeats: { type: Number, default: 50 }, // Asientos por horario
      reservations: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          seats: { type: Number, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
